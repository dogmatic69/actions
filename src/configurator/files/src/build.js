const libs = require('./libs');

module.exports = (config) => ({
  name: config.name,
  on: config.on,
  jobs: {
    ...libs.job({
      include: config.file !== false,
      name: 'File Lint',
      steps: [
        libs.checkout(),
        ...libs.fileChecks(config.file),
        {
          name: 'Checkmake',
          uses: 'dogmatic69/actions/file/lint/checkmake@master',
        },
      ],
    }),

    ...libs.job({
      include: config.git !== false,
      name: 'Git Lint',
      steps: [
        libs.checkout(0),
        ...libs.gitChecks(config.git),
        {
          name: 'Git Leaks',
          uses: 'dogmatic69/actions/git/audit/gitleaks@master',
        },
      ],
    }),

    ...libs.job({
      include: config.trivy !== false,
      name: 'Audit Trivy',
      strategy: {
        matrix: config.trivy ? config.trivy.matrix : null,
      },
      steps: [
        libs.checkout(),
        libs.run('Build', [
          'docker build -t ${{ matrix.image }} ./${{ matrix.image }}'
        ]),
        {
          name: 'Trivy Scan ${{ matrix.image }}',
          uses: 'dogmatic69/actions/docker/audit/trivy@master',
          with: {
            token: '${{ secrets.GITHUB_TOKEN }}',
            image: '${{ matrix.image }}',
            path: './${{ matrix.image }}',
          },
        },
      ]
    }),

    ...libs.job({
      include: config.docker !== false,
      name: 'Dockerfile lint',
      steps: [
        libs.checkout(),
        {
          name: 'Hadolint',
          uses: 'dogmatic69/actions/docker/lint/hadolint@master',
        },
      ],
    }),

    ...libs.collector('Docker Done', {
      'audit-trivy': config.trivy !== false,
      'dockerfile-lint': config.docker !== false,
    }),

    ...libs.job({
      include: config.project !== false,
      name: 'Project Checks',
      strategy: {
        matrix: config.project ? config.project.matrix: null,
      },
      steps: [
        libs.checkout(),
        libs.run('lint', 'make -C ${{ matrix.image }} lint'),
        libs.run('test', 'make -C ${{ matrix.image }} test'),
      ],
    }),

    ...libs.job({
      include: config.terraform !== false,
      name: 'Project Checks TF',
      strategy: {
        matrix: config.terraform ? config.terraform.matrix : null,
      },
      steps: [
        libs.checkout(),
        ...['format', 'tflint', 'validate'].map(command => {
          return libs.run(`TF ${command}`, `make -C terraform ${command} TERRAFORM_MODULE_PATH=$(realpath ./\${{ matrix.module }}/)`)
        }),
      ],
    }),

    ...libs.collector('Project Done', {
      'project-checks': config.project !== false,
      'project-checks-tf': config.terraform !== false,
    }),

    ...libs.collector('All Done', {
      'file-lint': !!config.file,
      'git-lint': !!config.git,
      'docker-done': config.trivy && config.docker,
      'project-done': config.project && config.project,
    }),

    ...libs.job({
      include: config.publish !== false,
      name: 'Publish',
      needs: ['all-done'],
      strategy: {
        matrix: config.publish ? config.publish.matrix : null,
      },
      steps: [
        libs.checkout(),
        {
          name: 'GCloud Setup',
          uses: 'GoogleCloudPlatform/github-actions/setup-gcloud@master',
          with: {
            version: config.publish ? config.publish['gcloud-version'] : null,
            service_account_email: '${{ secrets.GCP_SA_EMAIL }}',
            service_account_key: '${{ secrets.GCP_SA_KEY }}',
            export_default_credentials: true
          },
        },
        libs.run('Docker Login', [
          'echo "${{ secrets.GCP_SA_KEY }}" | base64 --decode |',
          'docker login -u _json_key --password-stdin https://eu.gcr.io'
        ].join("\\\n")),
        libs.run('Publish', `make -C \${{ matrix.service }} publish ENVIRONMENT=${config.publish ? config.publish.environment : null}`),
      ],
    }),

    ...(config.raw || {})
  },
});

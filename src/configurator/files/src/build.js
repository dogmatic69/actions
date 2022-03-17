/* eslint-disable no-template-curly-in-string */

const libs = require('./libs');

const getConfig = (config, key) => (config && config[key] !== 'undefined' ? config[key] : null);

module.exports = (configuration) => ({
  name: configuration.name,
  on: configuration.on,
  env: configuration.env || {},
  jobs: {

    ...libs.collector('Project Done', {
      'project-checks': !!configuration.project,
      'project-checks-tf': !!configuration.terraform,
    }),

    ...libs.collector('All Done', {
      'file-lint': !!configuration.file,
      'git-lint': !!configuration.git,
      'docker-done': configuration.trivy && configuration.docker,
      'project-done': configuration.project && configuration.project,
    }),

    ...libs.collector('Docker Done', {
      'audit-trivy': !!getConfig(configuration, 'trivy'),
      'dockerfile-lint': !!getConfig(configuration, 'docker-lint'),
    }),

    ...((config) => {
      console.log('config: ', config)
      if (config === false) {
        return {};
      }
      return libs.job({
        name: 'Workflow Check',
        steps: [
          libs.checkout(),
          libs.fetch(),
          libs.run('Configurator', [
            'make -C ${GITHUB_WORKSPACE}/src/configurator run-all',
            'git status',
            'git diff-index --quiet HEAD -- || (echo "Changes found"; git diff)',
            'git diff-index --quiet HEAD --',
          ]),
        ],
      });
    })(getConfig(configuration, 'workflow')),

    ...((config) => {
      if (!config) {
        return {};
      }
      return libs.job({
        name: 'File Lint',
        needs: config.needs || [],
        steps: [
          libs.checkout(),
          ...libs.fileChecks(config.checks),
          ...libs.additionalSteps(config.steps),
        ],
      });
    })(getConfig(configuration, 'file')),

    ...((config) => {
      if (!config) {
        return {};
      }

      return libs.job({
        name: 'Git Lint',
        needs: config.needs || [],
        steps: [
          libs.checkout(0),
          ...(config.checks || []).map((check) => ({
            name: `Git ${check}`,
            uses: 'dogmatic69/actions/git/lint/awesome-ci@master',
            with: {
              command: `git-${check}`,
            },
          })),
          ...libs.additionalSteps(config.steps),
        ],
      });
    })(getConfig(configuration, 'git')),

    ...((config) => {
      if (!config) {
        return {};
      }
      return libs.job({
        name: 'Audit Trivy',
        needs: config.needs || [],
        strategy: {
          matrix: config.matrix,
        },
        steps: [
          libs.checkout(),
          ...(config.before || []),
          libs.run('Build', [
            config.build || 'docker build -t ${{ matrix.image }} ./${{ matrix.image }}'
          ], config.if),
          {
            name: 'Trivy Scan ${{ matrix.image }}',
            uses: 'dogmatic69/actions/docker/audit/trivy@master',
            if: config.if || true,
            with: {
              token: '${{ secrets.GITHUB_TOKEN }}',
              image: '${{ matrix.image }}',
            },
          },
        ],
      });
    })(getConfig(configuration, 'trivy')),

    ...((config) => {
      if (config !== true) {
        return {};
      }
      return libs.job({
        name: 'Dockerfile lint',
        needs: config.needs || [],
        steps: [
          libs.checkout(),
          {
            name: 'Hadolint',
            uses: 'dogmatic69/actions/docker/lint/hadolint@master',
          },
        ],
      });
    })(getConfig(configuration, 'docker-lint')),

    ...((config) => {
      if (!config) {
        return {};
      }
      const checks = config.checks || [
        libs.run('lint', 'make -C ${{ matrix.image }} lint'),
        libs.run('test', 'make -C ${{ matrix.image }} test'),
      ];

      return libs.job({
        name: 'Project Checks',
        needs: config.needs || [],
        strategy: {
          matrix: config.matrix,
        },
        steps: [
          libs.checkout(),
          ...checks,
        ],
      });
    })(getConfig(configuration, 'project')),

    ...((config) => {
      if (!config) {
        return {};
      }

      return libs.job({
        name: 'Project Checks TF',
        needs: config.needs || [],
        strategy: {
          matrix: config.matrix,
        },
        steps: [
          libs.checkout(),
          ...['format', 'tflint', 'validate'].map((command) => libs.run(`TF ${command}`, `make -C terraform ${command} TERRAFORM_MODULE_PATH=$(realpath ./\${{ matrix.module }}/)`)),
        ],
      });
    })(getConfig(configuration, 'terraform')),

    ...((config) => {
      if (!config) {
        return {};
      }

      const target = config.target || 'github';
      const steps = [
        libs.checkout(),
        ...(config.before || []),
        libs.fetch(config.if),
      ];

      if (target === 'gcp') {
        steps.push({
          name: 'GCloud Setup',
          if: config.if || true,
          uses: 'GoogleCloudPlatform/github-actions/setup-gcloud@master',
          with: {
            version: config['gcloud-version'] || '290.0.1',
            service_account_email: '${{ secrets.GCP_SA_EMAIL }}',
            service_account_key: '${{ secrets.GCP_SA_KEY }}',
            export_default_credentials: true,
          },
        });
        steps.push(libs.run('Docker Login', [
          'echo "${{ secrets.GCP_SA_KEY }}" | base64 --decode |',
          'docker login -u _json_key --password-stdin https://eu.gcr.io',
        ].join('\\\n'), config.if));
      }

      steps.push(
        libs.run(
          'Publish',
          config.publish || `make -C \${{ matrix.service }} publish DOCKER_USER=\${{ github.actor }} DOCKER_TOKEN=\${{ secrets.GITHUB_TOKEN }} ENVIRONMENT=${config.environment || 'dev'}`,
          config.if
        ),
      );

      return libs.job({
        name: 'Publish',
        needs: config.needs !== 'undefined' ? (config.needs || []) : ['all-done'],
        strategy: {
          matrix: config.matrix,
        },
        steps,
      });
    })(getConfig(configuration, 'publish')),

    ...(configuration.raw || {}),
  },
});

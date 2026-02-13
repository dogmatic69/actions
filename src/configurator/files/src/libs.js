const slugify = require('slugify');

module.exports = (() => {
  const self = {};

  self.slug = (words) => slugify(words).toLowerCase();

  self.job = (job) => {
    const slug = self.slug(job.name);
    const runsOn = job['runs-on'] || 'ubuntu-latest';

    return {
      [slug]: { ...job, 'runs-on': runsOn },
    };
  };

  self.collector = (name, required) => {
    const needs = Object.keys(required).filter((key) => (required[key] ? key : false));
    if (needs.length <= 0) {
      return {};
    }

    return self.job({
      name,
      needs,
      steps: [{ run: true }],
    });
  };

  self.run = (name, commands, condition) => {
    const run = Array.isArray(commands) ? commands : [commands];
    run.push('');

    const ret = {
      name,
      run: run.join('\n'),
    };

    if (condition) {
      ret.if = condition;
    }
    return ret;
  };

  self.checkout = (depth) => ({
    name: 'Checkout',
    uses: 'actions/checkout@master',
    with: {
      'fetch-depth': Number.isInteger(depth) ? depth : 1,
    },
  });

  self.fetch = (condition) => self.run('Git Fetch', 'git fetch', condition);

  self.fileChecks = (config) => Object.keys(config).map((name) => {
    const conf = {
      name,
      uses: 'dogmatic69/actions/file/lint/awesome-ci@master',
      with: {
        command: `file-${name}`,
      },
    };
    let newName = Array.isArray(config[name]) ? config[name] : [config[name]];
    newName = newName.filter((a) => !!a);
    if (newName.length > 0) {
      conf.with.ignore = newName.join(',');
    }
    return conf;
  });

  self.additionalSteps = (steps) => (Object.keys(steps || {})).map((step) => {
    const config = steps[step];

    if (typeof config === 'string') {
      return {
        name: step,
        uses: config,
      };
    }
    config.name = config.name || step;
    return config;
  });

  return self;
})();

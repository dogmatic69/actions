const yaml = require('js-yaml');
const _ = require('lodash');
const fs = require('fs').promises;
const build = require('./build');

// const debug = (output) => console.log(require('util').inspect(output, false, null, true));

const readYaml = async (file) => {
  const content = await fs.readFile(`/repo/.github/workflow-templates/${file}`, 'utf8');
  return yaml.safeLoad(content);
};

const extend = async (template) => {
  const includes = template.include || [];

  let ret = template;
  delete ret.include;

  for (let i = 0; i < includes.length; i += 1) {
    /* eslint-disable no-await-in-loop */
    const data = await readYaml(includes[i]);
    ret = _.merge(ret, await extend(data));
    /* eslint-enable no-await-in-loop */
  }

  return ret;
};

(async () => {
  const config = await readYaml(`${process.argv[2]}.yml`);

  const template = await extend(config);
  const output = build(template);

  output.name = (output.name || process.argv[2].replace('-', ' '));
  try {
    await fs.writeFile(
      `${process.env.ROOT_DIR}/.github/workflows/${process.argv[2]}.yml`,
      yaml.safeDump(output),
    );
  } catch(e) {
    console.log(e);
    return process.exit(1);
  }
})();

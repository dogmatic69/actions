const yaml = require('js-yaml');
const fs = require('fs').promises;
const build = require('./build');

const debug = (output) => console.log(require('util').inspect(output, false, null, true));

(async() => {
  const config = await fs.readFile(`/repo/.github/workflow-templates/${process.argv[2]}.yml`, 'utf8');

  const output = build(yaml.safeLoad(config));
  output.name = (output.name || process.argv[2].replace('-', ' '));
  await fs.writeFile(
    `${process.env.ROOT_DIR}/.github/workflows/${process.argv[2]}.yml`,
    yaml.safeDump(output)
  );
})();

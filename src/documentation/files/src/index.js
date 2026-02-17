const find = require('find');
const yaml = require('js-yaml');
const fs = require('fs').promises;
const Mustache = require('mustache');
const slugify = require('slugify');

const getFiles = (regex, dir) => new Promise((resolve) => { find.file(regex, dir, resolve); });

const writeFile = async (file, data) => {
  const md = `<!-- NOTICE: Auto generated file! -->\n${data}`;
  await fs.writeFile(`/work/docs/${file}`, md);
};

const fileName = (file) => file
  .replace('/work/', '')
  .replace('/action', '')
  .replace('.yml', '')
  .replace('.yaml', '')
  .replace(/\//gi, '-');

const getBadges = async (dir) => {
  const files = await getFiles(/work\/\.github\/workflows\//, dir);
  const res = files.map(async (file) => {
    const doc = yaml.safeLoad(await fs.readFile(file, 'utf8'));
    return {
      slug: encodeURIComponent(doc.name),
      name: doc.name,
    };
  });
  return Promise.all(res);
};

const getActionOverviews = async (dir) => {
  const files = await getFiles(/action.ya?ml$/, dir);
  const ret = files.map(async (file) => {
    const doc = yaml.safeLoad(await fs.readFile(file, 'utf8'));
    return {
      name: doc.name,
      url: `${fileName(file)}.md`,
    };
  });
  return Promise.all(ret);
};

const getActions = async (dir) => {
  const files = await getFiles(/action.ya?ml$/, dir);
  const res = files.map(async (file) => {
    const docFile = fileName(file);

    const action = yaml.safeLoad(await fs.readFile(file, 'utf8'));

    action.sluggedName = slugify(action.name, { lower: true });

    action.inputs = Object.keys((action.inputs || {})).map((key) => ({
      name: key,
      ...action.inputs[key],
    }));

    action.default = [undefined, null].indexOf(action.default) !== -1 ? 'null' : action.default;
    action.hasInputs = action.inputs.length > 0;
    action.required = action.inputs.filter((input) => input.required);
    action.hasRequired = action.required.length > 0;

    return {
      action,
      file,
      docFile: `${docFile}.md`,
    };
  });

  return Promise.all(res);
};

const writeActionsDoc = async (data, repo) => {
  const template = await fs.readFile('./templates/action.mustache');
  const md = Mustache.render(template.toString(), {
    ...data.action,
    repo,
    version: process.env.GIT_HASH,
    updated: (new Date()).toDateString(),
  });
  writeFile(data.docFile, md);
};

const writeActionsReadmeDoc = async (data, repo) => {
  const template = await fs.readFile('./templates/docs.mustache');
  const md = Mustache.render(template.toString(), {
    ...data,
    repo,
    version: process.env.GIT_HASH,
    updated: (new Date()).toDateString(),
  });
  writeFile('README.md', md);
};

const writeReadmeDoc = async (data, repo) => {
  const template = await fs.readFile('./templates/readme.mustache');
  const md = Mustache.render(template.toString(), {
    ...data,
    repo,
    version: process.env.GIT_HASH,
    updated: (new Date()).toDateString(),
  });
  writeFile('../README.md', md);
};

(async (dir) => {
  const actions = await getActions(dir);
  actions.map((action) => writeActionsDoc(action, process.env.GITHUB_REPOSITORY));

  const badges = await getBadges(dir);
  writeActionsReadmeDoc({
    badges,
    overviews: await getActionOverviews(dir),
  }, process.env.GITHUB_REPOSITORY);

  writeReadmeDoc({
    badges,
  }, process.env.GITHUB_REPOSITORY);
})('/work');

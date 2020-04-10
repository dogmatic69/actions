const core = require('@actions/core');
const github = require('@actions/github');

const prId = () => {
  if (process.env['PULL_REQUEST_NUMBER']) {
    core.info(`PR # from automated PR action [${process.env['PULL_REQUEST_NUMBER']}]`);
    return process.env['PULL_REQUEST_NUMBER'];
  }

  const result = /refs\/pull\/(\d+)\/merge/g.exec(process.env['GITHUB_REF']);
  if (!result) {
    return null;
  }
  const [, pullRequestId] = result;

  core.inf(`PR # from existing PR [${pullRequestId}]`)
  return pullRequestId;
};

module.exports = async () => {
  core.info(JSON.stringify(process.env))
  const token = process.env['GITHUB_TOKEN'];
  if (!token) {
    return core.setFailed('No token provided')
  }
  const pr = prId();
  if (!pr) {
    return core.setFailed('No PR number provided')
  }

  const client = new github.GitHub(token);

  core.info('Updating the state of a pull request to [closed]');
  try {
    await client.pulls.update({
      ...github.context.repo,
      pull_number: pr,
      state: 'closed'
    });
  } catch(e) {
    return core.setFailed(e);
  }

  core.info('Updating the state of a pull request to [open]');
  try {
    await client.pulls.update({
      ...github.context.repo,
      pull_number: pr,
      state: 'open'
    });
  } catch(e) {
    return core.setFailed(e);
  }

  core.info(`Manipulated the PR [${pr}]`);
};

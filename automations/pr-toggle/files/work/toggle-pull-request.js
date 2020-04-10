const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

const prId = () => {
  if (parseInt(process.env['PULL_REQUEST_NUMBER']) > 0) {
    core.info(`PR # from automated PR action [${process.env['PULL_REQUEST_NUMBER']}]`);
    return process.env['PULL_REQUEST_NUMBER'];
  }

  const result = /refs\/pull\/(\d+)\/merge/g.exec(process.env['GITHUB_REF']);
  if (result) {
    const [, pullRequestId] = result;
    if (parseInt(pullRequestId) > 1) {
      core.inf(`PR # from existing PR [${pullRequestId}]`);
      return pullRequestId;
    }
  }

  const ev = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
  )
  core.inf(`PR # from GITHUB_EVENT_PATH [${ev.pull_request.number}]`);
  return ev.pull_request.number;
};

module.exports = async () => {
  const token = process.env['GITHUB_TOKEN'];
  if (!token) {
    return core.setFailed('No token provided')
  }
  const client = new github.GitHub(token);

  const pr = prId();
  if (!pr) {
    return core.setFailed('No PR number provided')
  }

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

const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

const prId = (event) => {
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

  core.info(`file: ${process.env.GITHUB_EVENT_PATH}`);
  if (event.pull_request && parseInt(event.pull_request.number) > 0) {
    core.inf(`PR # from GITHUB_EVENT_PATH [${event.pull_request.number}]`);
    return event.pull_request.number;
  }

  return null;
};

const prIdFromHash = async (client, config) => {
  const data = await client.request(
    `GET /repos/${config.owner}/${config.repo}/commits/${config.hash}/pulls`
  );

  const pr = data.data[0];
  try {

    core.info(`PR: ${JSON.stringify(pr)}`);
    core.info(`PR - number: ${JSON.stringify(pr.number)}`);
  } catch(e) {
    core.info(`error ${e.stack}`);
  }
  if (pr && parseInt(pr.number) > 0) {
    core.info(`PR # from existing PR [${pr.number}]`);
    return pr.number;
  }
};

module.exports = async () => {
  const token = process.env['GITHUB_TOKEN'];
  if (!token) {
    return core.setFailed('No token provided')
  }
  const client = new github.GitHub(token, {
    previews: ["groot-preview"],
  });

  const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
  )

  let pr = prId(event);
  if (!pr) {
    const existingPr = await prIdFromHash(client, {
      owner: event.repository.owner.name,
      repo: event.repository.name,
      hash: event.after,
    });
    if (existingPr) {
      return core.info('No need for this Hack, PR exists');
    }

    return core.setFailed('No PR number provided')
  }

  core.info(`Updating the state of a pull request to [#${pr}: closed]`);
  try {
    await client.pulls.update({
      ...github.context.repo,
      pull_number: pr,
      state: 'closed'
    });
  } catch(e) {
    return core.setFailed(e);
  }

  core.info(`Updating the state of a pull request to [#${pr}: open]`);
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

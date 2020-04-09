const core = require("@actions/core");
const github = require("@actions/github");

module.exports = async () => {
  const token = process.env["GITHUB_TOKEN"] || "";
  if (token === "") {
    return core.setFailed("No token provided")
  }
  const pr = process.env["PULL_REQUEST_NUMBER"] || "";
  if (pr === "") {
    return core.setFailed("No PR number provided")
  }

  const client = new github.GitHub(token);

  core.info('Updating the state of a pull request to [closed]');
  await client.pulls.update({
    ...github.context.repo,
    pull_number: pr,
    state: 'closed'
  });

  core.info('Updating the state of a pull request to [open]');
  await client.pulls.update({
    ...github.context.repo,
    pull_number: pr,
    state: 'open'
  });

  core.info(`Manipulated the PR [${pr}]`);
};

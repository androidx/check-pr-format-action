import * as core from '@actions/core';
import * as github from '@actions/github';

function checkPullRequestFormat(): void {
  const workFlowPaylod = github.context.payload;
  const pullRequest = github.context.payload.pull_request;
    
  // Log Full Context
  core.info(`Workflow Context ${JSON.stringify(github.context)}`)

  // Log the actual workflow payload for debugging
  core.info(`Workflow payload ${JSON.stringify(workFlowPaylod)}`);

  if (!!pullRequest == false) {
    // Checks can only be performed when it is a pull request.
    return;
  }

  const body = pullRequest?.body;
  if (!!body === false) {
    core.info(`No pull request body. `);
    core.setFailed(`No pull request body.`);
    return;
  }

  let checks = core.getInput('checks');
  if (!!checks === false) {
    core.setOutput('status', false);
    core.setFailed('No checks.');
  } else {
    // Checks are a JSON array.
    let parsedChecks = JSON.parse(checks) as string[];
    core.info(`Parsed checks: [${parsedChecks}]`);
    const result = _checkPullRequestFormat(parsedChecks, body!!);
    if (result) {
      core.info(`PR Format checks passed.`);
      core.setOutput('status', true);
    } else {
      core.info(`PR Format checks failed.`);
      core.setOutput('status', false);
      core.setFailed(`The pull request ${body} does not match one of the following checks ${checks}`);
    }
  }
}

function _checkPullRequestFormat(expressions: string[], body: string): boolean {
  const lines = body.split(RegExp('\r?\n'));
  const compiled = [];
  let matches = 0;
  // Indexes
  let i = 0;
  let j = 0;
  // Compile Expressions
  for (i = 0; i < expressions.length; i += 1) {
    compiled[i] = new RegExp(expressions[i]);
  }
  // Validate
  for (i = 0; i < lines.length; i += 1) {
    let matched = false;
    for (j = 0; j < compiled.length && matched === false; j += 1) {
      matched = compiled[j].test(lines[i]);
    }
    if (matched) {
      matches += 1;
    }
  }
  return compiled.length <= matches;
}


(function () {
  try {
    checkPullRequestFormat();
  } catch (error) {
    core.setFailed(`Unable to validate pull request body ${error}`);
  }
})();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var github = require("@actions/github");
function checkPullRequestFormat() {
    var workFlowPaylod = github.context.payload;
    var pullRequest = github.context.payload.pull_request;
    // Log the actual workflow payload for debugging
    core.info("Workflow payload " + JSON.stringify(workFlowPaylod));
    var body = pullRequest === null || pullRequest === void 0 ? void 0 : pullRequest.body;
    // Checks are performed only when we have a pull request body.
    if (pullRequest && !!body === false) {
        core.info("No pull request body. ");
        core.setFailed("No pull request body.");
        return;
    }
    var checks = core.getInput('checks');
    if (!!checks === false) {
        core.setOutput('status', false);
        core.setFailed('No checks.');
    }
    else {
        // Checks are a JSON array.
        var parsedChecks = JSON.parse(checks);
        var result = _checkPullRequestFormat(parsedChecks, body);
        if (result) {
            core.info("PR Format checks passed.");
            core.setOutput('status', true);
        }
        else {
            core.info("PR Format checks failed.");
            core.setOutput('status', false);
            core.setFailed("The pull request " + body + " does not match one of the following checks " + checks);
        }
    }
}
function _checkPullRequestFormat(expressions, body) {
    var lines = body.split(RegExp('\r?\n'));
    var compiled = [];
    var matches = 0;
    // Indexes
    var i = 0;
    var j = 0;
    // Compile Expressions
    for (i = 0; i < expressions.length; i += 1) {
        compiled[i] = new RegExp(expressions[i]);
    }
    // Validate
    for (i = 0; i < lines.length; i += 1) {
        var matched = false;
        for (j = 0; j < compiled.length && matched === false; j += 1) {
            matched = compiled[j].test(lines[i]);
        }
        if (matched) {
            matches += 1;
        }
    }
    return compiled.length === matches;
}
(function () {
    try {
        checkPullRequestFormat();
    }
    catch (error) {
        core.setFailed("Unable to validate pull request body " + error);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBdUM7QUFDdkMsd0NBQTJDO0FBRTNDLFNBQVMsc0JBQXNCO0lBQzdCLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQzlDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUV4RCxnREFBZ0Q7SUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUcsQ0FBQyxDQUFDO0lBRWhFLElBQU0sSUFBSSxHQUFHLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLENBQUM7SUFDL0IsOERBQThEO0lBQzlELElBQUksV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDeEMsT0FBTztLQUNSO0lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDOUI7U0FBTTtRQUNMLDJCQUEyQjtRQUMzQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBYSxDQUFDO1FBQ2xELElBQU0sTUFBTSxHQUFHLHVCQUF1QixDQUFDLFlBQVksRUFBRSxJQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQW9CLElBQUksb0RBQStDLE1BQVEsQ0FBQyxDQUFDO1NBQ2pHO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxXQUFxQixFQUFFLElBQVk7SUFDbEUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFVBQVU7SUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixzQkFBc0I7SUFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsV0FBVztJQUNYLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVELE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxDQUFDO1NBQ2Q7S0FDRjtJQUNELE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUM7QUFDckMsQ0FBQztBQUdELENBQUM7SUFDQyxJQUFJO1FBQ0Ysc0JBQXNCLEVBQUUsQ0FBQztLQUMxQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBd0MsS0FBTyxDQUFDLENBQUM7S0FDakU7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvcmUgPSByZXF1aXJlKCdAYWN0aW9ucy9jb3JlJyk7XG5pbXBvcnQgZ2l0aHViID0gcmVxdWlyZSgnQGFjdGlvbnMvZ2l0aHViJyk7XG5cbmZ1bmN0aW9uIGNoZWNrUHVsbFJlcXVlc3RGb3JtYXQoKTogdm9pZCB7XG4gIGNvbnN0IHdvcmtGbG93UGF5bG9kID0gZ2l0aHViLmNvbnRleHQucGF5bG9hZDsgIFxuICBjb25zdCBwdWxsUmVxdWVzdCA9IGdpdGh1Yi5jb250ZXh0LnBheWxvYWQucHVsbF9yZXF1ZXN0O1xuXG4gIC8vIExvZyB0aGUgYWN0dWFsIHdvcmtmbG93IHBheWxvYWQgZm9yIGRlYnVnZ2luZ1xuICBjb3JlLmluZm8oYFdvcmtmbG93IHBheWxvYWQgJHtKU09OLnN0cmluZ2lmeSh3b3JrRmxvd1BheWxvZCl9YCk7XG5cbiAgY29uc3QgYm9keSA9IHB1bGxSZXF1ZXN0Py5ib2R5O1xuICAvLyBDaGVja3MgYXJlIHBlcmZvcm1lZCBvbmx5IHdoZW4gd2UgaGF2ZSBhIHB1bGwgcmVxdWVzdCBib2R5LlxuICBpZiAocHVsbFJlcXVlc3QgJiYgISFib2R5ID09PSBmYWxzZSkge1xuICAgIGNvcmUuaW5mbyhgTm8gcHVsbCByZXF1ZXN0IGJvZHkuIGApO1xuICAgIGNvcmUuc2V0RmFpbGVkKGBObyBwdWxsIHJlcXVlc3QgYm9keS5gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgY2hlY2tzID0gY29yZS5nZXRJbnB1dCgnY2hlY2tzJyk7XG4gIGlmICghIWNoZWNrcyA9PT0gZmFsc2UpIHtcbiAgICBjb3JlLnNldE91dHB1dCgnc3RhdHVzJywgZmFsc2UpO1xuICAgIGNvcmUuc2V0RmFpbGVkKCdObyBjaGVja3MuJyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQ2hlY2tzIGFyZSBhIEpTT04gYXJyYXkuXG4gICAgbGV0IHBhcnNlZENoZWNrcyA9IEpTT04ucGFyc2UoY2hlY2tzKSBhcyBzdHJpbmdbXTtcbiAgICBjb25zdCByZXN1bHQgPSBfY2hlY2tQdWxsUmVxdWVzdEZvcm1hdChwYXJzZWRDaGVja3MsIGJvZHkhISk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgY29yZS5pbmZvKGBQUiBGb3JtYXQgY2hlY2tzIHBhc3NlZC5gKTtcbiAgICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXMnLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29yZS5pbmZvKGBQUiBGb3JtYXQgY2hlY2tzIGZhaWxlZC5gKTtcbiAgICAgIGNvcmUuc2V0T3V0cHV0KCdzdGF0dXMnLCBmYWxzZSk7XG4gICAgICBjb3JlLnNldEZhaWxlZChgVGhlIHB1bGwgcmVxdWVzdCAke2JvZHl9IGRvZXMgbm90IG1hdGNoIG9uZSBvZiB0aGUgZm9sbG93aW5nIGNoZWNrcyAke2NoZWNrc31gKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NoZWNrUHVsbFJlcXVlc3RGb3JtYXQoZXhwcmVzc2lvbnM6IHN0cmluZ1tdLCBib2R5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgbGluZXMgPSBib2R5LnNwbGl0KFJlZ0V4cCgnXFxyP1xcbicpKTtcbiAgY29uc3QgY29tcGlsZWQgPSBbXTtcbiAgbGV0IG1hdGNoZXMgPSAwO1xuICAvLyBJbmRleGVzXG4gIGxldCBpID0gMDtcbiAgbGV0IGogPSAwO1xuICAvLyBDb21waWxlIEV4cHJlc3Npb25zXG4gIGZvciAoaSA9IDA7IGkgPCBleHByZXNzaW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbXBpbGVkW2ldID0gbmV3IFJlZ0V4cChleHByZXNzaW9uc1tpXSk7XG4gIH1cbiAgLy8gVmFsaWRhdGVcbiAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcbiAgICBmb3IgKGogPSAwOyBqIDwgY29tcGlsZWQubGVuZ3RoICYmIG1hdGNoZWQgPT09IGZhbHNlOyBqICs9IDEpIHtcbiAgICAgIG1hdGNoZWQgPSBjb21waWxlZFtqXS50ZXN0KGxpbmVzW2ldKTtcbiAgICB9XG4gICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgIG1hdGNoZXMgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbXBpbGVkLmxlbmd0aCA9PT0gbWF0Y2hlcztcbn1cblxuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNoZWNrUHVsbFJlcXVlc3RGb3JtYXQoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb3JlLnNldEZhaWxlZChgVW5hYmxlIHRvIHZhbGlkYXRlIHB1bGwgcmVxdWVzdCBib2R5ICR7ZXJyb3J9YCk7XG4gIH1cbn0pKCk7XG4iXX0=
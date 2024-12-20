# Copy Editor View Automation test suite overview

This README file provides an overview of the Copy Editor View automation suite using playwright. The suite includes component tests -

`Component tests`- It covers almost all workflow scenerios on test harness.

And it also includes the instructions on how to run it using GitLab pipelines.


### Running in Gitlab pipeline

Here is Gitlab pipeline- https://gitlab.cha.rbxd.ds/icis/workflow/tasklist/automation-test-suite/tasklist-automation-suite

To run the playwright test suite using GitLab pipelines, you can utilize  variables: `ENV`,  `BROWSER`, `CLASSNAME`, `TAGS`


### Environment Variable (`ENV`)

The `ENV` variable specifies the target environment for the tests. It can take the following values:

- `staging`: (default): Tests against the staging test environment.
- `systest`: Tests against the systest environment.
- `performance`: Tests focused on performance testing.
- `integration`: Tests for integration scenarios.

You can choose the desired environment by setting the `ENV` variable accordingly in your GitLab pipeline configuration.

### Browser Variable (`BROWSER`)

The `BROWSER` variable determines the browser in which the tests will be executed. It can take the following values:

- `chromium` (default): Runs the tests in the Google Chrome browser.
- `webkit`: Runs the tests in the Microsoft Edge browser.
- `firefox`: Runs the tests in the Mozilla Firefox browser.

You can specify the desired browser by setting the `BROWSER` variable accordingly in your GitLab pipeline configuration.

### Classname Variable (`CLASSNAME`)

The `CLASSNAME` variable specifies the target class to be run. It can take the following values:
- `component_workflow.spec.ts` (default): Runs the component tests in test harness.

We can keep on adding more classes as and when desired and control execution using this variable.

### Tags Variable (`TAGS`)

The `TAGS` variable allows you to group tests and run them selectively based on the tags you define.It can take the following values: - `Regression` (default): Runs the test scenarios having `Regression` tag added.Other tag options :

- `Sanity` : Sanity tests are a narrow and focused subset of tests run after receiving a software build, to ascertain that a specific issue has been fixed and that no further issues have been introduced by the changes.
- `Smoke` : Smoke tests are a subset of tests that verify the basic functionality of the application. The goal is to ensure that the most critical features work and that the application is stable enough for more detailed testing.
- `Regression` : Regression tests are a comprehensive suite of tests that ensure that existing functionality continues to work as expected after changes such as new features, enhancements, or bug fixes.

By setting up tags in this way, you can create flexible and maintainable test suites that allow you to run specific groups of tests as needed.

### Steps to run in local

To run the workflow test suite from system, you can use the following command :

 - yarn install -- to Install dependencies
 - yarn tc:test -- to run all tests
 - yarn test:comp -- to run component tests

 To run in debug mode, use command:
 - yarn debug

To run in parallel mode, use command:
- yarn parallel-run, this will run 3 instances at time. To increase/decrease workers, we can update command and set number of workers.


###  Steps to run MFE performance test

To run in local, use following commands:

- yarn install -- to Install dependencies
- yarn test:perf -- to get performance metrics

To run in Gitlab pipeline, provide CLASSNAME= performance

Performance stats can be viewed in console and playwright HTML report.

### Reporting

We are generating HTML as well as allure reports.

To generate and open allure report after test run, use command-
- yarn generateAllure
- yarn allure:open


### Additional features

We are using concept of `Re-use state and Re-use authentication` feature provided by playwright where we are saving login storage state in `LoginAuth.json` file which is used to maintain a consistent state across multiple browser instances or test runs. By using storageState(), we ensure that our tests start with a consistent browser state, making them more predictable and reliable. Also it indirectly contribute to saving time by reducing the need for repetitive setup steps.


Happy testing!

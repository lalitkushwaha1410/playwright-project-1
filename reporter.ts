import { Reporter } from "@playwright/test/reporter";

class MyReporter implements Reporter {
  onBegin(config, suite) {
    console.log(`Started Execution of ${suite.allTests().length} tests`);
  }

  onEnd(result) {
    console.log(`Finished Execution with status of ${result.status}`);
  }

  onTestBegin(test) {
    console.log(`Started Execution of ${test.title}`);
  }

  onTestEnd(test, result) {
    const execTime = result.duration;

    const data = {
      test: test.title,
      status: result.status,
      executionTime: execTime,
      errors: result.errors,
    };

    const dataToString = JSON.stringify(data, null, 2);
    console.log(dataToString);
  }
 
}

export default MyReporter;

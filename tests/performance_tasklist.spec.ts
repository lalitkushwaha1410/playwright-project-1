import { test, TestInfo } from "@playwright/test";
import { TestHarnessPage } from "../pages/TestHarnessPage";
import { getallmetrics } from "../utilities/calculate_metrices"


test.describe("Copy editor performance tests", async () => {

  // test.use({ storageState: "LoginAuth.json" });
  let testharnessPage: TestHarnessPage;

  test('Copy Editor View performance Test @regression', async ({ page }, TestInfo) => {
    testharnessPage = new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
    await testharnessPage.waitforPageToLoad();
    let result = await getallmetrics(page);
    console.log('FCP result for Copy Editor:', result.fcpResult);
    console.log('LCP result for Copy Editor:', result.lcpResult);
    console.log('TBT result for Copy Editor:', result.TBTResult);
    console.log('Start To Load Event End result for Copy Editor:', result.navigationResult);
    test.expect(result.fcpResult).toBeLessThan(11000);
    test.expect(result.lcpResult).toBeLessThan(11000);
    test.expect(result.TBTResult).toBeLessThan(2500);
    test.expect(result.navigationResult).toBeLessThan(10000);
    test.info().annotations.push({ type: 'Performance', description: `"${TestInfo.project.name}" - First contentful paint time is:  ${result.fcpResult}ms` });
    test.info().annotations.push({ type: 'Performance', description: `"${TestInfo.project.name}" - Largest Contentful paint time is : ${result.lcpResult}ms` });
    test.info().annotations.push({ type: 'Performance', description: `"${TestInfo.project.name}" - Total Blocking Time is : ${result.TBTResult}ms` });
    test.info().annotations.push({ type: 'Performance', description: `"${TestInfo.project.name}" - Start To Load Event End result time is : ${result.navigationResult}ms` });
  });

});
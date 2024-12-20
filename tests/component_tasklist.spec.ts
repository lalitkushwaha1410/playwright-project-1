import { test, expect } from "@playwright/test";
import { user } from "../testdata/users";
import { env } from "../testdata/environments";
import { TestHarnessPage } from "../pages/TestHarnessPage";
import {constanttext} from "../testdata/constants";

test.describe("Copy Editor View Automation Component Tests", async () => {
  let testharnessPage: TestHarnessPage;

  test.beforeEach(async ({ page }) => {
   // loginPage = await new LoginPage(page);
    testharnessPage = await new TestHarnessPage(page);
    await testharnessPage.URLToTestharness();
  });

  test('Pricing : Validate Ready to review record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewPricingPage();
    //await testharnessPage.check_passValidation();
    await page.waitForTimeout(3000);
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.click_submitondialog();
    await testharnessPage.URLToTestharness();
    await testharnessPage.moveToStatusAllPage();
    //await testharnessPage.validateLastUpdatedInGridData();
    //await testharnessPage.validateContentInGridData();
    await testharnessPage.validateContentTypeInGridData();
    await testharnessPage.validateMarketInGridData();
    await testharnessPage.validateLocationInGridData();
    await testharnessPage.validateLastUpdatedByInGridData(user.reviewAccess.name);
    await testharnessPage.validateStatusInGridData('Ready for review');
    //await testharnessPage.validatePricingAuthoringPageURL();
  });

  test('Validate availability of All, Ready for Review,In review and Ready to publish filters @regression @smoke ', async ({page,}) => { 
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validateAvaiabilityOfStatusFilters();
  });

  test('Validate No. Of Columns in Copy Editor View Table @regression @smoke ', async ({page,}) => { 
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validateNoOfColumns();
  });

  test('Validate column Header Names in Copy Editor View Table @regression @sanity', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validateColumnHeaders();
  });

  test('Validate filters count and categories  @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validateFilterContainers();
  });

  test('Validate column Sorting @regression @smoke', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validateSortingForColumn(); 
  });

  test('Validate review Button Visibility @regression @sanity', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validateReviewButton();
   
  });

  test('Pricing : Validate In review record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewPricingPage();
    await testharnessPage.check_passValidation();
    await page.waitForTimeout(3000);
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(3000);
    await testharnessPage.click_ActionButton1("Start Review")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(5000);

    await testharnessPage.URLToTestharness();
    await testharnessPage.moveToStatusAllPage();
    //await testharnessPage.validateLastUpdatedInGridData();
    //await testharnessPage.validateContentInGridData();
    await testharnessPage.validateContentTypeInGridData();
    await testharnessPage.validateMarketInGridData();
    await testharnessPage.validateLocationInGridData();
    await testharnessPage.validateLastUpdatedByInGridData(user.reviewAccess.name);
    await testharnessPage.validateStatusInGridData('In review');
  });

  test.skip('Validate unique items from Content Type column and compare with Content Type filter options @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateContentTypeFilterMatchingWithColumn();
  });

  test.skip('Validate unique items from Market column and compare with Market filter options @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateMarketFilterMatchingWithColumn();
  });

  test.skip('Validate unique items from Location column and compare with Location filter options @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateLocationFilterMatchingWithColumn();
  });

  test('Validate pagination buttons enablement @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.validatePaginationButtonsEnablement();
  });

  test('Validate ready For Review page contains only Ready for Review records @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateReadyForReviewFilterContainsReadyForReviewRecords();
  });

  test('Validate in Review page contains only In Review records @regression @smoke', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateInReviewFilterContainsOnlyInReviewRecords();
  });

  test('Validate filtered records with Content Type filter @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateRecordsAfterApplyingContentTypeFilterforColumn('Content');
  });

  test('Validate filtered records with Market filter @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateRecordsAfterApplyingMarketFilterforColumn('Benzene');
  });

  test('Validate filtered records with Location filter @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateRecordsAfterApplyingLocationFilterforColumn('Europe');
  });

  test('Validate filtered records with Last updated By filter @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.moveToStatusAllPage();
    await testharnessPage.ValidateFilteredRecordswithSubmittedByFilter('wf_reviewer');
  });

  test('Pricing Page : Validate Ready to publish record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewPricingPage();
    await testharnessPage.check_passValidation();
    await page.waitForTimeout(3000);
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(3000);
    await testharnessPage.click_ActionButton1("Start Review")
    await testharnessPage.click_submitondialog();
    await testharnessPage.click_ActionButton2("Approve")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(3000);
    await testharnessPage.URLToTestharness();
    await page.waitForTimeout(5000);
    await testharnessPage.moveToStatusAllPage();
    await page.waitForTimeout(5000);
    //await testharnessPage.validateLastUpdatedInGridData();
    //await testharnessPage.validateContentInGridData();
    await testharnessPage.validateContentTypeInGridData();
    await testharnessPage.validateMarketInGridData();
    await testharnessPage.validateLocationInGridData();
    await testharnessPage.validateLastUpdatedByInGridData(user.reviewAccess.name);
    await testharnessPage.validateStatusInGridData('Ready to publish');
  });

  test('Validate review button is disabled for ready for review records  @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.validateReviewBtnForReadyForReview();
  });

  // test.only('Validate review button is disabled for In Review records  @regression', async ({page,}) => {
  //   await testharnessPage.waitforPageToLoad();
  //   await testharnessPage.validateReviewBtnForInReview();
  //   await page.waitForTimeout(5000);
  // });

  test('Validate Content records do not contain blank data  @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.validateBlankDataInWorkspace('Content');
    await page.waitForTimeout(1000);
  });

  test('Validate Pricing records do not contain blank data except for Content Column @regression', async ({page,}) => {
    await testharnessPage.waitforPageToLoad();
    await testharnessPage.validateBlankDataInWorkspace('Pricing');
    await page.waitForTimeout(1000);
  });

  test('Pricing Page : Validate Correction Ready for review record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewPricingPageForCorrection();
    await testharnessPage.check_passValidation();
    await page.waitForTimeout(3000);
    await testharnessPage.click_ActionButton1("Send for review")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(3000);
    await testharnessPage.URLToTestharness();
    await page.waitForTimeout(3000);
    await testharnessPage.moveToStatusAllPage();
    await page.waitForTimeout(5000);
    //await testharnessPage.validateLastUpdatedInGridData();
    //await testharnessPage.validateContentInGridData();
    await testharnessPage.validateContentTypeInGridData();
    await testharnessPage.validateMarketInGridData();
    await testharnessPage.validateLocationInGridData();
    await testharnessPage.validateLastUpdatedByInGridData(user.reviewAccess.name);
    await testharnessPage.validateStatusInGridData('Correction ready for review');
  });

  test('Pricing Page : Validate Correction in review record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewPricingPageForCorrection();
    await testharnessPage.check_passValidation();
    await page.waitForTimeout(2000);
    await testharnessPage.click_ActionButton1("Send for review")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.click_ActionButton1("Start Review")
    await testharnessPage.click_submitondialog();
    await page.waitForTimeout(2000);
    await testharnessPage.URLToTestharness();
    await testharnessPage.moveToStatusAllPage();
    //await testharnessPage.validateLastUpdatedInGridData();
    //await testharnessPage.validateContentInGridData();
    await testharnessPage.validateContentTypeInGridData();
    await testharnessPage.validateMarketInGridData();
    await testharnessPage.validateLocationInGridData();
    await testharnessPage.validateLastUpdatedByInGridData(user.reviewAccess.name);
    await testharnessPage.validateStatusInGridData('Correction in review');
  });
  // below testcases are for Topic and Market pages which is out of scope for now
 /*
  test('Topic Page : Validate Under review record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewIntelligencePage();
    await testharnessPage.check_passValidation();
    await page.waitForTimeout(5000);
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.click_submitondialog();
    await testharnessPage.URLToTestharness();
    await testharnessPage.validateStatusInGridData('Under review');
  });

  test('Market Page : Validate Under review record @regression', async ({page,}) => {
    await testharnessPage.URLToWorkflowTestharness();
    await testharnessPage.createNewMarketPage();
    await testharnessPage.check_passValidation();
    await page.waitForTimeout(5000);
    await testharnessPage.click_ActionButton("Send for review")
    await testharnessPage.click_submitondialog();
    await testharnessPage.URLToTestharness();
    await testharnessPage.validateStatusInGridData('Under review');
  });
  */

});
import { test, expect, Locator, Page } from "@playwright/test";
import { user } from "../testdata/users";
import { env, getEnv, getBrowser } from "../testdata/environments";
import { LoginPage } from "../pages/LoginPage";
import { constanttext } from "../testdata/constants";
import * as fs from 'fs/promises';
import * as path from 'path';

let loginPage: LoginPage;
let sampleJsonText = "";
let contentText = "";
let contentTypeText = "";
let marketText = "";
let LocationText = "";
let extractedTime = [];

export class TestHarnessPage {
  readonly page: Page;
  readonly copyEditorTableColumns: Locator;
  readonly filterContainers: Locator;
  readonly sortingIcon: Locator;
  readonly reviewButton: Locator;
  readonly contentTypeValues : Locator;
  readonly clickOnFilter: Locator;
  readonly contentTypeFilterOptions: Locator;
  readonly editorViewBtn: Locator;
  readonly subscriberViewBtn: Locator;
  readonly copyEditorTableRows: Locator;
  readonly nextPageButton: Locator;
  readonly jumpLastPageButton: Locator;
  readonly FilterAll: Locator;
  readonly FilterReadyForReview: Locator;
  readonly FilterInReview: Locator;
  readonly statusColumnValues: Locator;
  readonly readyForReviewPage: Locator;
  readonly contentTypeFirstFilterOption: Locator;
  readonly marketColumnValues: Locator;
  readonly LocationColumnValues: Locator;
  readonly readyToPublishFilter: Locator;
  readonly submittedByColumnValues: Locator;
  readonly generateBusinessKeyBtn: Locator;
  readonly processIDPricing: Locator;
  readonly startWorkflowBtn: Locator;
  readonly sampleJsonBtn: Locator;
  readonly textarea: Locator;
  readonly workflowbutton: Locator;
  readonly workflowcontainer: Locator;
  readonly passValidationCheckbox: Locator;
  readonly submitBtn: Locator;
  readonly copyEditorTable: Locator;
  readonly processIDIntelligence: Locator;
  readonly processIDMarkets: Locator;
  readonly recordReviewBtn: Locator;
  readonly fetchAllLocation: Locator;
  readonly fetchAllMarket: Locator;
  readonly reviewBtn: Locator;
  readonly filterContentType: Locator;

  constructor(page: Page) {
    this.page = page;
    this.copyEditorTableColumns = page.locator('div[data-testid="page-list-table"] tr th');
    this.copyEditorTableRows =  page.locator('div[data-testid="page-list-table"] tr');
    this.filterContainers = page.locator('div[data-testid="filter-container"]>div');
    this.sortingIcon = page.locator('[data-icon^="chevron-"]');
    this.reviewButton = page.locator('button[data-testid="review-btn"]');
    this.contentTypeValues =  page.locator('div[data-testid="page-list-table"] tr td:nth-of-type(3)');
    this.statusColumnValues =  page.locator('div[data-testid="page-list-table"] tr td:nth-of-type(7)');
    this.marketColumnValues =  page.locator('div[data-testid="page-list-table"] tr td:nth-of-type(4)');
    this.LocationColumnValues =  page.locator('div[data-testid="page-list-table"] tr td:nth-of-type(5)');
    this.submittedByColumnValues =  page.locator('div[data-testid="page-list-table"] tr td:nth-of-type(6)');
    this.clickOnFilter =  page.locator('div[class="dropdown-heading"]');
    this.contentTypeFilterOptions = page.locator('div[class="dropdown-content"]')
    this.editorViewBtn = page.locator('text="Editor view"');
    this.subscriberViewBtn = page.locator('text="Subscriber view (default)"');
    this.nextPageButton = page.locator('button[data-testid="right-button"]');
    this.jumpLastPageButton = page.locator('button[data-testid="jump-last-page-button"]');
    this.FilterAll = page.getByText("All");
    this.FilterReadyForReview = page.getByTestId('page-status-filter-READY_FOR_REVIEW');
    this.FilterInReview = page.getByTestId('page-status-filter-IN_REVIEW');
    this.readyToPublishFilter = page.getByTestId('page-status-filter-Ready to publish');
    this.readyForReviewPage = page.locator('button[data-testid="page-status-filter-Ready for review"]');
    this.contentTypeFirstFilterOption = this.page.locator('label[class="select-item "]>div');
    this.startWorkflowBtn = page.getByRole("button", { name: "Start Workflow" });
    this.generateBusinessKeyBtn = page.getByRole("button", { name: "Generate Guid" });
    this.processIDPricing = page.locator('input[name="processDefinitionKey"][id="pricing"]');
    this.processIDIntelligence = page.locator('input[name="processDefinitionKey"][id="intelligence"]');
    this.processIDMarkets = page.locator('input[name="processDefinitionKey"][id="markets"]');
    this.sampleJsonBtn = page.locator('button', { hasText: 'Sample JSON' });
    this.textarea = page.locator('#userVariables');
    this.workflowcontainer = page.getByTestId("workflow-container");
    this.workflowbutton = this.workflowcontainer.getByRole("button");
    this.passValidationCheckbox = page.locator('input[type="checkbox"][name="allowNextActionsAvailable"]');
    this.submitBtn = page.getByTestId("modal-footer-workflow-action-btn");
    this.copyEditorTable = page.locator('[data-testid="page-list-table"]');
    this.recordReviewBtn = page.locator('button[data-testid="review-btn"]');
    this.fetchAllLocation = page.getByTestId('page-location');
    this.fetchAllMarket = page.getByTestId('page-market');
    this.reviewBtn = page.getByTestId('review-btn');
    this.filterContentType = page.getByTestId('content-type-filter');

  }

  async URLToTestharness() {
    await this.page.goto(getEnv().AuthoringUrl);
  }

  async URLToWorkflowTestharness() {
    await this.page.goto(getEnv().WorkflowTestHarnessURL);
  }

  async createNewPricingPage() {
    await this.fillContentID();
    await this.fillProcessIDPricing();
    //await this.clickSampleJson();
    await this.fillSampleJsonForPricing();
    await this.click_CreateNew();
  }

  async createNewIntelligencePage() {
    await this.fillContentID();
    await this.fillProcessIDIntelligence();
    await this.clickSampleJson();
    await this.fillSampleJsonForIntelligence();
    await this.click_CreateNew();
  }

  async createNewMarketPage() {
    await this.fillContentID();
    await this.fillProcessIDMarket();
    await this.clickSampleJson();
    await this.fillSampleJsonForMarkets();
    await this.click_CreateNew();
  }

  async createNewPricingPageForCorrection() {
    await this.fillContentID();
    await this.fillProcessIDPricing();
    await this.fillPricingJsonForCorrection();
    await this.click_CreateNew();
  }


  async fillContentID() {
    await this.generateBusinessKeyBtn.click();
  }

  async fillProcessIDPricing() {
    await this.processIDPricing.click();
  }

  async fillProcessIDIntelligence() {
    await this.processIDIntelligence.click();
  }

  async fillProcessIDMarket() {
    await this.processIDMarkets.click();
  }

  async click_CreateNew() {
    await this.startWorkflowBtn.click();
  }

  async check_passValidation() {
    await this.passValidationCheckbox.check();
  }

  async fillSampleJsonForPricing() {
    const constanttext = {
      sampleJson: {
        JsonText: {
          "workflowType": "new",
          "targetProcess": "pricing-advance",
          "content": `Pricing Automation Content-${new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')}`,
          "contentType": "Pricing",
          "market": "Melamine",
          "location": "Americas",
          "saveToTasklistDb": true
      }
      }
    };
    contentText = constanttext.sampleJson.JsonText.content;
    contentTypeText = constanttext.sampleJson.JsonText.contentType;
    marketText = constanttext.sampleJson.JsonText.market;
    LocationText = constanttext.sampleJson.JsonText.location; 
    sampleJsonText = JSON.stringify(constanttext.sampleJson.JsonText);
    await this.textarea.fill(sampleJsonText);
  }

  async fillPricingJsonForCorrection() {
    const constanttext = {
      sampleJson: {
        JsonText: {
          "workflowType": "correction",
          "targetProcess": "pricing-advance",
          "content": `Pricing Automation Content-${new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')}`,
          "contentType": "Pricing",
          "market": "Melamine",
          "location": "Americas",
          "saveToTasklistDb": true
      }
      }
    };
    contentText = constanttext.sampleJson.JsonText.content;
    contentTypeText = constanttext.sampleJson.JsonText.contentType;
    marketText = constanttext.sampleJson.JsonText.market;
    LocationText = constanttext.sampleJson.JsonText.location; 
    sampleJsonText = JSON.stringify(constanttext.sampleJson.JsonText);
    await this.textarea.fill(sampleJsonText);
  }

  async fillSampleJsonForIntelligence() {
    const constanttext = {
      sampleJson: {
        JsonText: {
          "workflowType": "new",
          "publishOnDate": "2024-09-25T17:51:53Z",
          "content": `Topics Automation Content-${new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')}`,
          "contentType": "Topics",
          "market": "Benzene",
          "location": "Europe",
          "saveToTasklistDb": true
      }
      }
    };
    contentText = constanttext.sampleJson.JsonText.content;
    sampleJsonText = JSON.stringify(constanttext.sampleJson.JsonText);
    await this.textarea.fill(sampleJsonText);
  }

  async fillSampleJsonForMarkets() {
    const constanttext = {
      sampleJson: {
        JsonText: {
          "workflowType": "new",
          "publishOnDate": "2024-09-25T17:51:53Z",
          "content": `Markets Automation Content-${new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')}`,
          "contentType": "C-HUB",
          "market": "Benzene",
          "location": "Europe",
      }
      }
    };
    contentText = constanttext.sampleJson.JsonText.content;
    sampleJsonText = JSON.stringify(constanttext.sampleJson.JsonText);
    await this.textarea.fill(sampleJsonText);
  }

  async extractTimeFromContent() {
    const text = contentText;
    const timePattern = /\b\d{1,2}:\d{2}\b/; 
    extractedTime = text.match(timePattern);
    //console.log("extracted time-",extractedTime[0]);
  }

  async validateLastUpdatedInGridData() {
    const lastUpdatedLocator = this.copyEditorTable.first().locator('tr:first-child td:nth-child(1) div');
    const lastUpdatedLocatorText = await lastUpdatedLocator.textContent();
    //console.log("last updated time in grid",lastUpdatedLocatorText);
    this.extractTimeFromContent();
    expect(lastUpdatedLocatorText).toEqual(extractedTime[0]);  
  }

  async validateStatusInGridData(status) { 
    const statusCell = this.copyEditorTable.locator('tr:first-child td:nth-child(7)');
    const statusText = await statusCell.textContent();
    expect(statusText).toEqual(status);
  }

  async validateContentInGridData() {
    const contentLocator = this.copyEditorTable.locator('tr:first-child td:nth-child(2) div');
    const tableContentText = await contentLocator.textContent();
    expect(tableContentText).toEqual(contentText);  
  }

  async validateContentTypeInGridData() {
    const contentTypeLocator = this.copyEditorTable.locator('tr:first-child td:nth-child(3) div');
    const tableContentTypeText = await contentTypeLocator.textContent();
    console.log("content type in grid -",tableContentTypeText);
    expect(tableContentTypeText).toEqual(contentTypeText);  
  }

  async validateMarketInGridData() {
    const marketLocator = this.copyEditorTable.locator('tr:first-child td:nth-child(4) div');
    const marketLocatorText = await marketLocator.textContent();
    expect(marketLocatorText).toEqual(marketText);  
  }

  async validateLocationInGridData() {
    const locationLocator = this.copyEditorTable.locator('tr:first-child td:nth-child(5) div');
    const locationLocatorText = await locationLocator.textContent();
    expect(locationLocatorText).toEqual(LocationText);
  }

  async validateLastUpdatedByInGridData(username) {
    const lastUpdatedByLocator = this.copyEditorTable.locator('tr:first-child td:nth-child(6) div');
    const lastUpdatedByLocatorText = await lastUpdatedByLocator.textContent();
    expect(lastUpdatedByLocatorText).toEqual(username);
  }

  async clickSampleJson() {
    await this.sampleJsonBtn.click();  
  }

  async waitforPageToLoad() {
    await this.page.waitForSelector('div[data-testid="page-list-table"] tr th');
  }

  async validateNoOfColumns() {
    const tableColumns = await this.copyEditorTableColumns.count();
    const expectedColumns = 8;
    expect(tableColumns).toEqual(expectedColumns);
  }

  async validateColumnHeaders() {
    const headerNames = await this.copyEditorTableColumns.allTextContents();
    const expectedHeaders = ["Last Updated", "Content", "Content type", "Market", "Location", "Last updated by", "Status", ""];
    expect(headerNames).toEqual(expectedHeaders);
  }
 
  async validateFilterContainers() {
    const filterContainers = await this.filterContainers.count();
    const expectedFilters = 5;
    expect(filterContainers).toEqual(expectedFilters);
    const storageArray = [];
    for (let i = 0; i < filterContainers; i++) {
      const filterName = (await this.filterContainers.allTextContents())[i].split('Please select')[0].trim();
      storageArray.push(filterName);
    }
    const expectedFilterNames = ["Content type", "Market", "Location", "Last Updated by", "Reset Filters"];
    expect(storageArray).toEqual(expectedFilterNames);
  }

  async validateSortingForColumn() {
    const headers = await this.copyEditorTableColumns;
    const headerCount = await headers.count();
    for (let i = 0; i < headerCount - 1; i++) {
      await headers.nth(i).click();
      await this.page.waitForTimeout(500);
      const isSortingIconVisible = await headers.nth(i).locator(this.sortingIcon).isVisible();
      expect(isSortingIconVisible).toBe(true);
    }
  }

  async validateReviewButton() {
  const isReviewButtonVisible = await this.reviewButton.first().isDisabled();
  expect(isReviewButtonVisible).toBe(true);
  const reviewButtonText = await this.reviewButton.first().textContent();
  expect(reviewButtonText).toEqual("Review");
  }
    
  async ValidateContentTypeFilterMatchingWithColumn() {
    await this.page.waitForTimeout(5000);
    const contentTypeColumnLocator = this.contentTypeValues; 
    const contentTypeValuesText = await contentTypeColumnLocator.allTextContents();
    const uniqueContentTypes = Array.from(new Set(contentTypeValuesText));
  
    this.clickOnFilter.first().click();
    await this.page.waitForTimeout(5000);
    const FilterText = await this.contentTypeFilterOptions.allTextContents();
    const contentTypeFilterOptions = FilterText.join(' ').match(/([A-Z][a-z]+(?: [A-Z][a-z]+)*|[A-Z]-[A-Z][a-z]+|[A-Z][a-z]+)/g);
    const uniqueContentTypesSorted = uniqueContentTypes.sort();
    const filterOptionsSorted = contentTypeFilterOptions.sort();
    expect(contentTypeFilterOptions).toContain(uniqueContentTypes);
  }

  async ValidateReadyForReviewFilterContainsReadyForReviewRecords() {
    await this.FilterReadyForReview.click();
    await this.page.waitForTimeout(2000);
    const statusColumnLocator = this.statusColumnValues; 
    const readyForReviewStatusText = await statusColumnLocator.allTextContents();
    const statusArraywithUniques = Array.from(new Set(readyForReviewStatusText));
    expect(statusArraywithUniques[0]).toEqual("Ready for review");
  }

    async validatePaginationButtonsEnablement() {
    const totalItems = await this.copyEditorTableRows.count();
    const nextPageButton = await this.nextPageButton;
    const jumpLastPageButton = await this.jumpLastPageButton;
    if (totalItems >= 10) {
        expect(await nextPageButton.isEnabled()).toBeTruthy();
        expect(await jumpLastPageButton.isEnabled()).toBeTruthy();
    } else {
        expect(await nextPageButton.isEnabled()).toBeFalsy();
        expect(await jumpLastPageButton.isEnabled()).toBeFalsy();
    }
  }

  async validateAvaiabilityOfStatusFilters() {
    const FilterAllText = await this.FilterAll.allTextContents();
    const AllTextPArt = FilterAllText[0].match(/[A-Za-z]+/g)[0];
    expect(AllTextPArt).toEqual("All");
    const FilterReadyForReviewText = await this.FilterReadyForReview.textContent();
    const ReadyForReviewTextPart = FilterReadyForReviewText.match(/^[A-Za-z\s]+(?=\d+)/)[0].trim();
    expect(ReadyForReviewTextPart).toEqual("Ready for review");
    const FilterInReviewText = await this.FilterInReview.textContent();
    const InReviewTextPart = FilterInReviewText.match(/^[A-Za-z\s]+(?=\d+)/)[0].trim();
    expect(InReviewTextPart).toEqual("In review");
    // const FilterReadytoPublishText = await this.readyToPublishFilter.textContent();
    // const readyToPublishTextPart = FilterReadytoPublishText.match(/^[A-Za-z\s]+(?=\d+)/)[0].trim();
    // expect(readyToPublishTextPart).toEqual("Ready to publish"); 
  }

  async moveToStatusAllPage() {
    await this.FilterAll.click();
  }

  async ValidateInReviewFilterContainsOnlyInReviewRecords() {
    await this.FilterInReview.click();
    await this.page.waitForTimeout(2000);
    const statusColumnLocator = this.statusColumnValues; 
    const inReviewStatusText = await statusColumnLocator.allTextContents();
    const statusArraywithUniques = Array.from(new Set(inReviewStatusText));
    expect(statusArraywithUniques[0]).toEqual("In review");
  }

  async ValidateRecordsAfterApplyingContentTypeFilterforColumn(filterValue) {
    await this.clickOnFilter.first().click();
    await this.page.waitForTimeout(1000);
    await this.contentTypeFirstFilterOption.locator(`text=${filterValue}`).click();
    await this.page.waitForTimeout(5000);
    await this.clickOnFilter.first().click();
    const contentTypeColumnLocator = this.contentTypeValues;
    const contentTypeValuesText = await contentTypeColumnLocator.allTextContents();
    const uniqueContentTypes = Array.from(new Set(contentTypeValuesText));
    expect(uniqueContentTypes[0]).toEqual(filterValue);
  }

  async ValidateRecordsAfterApplyingMarketFilterforColumn(filterValue) {
    await this.clickOnFilter.nth(1).click();
    await this.page.waitForTimeout(1000);
    await this.contentTypeFirstFilterOption.locator(`text=${filterValue}`).click();
    await this.page.waitForTimeout(5000);
    await this.clickOnFilter.nth(1).click();
    const marketColumnLocator = this.marketColumnValues;
    const marketColumnText = await marketColumnLocator.allTextContents();
    const uniqueMarkets = Array.from(new Set(marketColumnText));
    expect(uniqueMarkets[0]).toEqual(filterValue);
  }

  async ValidateRecordsAfterApplyingLocationFilterforColumn(filterValue) {
    await this.clickOnFilter.nth(2).click();
    await this.contentTypeFirstFilterOption.locator(`text=${filterValue}`).click();
    await this.page.waitForTimeout(5000);
    await this.clickOnFilter.nth(2).click();
    await this.page.waitForTimeout(5000);
    const LocationColumnLocator = this.LocationColumnValues;
    const locationColumnText = await LocationColumnLocator.allTextContents();
    const uniqueLocation = Array.from(new Set(locationColumnText));
    expect(uniqueLocation[0]).toEqual(filterValue);
  }

  async ValidateFilteredRecordswithSubmittedByFilter(filterValue) {
    await this.clickOnFilter.nth(3).click();
    await this.page.waitForTimeout(1000);
    await this.contentTypeFirstFilterOption.locator(`text=${filterValue}`).click();
    await this.page.waitForTimeout(5000);
    await this.clickOnFilter.nth(3).click();
    const submittedByColumnLocator = this.submittedByColumnValues;
    const subkittedByColumnText = await submittedByColumnLocator.allTextContents();
    const uniqueLocation = Array.from(new Set(subkittedByColumnText));
    expect(uniqueLocation[0]).toEqual(filterValue);
  }

  async ValidateMarketFilterMatchingWithColumn() {
    const marketColumnLocator = this.marketColumnValues; 
    const marketValuesText = await marketColumnLocator.allTextContents();
    const uniqueMarkets = Array.from(new Set(marketValuesText));
    // console.log(uniqueMarkets);
    uniqueMarkets.push('Select All');
    this.clickOnFilter.nth(1).click();
    await this.page.waitForTimeout(500);
    const FilterText = await this.contentTypeFilterOptions.allTextContents();
    // console.log(FilterText);
    const contentTypeFilterOptions = FilterText.join(' ').match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/g);
    // console.log(contentTypeFilterOptions);
    const uniqueMarketSorted = uniqueMarkets.sort();
    const filterOptionsSorted = contentTypeFilterOptions.sort();
    expect(uniqueMarketSorted).toEqual(filterOptionsSorted);
  }

  async ValidateLocationFilterMatchingWithColumn() {
    const locationColumnLocator = this.LocationColumnValues; 
    const locationValuesText = await locationColumnLocator.allTextContents();
    const uniqueLocation = Array.from(new Set(locationValuesText));
    // console.log(uniqueLocation);
    uniqueLocation.push('Select All');
    this.clickOnFilter.nth(2).click();
    await this.page.waitForTimeout(500);
    const FilterText = await this.contentTypeFilterOptions.allTextContents();
    const contentTypeFilterOptions = FilterText.join(' ').match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:-[A-Z][a-z]+)?)/g);
    // console.log(contentTypeFilterOptions);
    const uniqueLocationSorted = uniqueLocation.sort();
    const filterOptionsSorted = contentTypeFilterOptions.sort();
    expect(uniqueLocationSorted).toEqual(filterOptionsSorted);
  }

  async click_ActionButton(actionbutton) {
    await this.workflowbutton.nth(0).waitFor();
    await this.workflowbutton.nth(0).click();
  }
  async click_ActionButton1(actionbutton) {
    await this.workflowbutton.nth(1).waitFor();
    await this.workflowbutton.nth(1).click();
  }
  async click_ActionButton2(actionbutton) {
    await this.workflowbutton.nth(2).waitFor();
    await this.workflowbutton.nth(2).click();
  }
  async click_submitondialog() {
    await this.submitBtn.click();
  }

  async clickReviewButton() {
    const reviewLocator = this.copyEditorTable.locator('tr:first-child td:nth-child(8)');
    await this.page.waitForTimeout(18000);
    await reviewLocator.click();
    await this.page.waitForTimeout(8000);
  }

  async validatePricingAuthoringPageURL() {
    await this.clickReviewButton();
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(constanttext.pricingURL);
  
  }

  async validateReviewBtnForReadyForReview() {
    const reviewEnabled = await this.reviewBtn.first().isEnabled();
    //console.log(reviewEnabled);
    expect(reviewEnabled).toBe(false);
  }

  async validateReviewBtnForInReview() {
    await this.FilterInReview.click();
    await this.page.waitForTimeout(2000);
    const reviewDisabled = await this.reviewBtn.first().isEnabled();
    //console.log(reviewDisabled);
    expect(reviewDisabled).toBe(false);
  }

async validateBlankDataInWorkspace(workspace){
  await this.filterContentType.click();
  await this.page.waitForTimeout(2000);
  await this.page.click(`text="${workspace}"`);
  await this.page.waitForTimeout(1000);
const firstRow = await this.page.locator('table tbody tr').first();
const firstRowCells = await firstRow.locator('td').allTextContents();
//console.log(firstRowCells);
const workspaceName = workspace;
for (let i = 0; i < firstRowCells.length; i++) {
    const cellValue = firstRowCells[i].trim();
    if (i === 1 && workspaceName === 'Pricing') {
        continue;
    }
    if (cellValue === '-') {
        throw new Error(`Blank data found in ${workspace} record.`);
    }
  }
    console.log("Validation passed, No Blank Data found");
}


}

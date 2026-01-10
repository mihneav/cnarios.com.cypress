import { DatePickerPage } from "../support/pageRepository/datepickerPage.js";

describe("Date Picker Page Tests", () => {
  const datePickerPage = new DatePickerPage();
  let testData;

  before(() => {
    cy.fixture("datepickerTestData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    datePickerPage.visit();
  });

  /**
   * Open the employment modal
   * Enter company name as 'Google'
   * Select start date as '2022-01-01'
   * Select end date as '2023-01-01'
   * Click Add button
   * Verify that 'Google' appears in the employment list
   */
  it(
    `Employment entry should appear in the list without errors`,
    { tags: ["@positive", "@high"] },
    () => {
      const google = testData.google;
      datePickerPage.addEmployment(google);
      datePickerPage.addButton.click();
      datePickerPage.verifyEmploymentEntry(google);
    }
  );

  /**
   * Add a job with start date '2021-01-01' and end date '2022-01-01'
   * Open modal again
   * Enter a new job with start date '2021-06-01' and end date '2021-12-01'
   * Click Add
   * Verify warning is displayed and job is not added to the list
   */
  it(
    `Warning should be shown and record should not be added`,
    { tags: ["@negative", "@high"] },
    () => {
      const microsoft = testData.microsoft;
      const amazon = testData.amazon;

      datePickerPage.addEmployment(microsoft);
      datePickerPage.addButton.click();
      datePickerPage.verifyEmploymentEntry(microsoft);

      datePickerPage.addEmployment(amazon);
      datePickerPage.addButton.click();
      datePickerPage.verifyAlert(datePickerPage.overlappingDatesMessage);
      cy.press("Escape"); // Close modal
      datePickerPage.verifyEmploymentEntryNotPresent(amazon.company);
    }
  );

  /**
   * Add job A from '2019-01-01' to '2020-01-01'
   * Add job B from '2020-02-01' to '2021-02-01'
   * Verify both jobs appear in the employment list
   */
  it(
    `All records should be saved and displayed correctly`,
    { tags: ["@positive", "@medium"] },
    () => {
      const jobA = testData.jobA;
      const jobB = testData.jobB;

      datePickerPage.addEmployment(jobA);
      datePickerPage.addButton.click();
      datePickerPage.verifyEmploymentEntry(jobA);

      datePickerPage.addEmployment(jobB);
      datePickerPage.addButton.click();
      datePickerPage.verifyEmploymentEntry(jobB);
    }
  );

  /**
   * Open the modal
   * Enter a company name
   * Leave start and end dates empty
   * Click Add
   * Verify form does not submit and shows date-related errors
   */
  it(
    `Form should show validation error and block submission`,
    { tags: ["@positive", "@medium"] },
    () => {
      const invalidCompany = testData.invalidCompany;

      datePickerPage.addEmploymentButton.click();
      datePickerPage.companyInput.type(invalidCompany.company);
      datePickerPage.addButton
        .invoke("removeAttr", datePickerPage.disabledAttribute)
        .invoke("removeClass", datePickerPage.muiDisabledClass);
      datePickerPage.addButton.click();
      datePickerPage.verifyAlert(datePickerPage.mandatoryFieldsMessage);
    }
  );

  /**
   * Open the modal
   * Enter start date '2023-01-01'
   * Enter end date '2022-01-01'
   * Click Add
   * Verify an error is shown and job is not added
   */
  it(
    `Validation message should be shown and form should not submit`,
    { tags: ["@positive", "@medium"] },
    () => {
      const invalidDates = testData.invalidDates;

      datePickerPage.addEmployment(invalidDates);
      datePickerPage.verifyAlert(datePickerPage.mandatoryFieldsMessage);
    }
  );

  /**
   * Open the modal
   * Enter start date and end date as '2023-05-15'
   * Enter a valid company name
   * Click Add
   * Verify if entry is added without validation errors
   */
  it(
    `Record should be added if allowed by business logic`,
    { tags: ["@positive", "@medium"] },
    () => {
      const ibm = testData.ibm;

      datePickerPage.addEmployment(ibm);
      datePickerPage.addButton.click();
      datePickerPage.verifyEmploymentEntry(ibm);
    }
  );

  /**
   * Click Add Employment button
   * Enter sample data
   * Click outside or press Escape
   * Verify modal closes and data is not added to the list
   */
  it(
    `Modal closes and no new data is added`,
    { tags: ["@positive", "@medium"] },
    () => {
      const ibm = testData.ibm;

      datePickerPage.addEmployment(ibm);
      cy.press("Escape"); // Close modal
      datePickerPage.verifyEmploymentEntryNotPresent(ibm.company);
    }
  );

  /**
   * Open the employment modal
   * Enter company name as 'Amazon'
   * Select start date as '2021-01-01'
   * Select end date as '2022-01-01'
   * Click Add button
   * Verify that 'Amazon' appears in the employment list
   * Click the delete icon next to 'Amazon'
   * Verify that 'Amazon' is removed from the employment list
   */
  it(
    `The selected employment record should be removed from the list`,
    { tags: ["@positive", "@medium"] },
    () => {
      const amazonDelete = testData.amazonDelete;

      datePickerPage.addEmployment(amazonDelete);
      datePickerPage.addButton.click();
      datePickerPage.verifyEmploymentEntry(amazonDelete);
      datePickerPage.deleteEmploymentEntry(amazonDelete.company).click();
      datePickerPage.verifyEmploymentEntryNotPresent(amazonDelete.company);
    }
  );
});

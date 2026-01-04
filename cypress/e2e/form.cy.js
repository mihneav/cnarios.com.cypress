import { FormPage } from "../support/pageRepository/formPage.js";

describe("Form Page Tests", () => {
  const formPage = new FormPage();

  beforeEach(() => {
    formPage.visit();
  });

  /**
   * Navigate to the Event Registration form page
   * Enter valid full name (e.g., John Doe)
   * Enter valid email address (e.g., john@example.com)
   * Enter valid phone number (e.g., +919876543210)
   * Select an event from the dropdown
   * Enter valid number of tickets (e.g., 2)
   * Click the Register button
   * Verify loader is displayed
   * Verify confirmation dialog appears with correct details and 2 unique ticket IDs
   */
  it(
    `Form should submit successfully, loader should appear, and confirmation dialog should display with generated ticket IDs`,
    { tags: ["@positive", "@high"] },
    () => {
      cy.fillAndSubmitForm();
      cy.verifyFormSubmission();
    }
  );

  /**
   * Navigate to the Event Registration form page
   * Leave one or more fields empty
   * Try clicking the Register button
   * Verify Register button is disabled and form cannot be submitted
   */
  it(
    `Submit button should remain disabled until all fields are filled correctly`,
    { tags: ["@positive", "@medium"] },
    () => {
      cy.fillFormWithValidation();
    }
  );

  /**
   * Navigate to the Event Registration form page
   * Enter valid full name
   * Enter invalid email address (e.g., user@.com)
   * Enter valid phone number
   * Select an event
   * Enter valid number of tickets
   * Verify email field shows error message
   */
  it(
    `Error message should appear below the email field and submission should be blocked`,
    { tags: ["@negative", "@medium"] },
    () => {
      cy.fillForm();
      cy.emptyForm();
      cy.verifyFormErrorMessages();
    }
  );

  /**
   * Navigate to the Event Registration form page
   * Enter valid full name
   * Enter valid email
   * Enter phone number with 5 digits (e.g., 12345)
   * Select an event
   * Enter valid number of tickets
   * Verify phone field shows error message
   */
  it(
    "Error message should appear below the phone field and submission should be blocked",
    { tags: ["@negative", "@medium"] },
    () => {
      cy.fillForm();
      cy.verifyPhoneErrorMessage();
    }
  );

  /**
   * Navigate to the Event Registration form page
   * Enter valid full name
   * Enter valid email
   * Enter valid phone number
   * Select an event
   * Enter ticket count as 0
   * Verify error message is displayed for tickets field
   */
  it(
    "Error message should appear below tickets field and Register button should remain disabled",
    { tags: ["@negative", "@high"] },
    () => {
      cy.fillForm();
      cy.verifyTicketsErrorMessage();
    }
  );

  /**
   * Navigate to the Event Registration form page
   * Fill all fields with valid data
   * Click the Reset button
   * Verify all fields are cleared and tickets reset to 1
   */
  it(
    "All fields should be cleared and tickets reset to 1",
    { tags: ["@positive", "@low"] },
    () => {
      cy.fillForm();
      formPage.getResetButton().click();
      cy.verifyFormReset();
    }
  );

  /**
   * Navigate to the Event Registration form page
   * Enter valid full name
   * Enter valid email
   * Enter valid phone number
   * Select an event
   * Enter number of tickets as 3
   * Click the Register button
   * Wait for confirmation dialog
   * Verify 3 unique ticket IDs are shown
   */
  it(
    "Confirmation dialog should display as many ticket IDs as number of tickets entered, all unique",
    { tags: ["@positive", "@high"] },
    () => {
      let expectedCount = "3";
      cy.fillForm();
      formPage.getTicketsInput().clear().type(expectedCount);
      formPage.getSubmitButton().click();
      cy.verifyUniqueTicketIds(expectedCount);
    }
  );
});

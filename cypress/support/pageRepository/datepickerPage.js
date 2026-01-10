export class DatePickerPage {
  #url = "/datepicker#try-it-yourself";
  #selectors = {
    addEmploymentButton:
      ".MuiBox-root > .MuiButtonBase-root:contains('Add Employment')",
    modal: {
      container: ".MuiDialog-container > .MuiPaper-root",
      companyInput: ".company-name",
      startDatePicker: ".start-date",
      endDatePicker: ".end-date",
      addButton: ".MuiStack-root > .MuiButtonBase-root",
      alert: ".MuiAlert-message",
    },
    deleteEmploymentButton: '[aria-label="delete employment"]',
    employmentEntry: {
      container: (companyName) =>
        `div.MuiStack-root > :contains("${companyName}")`,
      companyName: `.MuiTypography-root:first`,
      startDate: `.MuiTypography-root:nth-of-type(2)`,
      endDate: `.MuiTypography-root:nth-of-type(3)`,
    },
  };
  #validationMessages = {
    mandatoryFields: "Fill all the mandatory fields!!",
    overlappingDates:
      "Overlapping employment detected. Please adjust the dates.",
  };
  #disabledAttribute = "disabled";
  #muiDisabled = "Mui-disabled";

  visit() {
    cy.visit(this.#url);
  }

  // Element getters
  get addEmploymentButton() {
    return cy.get(this.#selectors.addEmploymentButton);
  }

  #getModalContainer() {
    return cy.get(this.#selectors.modal.container);
  }

  get companyInput() {
    return this.#getModalContainer().find(this.#selectors.modal.companyInput);
  }

  get startDatePicker() {
    return this.#getModalContainer().find(
      this.#selectors.modal.startDatePicker
    );
  }

  get endDatePicker() {
    return this.#getModalContainer().find(this.#selectors.modal.endDatePicker);
  }

  get addButton() {
    return this.#getModalContainer().find(this.#selectors.modal.addButton);
  }

  get modalAlert() {
    return this.#getModalContainer().find(this.#selectors.modal.alert);
  }

  get disabledAttribute() {
    return this.#disabledAttribute;
  }

  get muiDisabledClass() {
    return this.#muiDisabled;
  }

  employmentEntry(companyName) {
    return cy.get(this.#selectors.employmentEntry.container(companyName));
  }

  #getEmploymentEntryElement(companyName, elementSelector) {
    return cy.get(
      `${this.#selectors.employmentEntry.container(
        companyName
      )} ${elementSelector}`
    );
  }

  entryCompanyName(companyName) {
    return this.#getEmploymentEntryElement(
      companyName,
      this.#selectors.employmentEntry.companyName
    );
  }

  entryStartDate(companyName) {
    return this.#getEmploymentEntryElement(
      companyName,
      this.#selectors.employmentEntry.startDate
    );
  }

  entryEndDate(companyName) {
    return this.#getEmploymentEntryElement(
      companyName,
      this.#selectors.employmentEntry.endDate
    );
  }

  deleteEmploymentEntry(companyName) {
    return this.#getEmploymentEntryElement(
      companyName,
      this.#selectors.deleteEmploymentButton
    );
  }

  get mandatoryFieldsMessage() {
    return this.#validationMessages.mandatoryFields;
  }

  get overlappingDatesMessage() {
    return this.#validationMessages.overlappingDates;
  }

  // Actions
  addEmployment(employmentData) {
    this.addEmploymentButton.click();
    if (employmentData.company) {
      this.companyInput.type(employmentData.company);
    }
    this.startDatePicker.type(employmentData.startDate);
    this.endDatePicker.type(employmentData.endDate);
  }

  // Assertions
  verifyEmploymentEntry(employmentData) {
    this.employmentEntry(employmentData.company).should("exist");
    this.entryCompanyName(employmentData.company).should(
      "have.text",
      `Company: ${employmentData.company}`
    );
    this.entryStartDate(employmentData.company).should(
      "have.text",
      `Start: ${employmentData.startDate}`
    );
    this.entryEndDate(employmentData.company).should(
      "have.text",
      `End: ${employmentData.endDate}`
    );
  }

  verifyAlert(alertMessage) {
    this.modalAlert.should("have.text", alertMessage);
  }

  verifyEmploymentEntryNotPresent(companyName) {
    this.employmentEntry(companyName).should("not.exist");
  }
}

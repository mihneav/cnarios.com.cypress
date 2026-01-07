export class FormPage {
  #url = "/form#try-it-yourself";
  #getByTestId(testId) {
    return `[data-testid='${testId}']`;
  }
  #fullNameInput = this.#getByTestId("input-fullname");
  #emailInput = this.#getByTestId("input-email");
  #phoneInput = this.#getByTestId("input-phone");
  #selectDropdown = ".MuiSelect-select";
  #ticketsInput = this.#getByTestId("input-tickets");
  #submitButton = this.#getByTestId("btn-submit");
  #resetButton = this.#getByTestId("btn-reset");
  #dropdown = "#menu- > .MuiPaper-root";

  #modal = {
    container: ".MuiDialog-container > .MuiPaper-root",
    title: "#confirm-dialog-title",
    content: ".MuiDialogContent-root",
    closeButton: ".MuiButton-text",
    confirmButton: this.#getByTestId("btn-confirm"),
    cancelButton: this.#getByTestId("btn-cancel"),
    fullName: this.#getByTestId("confirm-fullname"),
    email: this.#getByTestId("confirm-email"),
    phone: this.#getByTestId("confirm-phone"),
    event: this.#getByTestId("confirm-event"),
    tickets: this.#getByTestId("confirm-tickets"),
    ticketIds: this.#getByTestId("ticket-id-list"),
  };

  #errorMessage = {
    fullName: "#«r1»-helper-text",
    email: "#«r2»-helper-text",
    phone: "#«r3»-helper-text",
    tickets: "#«r5»-helper-text",
  };

  #TICKET_ID_PATTERN = /T102-/;
  #DEFAULT_SELECT_OPTION = "-- Select --";

  #ERROR_MESSAGES = {
    fullName: "Enter at least 3 characters",
    email: "Enter a valid email address",
    phone: "Enter a valid phone (7-15 digits)",
    tickets: "Enter an integer between 1 and 10",
  };

  #personalInfo = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+919876543210",
    event: "Automation Summit",
    numberOfTickets: "2",
  };

  visit() {
    cy.visit(this.#url);
  }

  get fullNameInput() {
    return cy.get(this.#fullNameInput);
  }

  get emailInput() {
    return cy.get(this.#emailInput);
  }

  get phoneInput() {
    return cy.get(this.#phoneInput);
  }

  get selectDropdown() {
    return cy.get(this.#selectDropdown);
  }

  get ticketsInput() {
    return cy.get(this.#ticketsInput);
  }

  get submitButton() {
    return cy.get(this.#submitButton);
  }

  get resetButton() {
    return cy.get(this.#resetButton);
  }

  dropDownValue(value) {
    return cy.get(this.#dropdown).contains(value);
  }

  get modal() {
    return cy.get(this.#modal.container);
  }

  get modalTitle() {
    return cy.get(this.#modal.title);
  }

  get modalFullName() {
    return cy.get(this.#modal.fullName);
  }

  get modalEmail() {
    return cy.get(this.#modal.email);
  }

  get modalPhone() {
    return cy.get(this.#modal.phone);
  }

  get modalEvent() {
    return cy.get(this.#modal.event);
  }

  get modalTickets() {
    return cy.get(this.#modal.tickets);
  }

  get modalTicketIds() {
    return cy.get(this.#modal.ticketIds);
  }

  get modalConfirmButton() {
    return cy.get(this.#modal.confirmButton);
  }

  get modalCancelButton() {
    return cy.get(this.#modal.cancelButton);
  }

  get modalCloseButton() {
    return cy.get(this.#modal.closeButton);
  }

  get fullNameErrorMessage() {
    return cy.get(this.#errorMessage.fullName);
  }

  get emailErrorMessage() {
    return cy.get(this.#errorMessage.email);
  }

  get phoneErrorMessage() {
    return cy.get(this.#errorMessage.phone);
  }

  get ticketsErrorMessage() {
    return cy.get(this.#errorMessage.tickets);
  }

  fillForm() {
    this.fullNameInput.type(this.#personalInfo.fullName);
    this.emailInput.type(this.#personalInfo.email);
    this.phoneInput.type(this.#personalInfo.phone);
    this.selectDropdown.click();
    this.dropDownValue(this.#personalInfo.event).click();
    this.ticketsInput.clear().type(this.#personalInfo.numberOfTickets);
  }

  fillAndSubmitForm() {
    this.fillForm();
    this.submitButton.click();
  }

  fillFormWithValidation() {
    const verifySubmitDisabled = () => this.submitButton.should("be.disabled");

    const clearFillAndVerify = (getInput, value) => {
      getInput().clear();
      verifySubmitDisabled();
      getInput().type(value);
    };

    this.fillForm();

    this.selectDropdown.click();
    this.dropDownValue(this.#DEFAULT_SELECT_OPTION).click();
    verifySubmitDisabled();
    this.dropDownValue(this.#personalInfo.event).click();

    clearFillAndVerify(() => this.fullNameInput, this.#personalInfo.fullName);
    clearFillAndVerify(() => this.emailInput, this.#personalInfo.email);
    clearFillAndVerify(() => this.phoneInput, this.#personalInfo.phone);
    clearFillAndVerify(
      () => this.ticketsInput,
      this.#personalInfo.numberOfTickets
    );
  }

  verifyFormSubmission() {
    this.modal.should("be.visible");
    this.modalTitle.should("have.text", "Confirm Registration");
    this.modalFullName.should("have.text", this.#personalInfo.fullName);
    this.modalEmail.should("have.text", this.#personalInfo.email);
    this.modalPhone.should("have.text", this.#personalInfo.phone);
    this.modalEvent.should("have.text", this.#personalInfo.event);
    this.modalTickets.should("have.text", this.#personalInfo.numberOfTickets);
    this.verifyUniqueTicketIds(
      parseInt(this.#personalInfo.numberOfTickets, 10)
    );
    this.modalConfirmButton.click();
  }

  emptyForm() {
    this.fullNameInput.clear();
    this.emailInput.clear();
    this.phoneInput.clear();
    this.selectDropdown.click();
    this.dropDownValue(this.#DEFAULT_SELECT_OPTION).click();
    this.ticketsInput.clear();
  }

  verifyFormErrorMessages() {
    this.fullNameErrorMessage.should(
      "have.text",
      this.#ERROR_MESSAGES.fullName
    );
    this.emailErrorMessage.should("have.text", this.#ERROR_MESSAGES.email);
    this.phoneErrorMessage.should("have.text", this.#ERROR_MESSAGES.phone);
    this.ticketsErrorMessage.should("have.text", this.#ERROR_MESSAGES.tickets);
    this.submitButton.should("be.disabled");
  }

  verifyPhoneErrorMessage() {
    this.phoneInput.clear().type("12345");
    this.phoneErrorMessage
      .should("be.visible")
      .and("have.text", this.#ERROR_MESSAGES.phone);
  }

  verifyTicketsErrorMessage() {
    this.ticketsInput.clear().type("0");
    this.emailInput.click(); // Trigger validation
    this.ticketsErrorMessage
      .should("be.visible")
      .and("have.text", this.#ERROR_MESSAGES.tickets);
    this.submitButton.should("be.disabled");
  }

  verifyFormReset() {
    this.fullNameInput.should("have.value", "");
    this.emailInput.should("have.value", "");
    this.phoneInput.should("have.value", "");
    this.selectDropdown.click();
    this.dropDownValue(this.#DEFAULT_SELECT_OPTION).should(
      "have.attr",
      "aria-selected",
      "true"
    );
    this.ticketsInput.should("have.value", "1");
    this.submitButton.should("be.disabled");
  }

  verifyUniqueTicketIds(expectedCount) {
    this.modalTicketIds.children().then(($tickets) => {
      const ticketIds = new Set();
      $tickets.each((_, ticket) => {
        expect(ticket.innerText).to.match(this.#TICKET_ID_PATTERN);
        ticketIds.add(ticket.innerText);
      });
      expect(ticketIds.size).to.equal(parseInt(expectedCount, 10));
    });
  }
}

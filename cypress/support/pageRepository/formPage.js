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

  visit() {
    cy.visit(this.#url);
  }

  getFullNameInput() {
    return cy.get(this.#fullNameInput);
  }

  getEmailInput() {
    return cy.get(this.#emailInput);
  }

  getPhoneInput() {
    return cy.get(this.#phoneInput);
  }

  getSelectDropdown() {
    return cy.get(this.#selectDropdown);
  }

  getTicketsInput() {
    return cy.get(this.#ticketsInput);
  }

  getSubmitButton() {
    return cy.get(this.#submitButton);
  }

  getResetButton() {
    return cy.get(this.#resetButton);
  }

  getDropDownValue(value) {
    return cy.get(this.#dropdown).contains(value);
  }

  getModal() {
    return cy.get(this.#modal.container);
  }

  getModalTitle() {
    return cy.get(this.#modal.title);
  }

  getModalFullName() {
    return cy.get(this.#modal.fullName);
  }

  getModalEmail() {
    return cy.get(this.#modal.email);
  }

  getModalPhone() {
    return cy.get(this.#modal.phone);
  }

  getModalEvent() {
    return cy.get(this.#modal.event);
  }

  getModalTickets() {
    return cy.get(this.#modal.tickets);
  }

  getModalTicketIds() {
    return cy.get(this.#modal.ticketIds);
  }

  getModalConfirmButton() {
    return cy.get(this.#modal.confirmButton);
  }

  getModalCancelButton() {
    return cy.get(this.#modal.cancelButton);
  }

  getModalCloseButton() {
    return cy.get(this.#modal.closeButton);
  }

  getFullNameErrorMessage() {
    return cy.get(this.#errorMessage.fullName);
  }

  getEmailErrorMessage() {
    return cy.get(this.#errorMessage.email);
  }

  getPhoneErrorMessage() {
    return cy.get(this.#errorMessage.phone);
  }

  getTicketsErrorMessage() {
    return cy.get(this.#errorMessage.tickets);
  }
}

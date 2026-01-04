import { FormPage } from "./pageRepository/formPage.js";
const formPage = new FormPage();

const TICKET_ID_PATTERN = /EVT102-\d+-\d+/;
const DEFAULT_SELECT_OPTION = "-- Select --";

const ERROR_MESSAGES = {
  fullName: "Enter at least 3 characters",
  email: "Enter a valid email address",
  phone: "Enter a valid phone (7-15 digits)",
  tickets: "Enter an integer between 1 and 10",
};

const personalInfo = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+919876543210",
  event: "Automation Summit",
  numberOfTickets: "2",
};

Cypress.Commands.add("fillForm", () => {
  formPage.getFullNameInput().type(personalInfo.fullName);
  formPage.getEmailInput().type(personalInfo.email);
  formPage.getPhoneInput().type(personalInfo.phone);
  formPage.getSelectDropdown().click();
  formPage.getDropDownValue(personalInfo.event).click();
  formPage.getTicketsInput().clear().type(personalInfo.numberOfTickets);
});

Cypress.Commands.add("fillAndSubmitForm", () => {
  cy.fillForm();
  formPage.getSubmitButton().click();
});

Cypress.Commands.add("fillFormWithValidation", () => {
  const verifySubmitDisabled = () =>
    formPage.getSubmitButton().should("be.disabled");

  const clearFillAndVerify = (getInput, value) => {
    getInput().clear();
    verifySubmitDisabled();
    getInput().type(value);
  };

  cy.fillForm();

  formPage.getSelectDropdown().click();
  formPage.getDropDownValue("-- Select --").click();
  verifySubmitDisabled();
  formPage.getDropDownValue(personalInfo.event).click();

  clearFillAndVerify(() => formPage.getFullNameInput(), personalInfo.fullName);
  clearFillAndVerify(() => formPage.getEmailInput(), personalInfo.email);
  clearFillAndVerify(() => formPage.getPhoneInput(), personalInfo.phone);
  clearFillAndVerify(
    () => formPage.getTicketsInput(),
    personalInfo.numberOfTickets
  );
});

Cypress.Commands.add("verifyFormSubmission", () => {
  formPage.getModal().should("be.visible");
  formPage.getModalTitle().should("have.text", "Confirm Registration");
  formPage.getModalFullName().should("have.text", personalInfo.fullName);
  formPage.getModalEmail().should("have.text", personalInfo.email);
  formPage.getModalPhone().should("have.text", personalInfo.phone);
  formPage.getModalEvent().should("have.text", personalInfo.event);
  formPage.getModalTickets().should("have.text", personalInfo.numberOfTickets);
  cy.verifyUniqueTicketIds(parseInt(personalInfo.numberOfTickets, 10));
  formPage.getModalConfirmButton().click();
});

Cypress.Commands.add("emptyForm", () => {
  formPage.getFullNameInput().clear();
  formPage.getEmailInput().clear();
  formPage.getPhoneInput().clear();
  formPage.getSelectDropdown().click();
  formPage.getDropDownValue("-- Select --").click();
  formPage.getTicketsInput().clear();
});

Cypress.Commands.add("verifyFormErrorMessages", () => {
  formPage
    .getFullNameErrorMessage()
    .should("have.text", "Enter at least 3 characters");
  formPage
    .getEmailErrorMessage()
    .should("have.text", "Enter a valid email address");
  formPage
    .getPhoneErrorMessage()
    .should("have.text", "Enter a valid phone (7-15 digits)");
  formPage
    .getTicketsErrorMessage()
    .should("have.text", "Enter an integer between 1 and 10");
  formPage.getSubmitButton().should("be.disabled");
});

Cypress.Commands.add("verifyPhoneErrorMessage", () => {
  formPage.getPhoneInput().clear().type("12345");
  formPage
    .getPhoneErrorMessage()
    .should("be.visible")
    .and("have.text", "Enter a valid phone (7-15 digits)");
});

Cypress.Commands.add("verifyTicketsErrorMessage", () => {
  formPage.getTicketsInput().clear().type("0");
  formPage.getEmailInput().click(); // Trigger validation
  formPage
    .getTicketsErrorMessage()
    .should("be.visible")
    .and("have.text", "Enter an integer between 1 and 10");
  formPage.getSubmitButton().should("be.disabled");
});

Cypress.Commands.add("verifyFormReset", () => {
  formPage.getFullNameInput().should("have.value", "");
  formPage.getEmailInput().should("have.value", "");
  formPage.getPhoneInput().should("have.value", "");
  formPage.getSelectDropdown().click();
  formPage
    .getDropDownValue("-- Select --")
    .should("have.attr", "aria-selected", "true");
  formPage.getTicketsInput().should("have.value", "1");
  formPage.getSubmitButton().should("be.disabled");
});

Cypress.Commands.add("verifyUniqueTicketIds", (expectedCount) => {
  formPage
    .getModalTicketIds()
    .children()
    .then(($tickets) => {
      const ticketIds = new Set();
      $tickets.each((_, ticket) => {
        expect(ticket.innerText).to.match(TICKET_ID_PATTERN);
        ticketIds.add(ticket.innerText);
      });
      expect(ticketIds.size).to.equal(parseInt(expectedCount, 10));
    });
});

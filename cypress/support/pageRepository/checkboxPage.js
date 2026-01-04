export class CheckboxPage {
  #url = "/checkbox#try-it-yourself";
  #preferencesButton = ".flex > .MuiButtonBase-root";
  #checkbox = 'input[type="checkbox"]';
  #checkboxContainer = (label) =>
    `.MuiDialogContent-root > .flex > :contains("${label}") ${this.#checkbox}`;

  #doneButton = ".MuiDialogActions-root > .MuiButtonBase-root";
  #cardRoot = ".max-w-3xl > > .MuiCardContent-root";
  #cardTitle = ".MuiTypography-h6";
  #cardCaption = ".MuiTypography-caption";

  visit() {
    cy.visit(this.#url);
  }

  getPreferencesButton() {
    return cy.get(this.#preferencesButton);
  }

  getCheckboxes() {
    return cy.get(this.#checkbox);
  }

  getCheckboxByLabel(label) {
    return cy.get(this.#checkboxContainer(label));
  }

  getDoneButton() {
    return cy.get(this.#doneButton);
  }

  getCardRoot() {
    return cy.get(this.#cardRoot);
  }

  getCardByLabel(label) {
    return this.getCardRoot().contains(label).parents(this.#cardRoot);
  }

  getCardTitle() {
    return cy.get(this.#cardTitle);
  }

  getCardCaption() {
    return cy.get(this.#cardCaption);
  }
}

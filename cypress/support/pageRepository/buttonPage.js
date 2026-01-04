export class ButtonPage {
  #url = "/button#try-it-yourself";
  #card = ".MuiPaper-root";
  #tooltip = ".MuiTooltip-tooltip";

  visit() {
    cy.visit(this.#url);
  }

  getCardElement(cardName) {
    return cy.contains(this.#card, cardName);
  }

  getCardButton(cardName, state) {
    return cy.contains(this.#card, cardName).find(`[aria-label="${state}"]`);
  }

  getRemoveButton(cardName) {
    return this.getCardButton(cardName, "Remove");
  }

  getTooltip() {
    return cy.get(this.#tooltip);
  }
}

export class ButtonPage {
  #url = "/button#try-it-yourself";
  #card = ".MuiPaper-root";
  #tooltip = ".MuiTooltip-tooltip";

  // Button states
  #processingText = "Processing..";
  #followState = "Follow";
  #followingState = "Following";
  #unfollowState = "Unfollow";
  #removeState = "Remove";

  #doneIconClass = "done-icon";

  visit() {
    cy.visit(this.#url);
  }

  cardElement(cardName) {
    return cy.contains(this.#card, cardName);
  }

  cardButton(cardName, state) {
    return this.cardElement(cardName).find(`[aria-label="${state}"]`);
  }

  removeButton(cardName) {
    return this.cardButton(cardName, this.#removeState);
  }

  get tooltip() {
    return cy.get(this.#tooltip);
  }

  get followState() {
    return this.#followState;
  }
  get followingState() {
    return this.#followingState;
  }
  get unfollowState() {
    return this.#unfollowState;
  }
  get removeState() {
    return this.#removeState;
  }

  clickButtonAndVerifyState(cardName, labelBefore, labelAfter) {
    this.verifyButtonStateChange(cardName, labelBefore, this.#processingText);
    this.verifyButtonStateChange(cardName, labelBefore, labelAfter);
  }

  verifyTooltipAndClick(cardName, tooltipBefore, tooltipAfter) {
    const button = this.cardButton(cardName, tooltipBefore);

    button.trigger("mouseover");
    this.tooltip.should("have.text", tooltipBefore);

    button.click();
    this.tooltip.should("have.text", tooltipAfter);
  }

  verifyButtonStateChange(cardName, labelBefore, labelAfter) {
    this.cardButton(cardName, labelBefore)
      .click()
      .find("button")
      .should("contain.text", this.#processingText)
      .and("be.disabled");

    this.cardElement(cardName).should("contain.text", labelAfter);

    if (labelAfter === this.#followingState) {
      this.cardElement(cardName)
        .find("svg")
        .should("have.class", this.#doneIconClass);
    }
  }
}

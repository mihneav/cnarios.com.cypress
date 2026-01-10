export class ButtonPage {
  #url = "/button#try-it-yourself";
  #card = ".MuiPaper-root";
  #tooltip = ".MuiTooltip-tooltip";
  #buttonSelector = (state) => `[aria-label="${state}"]`;
  #doneIconClass = "done-icon";
  // Button states
  #processingText = "Processing..";
  #followState = "Follow";
  #followingState = "Following";
  #unfollowState = "Unfollow";
  #removeState = "Remove";
  #cardName;

  set cardName(name) {
    this.#cardName = name;
  }

  get cardName() {
    return this.#cardName;
  }

  visit() {
    cy.visit(this.#url);
  }

  cardElement(cardName) {
    return cy.contains(this.#card, cardName);
  }

  cardButton(cardName, state) {
    return this.cardElement(cardName).find(this.#buttonSelector(state));
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

  get processingText() {
    return this.#processingText;
  }

  clickButtonAndVerifyState(labelBefore, labelAfter) {
    this.cardButton(this.cardName, labelBefore).click();
    // Wait for processing state
    this.cardButton(this.cardName, labelBefore)
      .find("button")
      .should("contain.text", this.processingText)
      .and("be.disabled");
    // Then verify final state
    this.cardElement(this.cardName).should("contain.text", labelAfter);
    if (labelAfter === this.#followingState) {
      this.cardElement(this.cardName)
        .find("svg")
        .should("have.class", this.#doneIconClass);
    }
  }

  verifyTooltipAndClick(tooltipBefore, tooltipAfter) {
    const button = this.cardButton(this.cardName, tooltipBefore);

    button.trigger("mouseover");
    this.tooltip.should("have.text", tooltipBefore);

    button.click();
    this.tooltip.should("have.text", tooltipAfter);
  }

  verifyButtonStateChange(labelBefore, labelAfter) {
    this.cardButton(this.cardName, labelBefore)
      .click()
      .find("button")
      .should("contain.text", this.processingText)
      .and("be.disabled");

    this.cardElement(this.cardName).should("contain.text", labelAfter);

    if (labelAfter === this.#followingState) {
      this.cardElement(this.cardName)
        .find("svg")
        .should("have.class", this.#doneIconClass);
    }
  }
}

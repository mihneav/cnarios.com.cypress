import { ButtonPage } from "./pageRepository/buttonPage.js";
const buttonPage = new ButtonPage();

Cypress.Commands.add(
  "clickButtonAndVerifyState",
  (cardName, labelBefore, labelAfter) => {
    cy.verifyButtonStateChange(cardName, labelBefore, "Processing..");
    cy.verifyButtonStateChange(cardName, labelBefore, labelAfter);
  }
);

Cypress.Commands.add(
  "verifyTooltipAndClick",
  (cardName, tooltipBefore, tooltipAfter) => {
    const button = buttonPage.getCardButton(cardName, tooltipBefore);

    button.trigger("mouseover");
    buttonPage.getTooltip().should("have.text", tooltipBefore);

    button.click();
    buttonPage.getTooltip().should("have.text", tooltipAfter);
  }
);

Cypress.Commands.add(
  "verifyButtonStateChange",
  (cardName, labelBefore, labelAfter) => {
    buttonPage
      .getCardButton(cardName, labelBefore)
      .click()
      .find("button")
      .should("contain.text", "Processing..")
      .and("be.disabled");
    buttonPage.getCardElement(cardName).should("contain.text", labelAfter);
    if (labelAfter === "Following") {
      buttonPage
        .getCardElement(cardName)
        .find("svg")
        .should("have.class", "done-icon");
    }
  }
);

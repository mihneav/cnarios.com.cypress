import { CheckboxPage } from "./pageRepository/checkboxPage.js";
const checkboxPage = new CheckboxPage();

Cypress.Commands.add("unselectCategories", () => {
  checkboxPage.getPreferencesButton().click();
  checkboxPage.getCheckboxes().each(($checkbox) => {
    if ($checkbox.is(":checked")) {
      cy.wrap($checkbox).click();
    }
  });
});

Cypress.Commands.add("selectCategories", (categories) => {
  cy.unselectCategories();
  // Check the desired categories
  categories.forEach((category) => {
    checkboxPage.getCheckboxByLabel(category).click();
  });
});

Cypress.Commands.add("verifyNewsCategories", (expectedCategories) => {
  // Verify only the expected categories are displayed (no other categories)
  if (!expectedCategories) {
    cy.contains(
      'No news to display. Select categories using "Set Preferences".'
    ).should("be.visible");
    checkboxPage.getCardRoot().should("not.exist");
    return;
  }

  checkboxPage.getCheckboxes().each(($checkbox) => {
    const label = $checkbox.siblings("label").text().trim();
    if (label && !expectedCategories.includes(label)) {
      cy.log(`Verified absence of category: ${label}`);
      expect(checkboxPage.getCardByLabel(label)).to.not.exist;
    }
  });

  // Verify expected categories are displayed
  expectedCategories.forEach((category) => {
    checkboxPage.getCardByLabel(category).each(($card) => {
      cy.wrap($card)
        .should("be.visible")
        .within(() => {
          checkboxPage.getCardTitle().should("exist");
          checkboxPage.getCardCaption().should("exist");
        });
    });
  });
});

Cypress.Commands.add("getCardTexts", () => {
  cy.wrap([]).as("cardTexts");
  return checkboxPage
    .getCardRoot()
    .each(($card) => {
      // For each card, get the title and caption
      cy.wrap($card).within(() => {
        checkboxPage
          .getCardTitle()
          .invoke("text")
          .then((title) => {
            checkboxPage
              .getCardCaption()
              .invoke("text")
              .then((caption) => {
                // Append to the array
                cy.get("@cardTexts").then((cardTexts) => {
                  cardTexts.push({
                    title: title.trim(),
                    caption: caption.trim(),
                  });
                  cy.wrap(cardTexts).as("cardTexts");
                });
              });
          });
      });
    })
    .then(() => cy.get("@cardTexts"));
});

Cypress.Commands.add("openAndClosePreferences", () => {
  checkboxPage.getPreferencesButton().click();
  checkboxPage.getDoneButton().click();
});

Cypress.Commands.add("verifyNewsItemsConsistency", () => {
  cy.getCardTexts().then((initialCardTexts) => {
    cy.log("Initial Card Texts:", initialCardTexts);
    checkboxPage.getPreferencesButton().click();
    checkboxPage.getDoneButton().click();
    cy.getCardTexts().then((afterCardTexts) => {
      cy.log("After Card Texts:", afterCardTexts);
      expect(afterCardTexts).to.deep.equal(initialCardTexts);
    });
  });
});

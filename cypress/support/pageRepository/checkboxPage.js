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

  get preferencesButton() {
    return cy.get(this.#preferencesButton);
  }

  get checkboxes() {
    return cy.get(this.#checkbox);
  }

  checkboxByLabel(label) {
    return cy.get(this.#checkboxContainer(label));
  }

  get doneButton() {
    return cy.get(this.#doneButton);
  }

  get cardRoot() {
    return cy.get(this.#cardRoot);
  }

  cardByLabel(label) {
    return this.cardRoot.contains(label).parents(this.#cardRoot);
  }

  get cardTitle() {
    return cy.get(this.#cardTitle);
  }

  get cardCaption() {
    return cy.get(this.#cardCaption);
  }

  unselectCategories() {
    this.preferencesButton.click();
    this.checkboxes.each(($checkbox) => {
      if ($checkbox.is(":checked")) {
        cy.wrap($checkbox).click();
      }
    });
  }

  selectCategories(categories) {
    this.unselectCategories();
    // Check the desired categories
    categories.forEach((category) => {
      this.checkboxByLabel(category).click();
    });
  }

  verifyNewsCategories(expectedCategories) {
    // Verify only the expected categories are displayed (no other categories)
    if (!expectedCategories) {
      cy.contains(
        'No news to display. Select categories using "Set Preferences".'
      ).should("be.visible");
      this.cardRoot.should("not.exist");
      return;
    }

    this.checkboxes.each(($checkbox) => {
      const label = $checkbox.siblings("label").text().trim();
      if (label && !expectedCategories.includes(label)) {
        cy.log(`Verified absence of category: ${label}`);
        expect(this.cardByLabel(label)).to.not.exist;
      }
    });

    // Verify expected categories are displayed
    expectedCategories.forEach((category) => {
      this.cardByLabel(category).each(($card) => {
        cy.wrap($card)
          .should("be.visible")
          .within(() => {
            this.cardTitle.should("exist");
            this.cardCaption.should("exist");
          });
      });
    });
  }

  getCardTexts() {
    cy.wrap([]).as("cardTexts");
    return this.cardRoot
      .each(($card) => {
        // For each card, get the title and caption
        cy.wrap($card).within(() => {
          this.cardTitle.invoke("text").then((title) => {
            this.cardCaption.invoke("text").then((caption) => {
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
  }

  openAndClosePreferences() {
    this.preferencesButton.click();
    this.doneButton.click();
  }

  verifyNewsItemsConsistency() {
    this.getCardTexts().then((initialCardTexts) => {
      cy.log("Initial Card Texts:", initialCardTexts);
      this.preferencesButton.click();
      this.doneButton.click();
      this.getCardTexts().then((afterCardTexts) => {
        cy.log("After Card Texts:", afterCardTexts);
        expect(afterCardTexts).to.deep.equal(initialCardTexts);
      });
    });
  }
}

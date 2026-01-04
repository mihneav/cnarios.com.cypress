import { CheckboxPage } from "../support/pageRepository/checkboxPage.js";

describe("Form Page Tests", () => {
  const checkboxPage = new CheckboxPage();

  beforeEach(() => {
    checkboxPage.visit();
  });

  /**
   * Navigate to the news feed page
   * Click 'Set Preferences'
   * Check 'Technology' and 'Health'
   * Click 'Done'
   * Verify only Technology and Health news are displayed
   */
  it(
    `Only news from the selected categories should appear`,
    { tags: ["@positive", "@high"] },
    () => {
      cy.selectCategories(["Technology", "Health"]);
      checkboxPage.getDoneButton().click();
      cy.verifyNewsCategories(["Technology", "Health"]);
    }
  );

  /**
   * Navigate to the news feed page
   * Click 'Set Preferences'
   * Check 'Technology' and 'Health'
   * Click 'Done'
   * Verify only Technology and Health news are displayed
   */
  it(
    `A message indicating no news should be displayed`,
    { tags: ["@negative", "@medium"] },
    () => {
      cy.unselectCategories();
      checkboxPage.getDoneButton().click();
      cy.verifyNewsCategories();
    }
  );

  /**
   * Navigate to the news feed page
   * Click 'Set Preferences'
   * Check 'Technology' and 'Health'
   * Click 'Done'
   * Verify only Technology and Health news are displayed
   */
  it(
    `News items before and after dialog open should match`,
    { tags: ["@positive", "@low"] },
    () => {
      cy.verifyNewsItemsConsistency();
    }
  );
});

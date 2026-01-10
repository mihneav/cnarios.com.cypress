import { CheckboxPage } from "../support/pageRepository/checkboxPage.js";

describe("Checkbox Page Tests", () => {
  const checkboxPage = new CheckboxPage();
  let testData = [];

  before(() => {
    cy.fixture("checkboxTestData").then((data) => {
      testData = data;
    });
  });

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
      const categories = testData.categories;
      checkboxPage.selectCategories(categories);
      checkboxPage.doneButton.click();
      checkboxPage.verifyNewsCategories(categories);
    }
  );
  /**
   * Click 'Set Preferences'
   * Uncheck all categories
   * Click 'Done'
   * Verify that no news cards are shown
   * Verify that a friendly message is displayed
   */
  it(
    `A message indicating no news should be displayed`,
    { tags: ["@negative", "@medium"] },
    () => {
      checkboxPage.unselectCategories();
      checkboxPage.doneButton.click();
      checkboxPage.verifyNewsCategories();
    }
  );

  /**
   * Note current news items
   * Click 'Set Preferences'
   * Close the dialog without making changes
   * Verify that news items remain the same
   */
  it(
    `News items before and after dialog open should match`,
    { tags: ["@positive", "@low"] },
    () => {
      checkboxPage.verifyNewsItemsConsistency();
    }
  );
});

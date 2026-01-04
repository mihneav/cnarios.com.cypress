import { ButtonPage } from "../support/pageRepository/buttonPage.js";

describe("Button Page Tests", () => {
  const buttonPage = new ButtonPage();
  const cardName = "Anjali Sharma";
  beforeEach(() => {
    buttonPage.visit();
  });

  /**
   * Navigate to the Suggestions section
   * Identify a card with Follow button enabled
   * Click the Follow button
   * Verify button changes to 'Following'
   * Verify icon changes to check mark
   */
  it(
    `Button text and icon should change to 'Following' with a check icon`,
    { tags: ["@positive", "@high"] },
    () => {
      cy.verifyButtonStateChange(cardName, "Follow", "Following");
    }
  );

  /**
   * Navigate to the Suggestions section
   * Hover over the Follow or Following button
   * Verify tooltip text matches the button state
   */
  it(
    `Tooltip should display 'Click to follow' or 'Click to unfollow' based on state`,
    { tags: ["@positive", "@medium"] },
    () => {
      cy.verifyTooltipAndClick(cardName, "Follow", "Unfollow");
      cy.verifyTooltipAndClick(cardName, "Unfollow", "Follow");
    }
  );

  /**
   * Click the Follow button
   * Observe the 'Processing..' displayed in the button
   * Wait for 5 second
   * Verify button state changes to 'Following'
   */
  it(
    `'Processing..' should appear before state changes and the button should be disabled`,
    { tags: ["@positive", "@medium"] },
    () => {
      cy.clickButtonAndVerifyState(cardName, "Follow", "Following");
    }
  );

  /**
   * Click Follow button
   * Wait for it to change to Following
   * Click Following button
   * Verify button reverts to Follow
   */
  it(`Click Unfollow (toggle back)`, { tags: ["@positive", "@medium"] }, () => {
    cy.clickButtonAndVerifyState(cardName, "Follow", "Following");
    cy.clickButtonAndVerifyState(cardName, "Unfollow", "Follow");
  });

  /**
   * Navigate to the home page
   * Locate a suggestion card under 'Suggestions for you'
   * Click on the 'Remove' (X) icon of that suggestion card
   * Verify that the suggestion card disappears from the list
   * Ensure other cards remain unaffected
   */
  it(
    "The selected suggestion card should be removed from the visible list",
    { tags: ["@positive", "@medium"] },
    () => {
      buttonPage.getRemoveButton(cardName).click();
      buttonPage.getCardElement(cardName).should("not.exist");
    }
  );
});

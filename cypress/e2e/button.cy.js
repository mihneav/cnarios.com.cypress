import { ButtonPage } from "../support/pageRepository/buttonPage.js";

describe("Button Page Tests", () => {
  const buttonPage = new ButtonPage();

  before(() => {
    cy.fixture("buttonTestData").then((data) => {
      buttonPage.cardName = data.cardName;
    });
  });

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
      buttonPage.verifyButtonStateChange(
        buttonPage.followState,
        buttonPage.followingState
      );
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
      buttonPage.verifyTooltipAndClick(
        buttonPage.followState,
        buttonPage.unfollowState
      );
      buttonPage.verifyTooltipAndClick(
        buttonPage.unfollowState,
        buttonPage.followState
      );
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
      buttonPage.clickButtonAndVerifyState(
        buttonPage.followState,
        buttonPage.followingState
      );
    }
  );

  /**
   * Click Follow button
   * Wait for it to change to Following
   * Click Following button
   * Verify button reverts to Follow
   */
  it(`Click Unfollow (toggle back)`, { tags: ["@positive", "@medium"] }, () => {
    buttonPage.clickButtonAndVerifyState(
      buttonPage.followState,
      buttonPage.followingState
    );
    buttonPage.clickButtonAndVerifyState(
      buttonPage.unfollowState,
      buttonPage.followState
    );
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
      buttonPage.removeButton(buttonPage.cardName).click();
      buttonPage.cardElement(buttonPage.cardName).should("not.exist");
    }
  );
});

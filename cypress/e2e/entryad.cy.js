import { EntryadPage } from "../support/pageRepository/entryadPage.js";

describe("Entry Ad Page Tests", () => {
  const entryadPage = new EntryadPage();

  beforeEach(() => {
    entryadPage.visit();
  });

  /**
   * Launch the movie streaming site for the first time
   * Wait for the specified delay (e.g., 1.5 seconds)
   * Verify that the Entry Ad modal appears
   * Check that title, description, and CTA button are visible
   */
  it(
    `The Entry Ad popup should be displayed with title, description, and action buttons.`,
    { tags: ["@positive", "@high"] },
    () => {
      entryadPage.checkAdDialog();
    }
  );

  /**
   * Open the site and wait for the Entry Ad popup to appear
   * Select the 'Don't show again today' checkbox
   * Click on the Close button
   * Reload the page
   * Verify that the popup does not appear again
   */
  it(
    `Popup should close and not reappear on subsequent page reloads for new session`,
    { tags: ["@positive", "@high"] },
    () => {
      entryadPage.verifyDontShowAgainCheckbox();
    }
  );

  /**
   * Wait for the Entry Ad popup to appear
   * Click on the 'Start Free Trial' button
   * Verify the popup closes
   * Check that the appropriate redirection or success message is triggered
   */
  it(
    `The user should be redirected to the signup or trial flow, and the popup should close.`,
    { tags: ["@positive", "@medium"] },
    () => {
      entryadPage.startFreeTrialAndVerifySuccessMessage();
      entryadPage.checkAdDialog({ visible: false });
    }
  );

  /**
   * Open the site and wait for the Entry Ad popup
   * Click the Close button without checking the 'Don't show again today' option
   * Navigate to another page or reload the same page
   * Verify that the Entry Ad popup does not reappear in the same session 
   * 
   * //should be shown due to the fact that checkbox is not checked
   */
  it(
    `Popup should close without 'Don't show again today' checked and reappear on page reload in the same session`,
    { tags: ["@positive", "@medium"] },
    () => {
      entryadPage.closeDialog();
      entryadPage.checkAdDialog({ visible: false });
      cy.reload();
      entryadPage.checkAdDialog({ visible: true });
    }
  );
});

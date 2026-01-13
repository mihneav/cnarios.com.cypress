export class EntryadPage {
  #url = "/entryad#try-it-yourself";
  #dialog = ".MuiDialog-container";
  #dialogTitle = ".MuiDialogTitle-root";
  #dialogDescription = ".MuiDialogContent-root";
  #ctaButton = ".MuiButton-contained";
  #dontShowAgainCheckbox = "#dontshow-streamflix_promo_v1";
  #closeButton = ".MuiButton-outlined";
  #FREE_TRIAL_SUCCESS_MESSAGE = "Your free trail is activated now..";

  visit() {
    cy.visit(this.#url);
  }

  get dialog() {
    return cy.get(this.#dialog);
  }

  get dialogTitle() {
    return this.dialog.find(this.#dialogTitle);
  }

  get dialogDescription() {
    return this.dialog.find(this.#dialogDescription);
  }

  get ctaButton() {
    return this.dialog.find(this.#ctaButton);
  }

  get dontShowAgainCheckbox() {
    return this.dialog.find(this.#dontShowAgainCheckbox);
  }

  get closeButton() {
    return this.dialog.find(this.#closeButton);
  }

  closeDialog() {
    this.closeButton.click();
  }

  checkAdDialog(state = { visible: true }) {
    if (state.visible === true) {
      this.dialog.should("be.visible");
      this.dialogTitle.should("be.visible");
      this.dialogDescription.should("be.visible");
      this.ctaButton.should("be.visible");
      this.dontShowAgainCheckbox.should("be.visible");
      this.closeButton.should("be.visible");
    }

    if (state.visible === false) {
      this.dialog.should("not.exist", { timeout: 5000 });
    }
  }

  verifyDontShowAgainCheckbox() {
    // Initial load - verify dialog appears
    this.checkAdDialog({ visible: true });
    cy.reload();
    // Verify dialog appears again on reload
    this.checkAdDialog({ visible: true });
    // Check 'Don't show again' and close dialog
    this.dontShowAgainCheckbox.check().should("be.checked");
    this.closeDialog();
    // Verify dialog does not appear on reload
    cy.reload();
    this.checkAdDialog({ visible: false });
    // Clear session storage and verify dialog appears again
    cy.clearAllSessionStorage();
    cy.reload();
    this.checkAdDialog({ visible: true });
  }

  startFreeTrial() {
    this.ctaButton.click();
  }

  verifyRedirectionToSignup() {
    cy.url().should("include", "/signup");
  }

  startFreeTrialAndVerifySuccessMessage() {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
    this.startFreeTrial();
    cy.get("@alertStub").should(
      "have.been.calledWith",
      this.#FREE_TRIAL_SUCCESS_MESSAGE
    );
  }
}

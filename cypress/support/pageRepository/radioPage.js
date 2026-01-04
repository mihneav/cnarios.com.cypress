export class RadioPage {
  #url = "/radio#try-it-yourself";
  #tryAgainButton = ".text-center > .MuiButtonBase-root";
  #passOrFailMessage = ".MuiTypography-h5";
  #scoreMessage = ".text-center > .MuiTypography-h6";

  #getQuestionCardSelector(questionNumber) {
    return `:nth-child(${questionNumber}) > .MuiCardContent-root > `;
  }

  #getRadioSelector(questionNumber, variant) {
    const questionCard = this.#getQuestionCardSelector(questionNumber);
    return `${questionCard}.MuiFormControl-root > .MuiFormGroup-root > :contains(${variant}) :radio`;
  }

  visit() {
    cy.visit(this.#url);
  }

  getQuestionCardByNumber(questionNumber) {
    return cy.get(this.#getQuestionCardSelector(questionNumber));
  }

  getQuestionOption(questionNumber, variant) {
    return cy.get(this.#getRadioSelector(questionNumber, variant));
  }

  getScore() {
    return cy.get(this.#scoreMessage);
  }

  getPassOrFailMessage() {
    return cy.get(this.#passOrFailMessage);
  }

  getTryAgainButton() {
    return cy.get(this.#tryAgainButton);
  }
}

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

  questionCardByNumber(questionNumber) {
    return cy.get(this.#getQuestionCardSelector(questionNumber));
  }

  questionOption(questionNumber, variant) {
    return cy.get(this.#getRadioSelector(questionNumber, variant));
  }

  get score() {
    return cy.get(this.#scoreMessage);
  }

  get passOrFailMessage() {
    return cy.get(this.#passOrFailMessage);
  }

  get tryAgainButton() {
    return cy.get(this.#tryAgainButton);
  }

  answerQuestion(questionNumber, variant) {
    this.questionOption(questionNumber, variant).click();
  }

  fillFormQuestions(answers = null) {
    if (!answers) return;
    answers.forEach((answer, index) => {
      this.answerQuestion(index + 1, answer);
    });
  }

  retryQuiz(answers) {
    this.tryAgainButton.click();
    this.submitQuiz(answers);
  }

  submitQuiz(answers) {
    this.fillFormQuestions(answers);
    cy.get("button").contains("Submit").click();
  }

  verifyQuizResult(score, message) {
    this.score.should("have.text", `Your Score: ${score} / 4`);
    this.passOrFailMessage.should("have.text", message);
  }
}

import { RadioPage } from "./pageRepository/radioPage.js";
const radioPage = new RadioPage();

Cypress.Commands.add("answerQuestion", (questionNumber, variant) => {
  radioPage.getQuestionOption(questionNumber, variant).click();
});

Cypress.Commands.add("fillFormQuestions", (answers = null) => {
  if (!answers) return;
  answers.forEach((answer, index) => {
    cy.answerQuestion(index + 1, answer);
  });
});

Cypress.Commands.add("retryQuiz", (answers) => {
  radioPage.getTryAgainButton().click();
  cy.submitQuiz(answers);
});

Cypress.Commands.add("submitQuiz", (answers) => {
  cy.fillFormQuestions(answers);
  cy.get("button").contains("Submit").click();
});

Cypress.Commands.add("verifyQuizResult", (score, message) => {
  radioPage.getScore().should("have.text", `Your Score: ${score} / 4`);
  radioPage.getPassOrFailMessage().should("have.text", message);
});

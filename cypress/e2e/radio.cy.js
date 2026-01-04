import { RadioPage } from "../support/pageRepository/radioPage.js";

describe("Form Page Tests", () => {
  const radioPage = new RadioPage();

  beforeEach(() => {
    radioPage.visit();
  });

  /**
   * Navigate to the quiz page
   * Select correct answers for all 4 questions
   * Click 'Submit'
   * Verify the score is 4
   * Verify 'Pass 🎉' is shown
   */
  it(
    `Score displays as full and result shows 'Pass 🎉'`,
    { tags: ["@positive", "@high"] },
    () => {
      cy.submitQuiz([
        "get(url)",
        "To locate a single web element",
        "ID",
        "To provide explicit wait until a condition is met",
      ]);
      cy.verifyQuizResult(4, "Pass 🎉");
    }
  );

  /**
   * Navigate to the quiz page
   * Select incorrect answers for all questions
   * Click 'Submit'
   * Verify the score is 0
   * Verify 'Fail ❌' is shown
   */
  it(
    `Score should be 0 and result should show 'Fail ❌'`,
    { tags: ["@negative", "@high"] },
    () => {
      cy.submitQuiz([
        "navigate().refresh()",
        "To close the browser",
        "XPath",
        "To refresh the browser",
      ]);
      cy.verifyQuizResult(0, "Fail ❌");
    }
  );

  /**
   * Navigate to the quiz page
   * Submit partial correct answers (3/4) and verify Pass
   * Click 'Try Again'
   * Submit different incorrect answers (2/4) and verify Fail
   */
  it(
    `Should allow retrying quiz and show updated score`,
    { tags: ["@positive", "@medium"] },
    () => {
      cy.submitQuiz([
        "get(url)",
        "To locate a single web element",
        "ID",
        "To refresh the browser",
      ]);
      cy.verifyQuizResult(3, "Pass 🎉");

      radioPage.getTryAgainButton().click();

      cy.submitQuiz([
        "get(url)",
        "To close the browser",
        "ID",
        "To refresh the browser",
      ]);
      cy.verifyQuizResult(2, "Fail ❌");
    }
  );

  /**
   * Navigate to quiz page
   * Click 'Submit' without selecting any options
   * Verify score is 0
   * Verify result shows 'Fail ❌'
   */
  it(
    `Score should be 0 and 'Fail ❌' should be shown`,
    { tags: ["@positive", "@medium"] },
    () => {
      cy.submitQuiz();
      cy.verifyQuizResult(0, "Fail ❌");
    }
  );
});

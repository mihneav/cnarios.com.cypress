import { RadioPage } from "../support/pageRepository/radioPage.js";

describe("Radio Button Page Tests", () => {
  const radioPage = new RadioPage();
  let testData;

  before(() => {
    cy.fixture("radioTestData").then((data) => {
      testData = data;
    });
  });

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
      radioPage.submitQuiz(testData.correctAnswers);
      radioPage.verifyQuizResult(
        radioPage.fullScore.score,
        radioPage.fullScore.message
      );
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
      radioPage.submitQuiz(testData.incorrectAnswers);
      radioPage.verifyQuizResult(
        radioPage.zeroScore.score,
        radioPage.zeroScore.message
      );
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
      radioPage.submitQuiz(testData.partialCorrectAnswers);
      radioPage.verifyQuizResult(
        radioPage.partialPass.score,
        radioPage.partialPass.message
      );

      radioPage.tryAgainButton.click();

      radioPage.submitQuiz(testData.partialIncorrectAnswers);
      radioPage.verifyQuizResult(
        radioPage.partialFail.score,
        radioPage.partialFail.message
      );
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
    { tags: ["@negative", "@medium"] },
    () => {
      radioPage.submitQuiz();
      radioPage.verifyQuizResult(
        radioPage.zeroScore.score,
        radioPage.zeroScore.message
      );
    }
  );
});

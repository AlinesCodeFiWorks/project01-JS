import { renderQuiz, startQuiz, evaluateAnswer } from "./quiz.js";
import { questionBank, fetchQuestions } from "../data/questions.js";

//troubleshooting console errors: making sure startQuiz() is only called after the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  startQuiz();
});

async function initializeQuiz() {
  const questions = await fetchQuestions(); // Fetches the questions properly
  if (questions.length > 0) {
    renderQuiz(questions); // Now passing actual question data
  } else {
    console.log("No questions available.");
  }
}

initializeQuiz(); // Call the function to start the quiz properly

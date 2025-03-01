import { renderQuiz, startQuiz, evaluateAnswer } from "./quiz.js";
import { fetchQuestions } from "../data/questions.js";
import { crud } from "./crud.js";

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

if (document.querySelector(".quizInterface")) {
  initializeQuiz(); // Run this only if the quiz page is loaded
}

if (document.querySelector(".newQuestionForm")) {
  crud; // Run this only if the crud page is loaded
}

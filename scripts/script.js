import { renderQuiz, startQuiz, evaluateAnswer } from "./quiz.js";
import { fetchQuestions } from "../data/questions.js";
import { crud } from "./crud.js";

//troubleshooting console errors: making sure startQuiz() is only called after the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for the start quiz button on landing page
  if (document.querySelector(".quizSelections")) {
    const startQuizBtn = document.getElementById("startQuizBtn");
    startQuizBtn.addEventListener("click", () => {
      // Get selected values from the form
      const category = document.getElementById("category").value;
      const difficulty = document.getElementById("difficulty").value;

      // Store the selected values in localStorage
      localStorage.setItem("category", category);
      localStorage.setItem("difficulty", difficulty);

      // Redirect to quiz.html page
      window.location.href = "quiz.html";
    });
  }
  // Check if we're on the quiz interface page or not
  if (document.querySelector(".quizInterface")) {
    initializeQuiz(); // Call initializeQuiz only if we're on quiz page
  } else {
    startQuiz(); // Call startQuiz on page load if needed (index.html)
  }
});

// Initialize the quiz by getting values from localStorage (for category and difficulty)
async function initializeQuiz() {
  const category = localStorage.getItem("category");
  const difficulty = localStorage.getItem("difficulty");
  console.log("Category:", category, "Difficulty:", difficulty);

  const amount = 5;
  const type = "multiple";

  // Fetch the questions using the values from the localStorage
  const questions = await fetchQuestions(amount, category, difficulty, type);
  console.log("Fetched questions:", questions);

  // Check if questions were returned and render the quiz
  if (questions.length > 0) {
    renderQuiz(questions); // Now passing actual question data to renderQuiz
  } else {
    console.log("No questions available.");
  }
  // clear localStorage after use (to prevent stale data)
  localStorage.removeItem("category");
  localStorage.removeItem("difficulty");
}

// Only run crud() if on the CRUD page
if (document.querySelector(".newQuestionForm")) {
  crud(); // Run this only if the crud page is loaded
}

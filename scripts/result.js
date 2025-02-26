import { questionBank } from "../data/questions.js";

document.addEventListener("DOMContentLoaded", () => {
  const finalScoreDisplay = document.querySelector(".finalScore"); //making the page loading as the trigger for this event
  const finalScore = localStorage.getItem("finalScore");
  finalScoreDisplay.innerHTML = `You got ${finalScore} out of ${questionBank.length} questions right!`;
});

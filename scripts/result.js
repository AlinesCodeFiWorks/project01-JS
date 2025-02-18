import { evaluateAnswer } from "./quiz.js";
function displayFinalScore(score) {
  const finalScoreDisplay = document.querySelector(".finalScore");
  finalScoreDisplay.innerHTML = currentScore;
  console.log(finalScore);
}
displayFinalScore(currentScore);

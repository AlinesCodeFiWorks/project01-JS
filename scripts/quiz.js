//TODO import random number generator from utils file
//Function to display questions from the question bank
export function renderQuiz(dataSet) {
  const quizInterface = document.querySelector(".quizInterface");
  quizInterface.innerHTML = ""; // clear previous question
  dataSet.forEach((question) => {
    quizInterface.innerHTML = `<h2>${question.question}</h2>
    <form id="${question.questionId}" class="optionsForm">
    <input type="radio" name="${question.questionId}" id="${question.questionId}a" value="a">
    <label for="${question.questionId}a">a. ${question.options.a}</label>
    <br>
    <input type="radio" name="${question.questionId}" id="${question.questionId}b" value="b">
    <label for="${question.questionId}b">b. ${question.options.b}</label>
    <br>
    <input type="radio" name="${question.questionId}" id="${question.questionId}c" value="c">
    <label for="${question.questionId}c">c. ${question.options.c}</label>
    <br>
    <input type="radio" name="${question.questionId}" id="${question.questionId}d" value="d">
    <label for="${question.questionId}d">d. ${question.options.d}</label>
    <br>
    <button type="button" class="submitAnswer" data-question-id="${question.questionId}">Submit</button>
    </form>
     <p class="feedback" id="feedback-${question.questionId}"></p>`;
  });
  document.querySelectorAll(".submitAnswer").forEach((submitButton) => {
    submitButton.addEventListener("click", (event) => {
      console.log(event);
      const questionId = event.target.dataset.questionId; // Get the question ID from button
      evaluateAnswer(questionId, dataSet);
    });
  });
}

//TODO Create a loop within the forEach so that only one question displays at a time

// TODO plug in a random number generator

//function to evaluate submission
export function evaluateAnswer(questionId, dataSet) {
  // Find the question object
  const question = dataSet.find((q) => q.questionId == questionId);
  if (!question) return;

  // Find the selected answer
  const selectedOption = document.querySelector(
    `input[name="${questionId}"]:checked`
    //Explanation: this part selects an <input> element with a name attribute that matches the value of questionId.
  );
  const feedbackDisplay = document.getElementById(`feedback-${questionId}`); // Target individual feedback

  if (!selectedOption) {
    feedbackDisplay.textContent = "Please select an answer!";
    return;
  }

  // Check if the answer is correct and displaying associated feedback
  if (selectedOption.value === question.answer) {
    feedbackDisplay.textContent = question.feedback.correct;
  } else {
    feedbackDisplay.textContent = question.feedback.incorrect;
  }
}

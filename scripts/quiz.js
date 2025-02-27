// Get category and difficulty from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "";
const difficulty = urlParams.get("difficulty") || "";

import { fetchQuestions } from "../data/questions.js";

let currentQuestion = 0; //variable to store currently displayed question
let currentScore = 0; //variable for score tracking
let questions = []; //empty array to hold combined questions

//function to load the quiz
export function renderQuiz(dataSet) {
  const quizInterface = document.querySelector(".quizInterface");

  quizInterface.innerHTML = ""; // clear previous question

  const question = dataSet[currentQuestion];

  // Combine answers (handling both API & user-submitted formats)
  let options = question.incorrect_answers
    ? [...question.incorrect_answers, question.correct_answer]
    : [...question.options];

  options = shuffleArray(options); // Shuffle so the correct answer isn't always last

  let optionsHtml = options
    .map(
      (option, index) => `
      <input type="radio" name="question${currentQuestion}" id="option${index}" value="${option}">
      <label for="option${index}">${option}</label><br>
    `
    )
    .join("");

  quizInterface.innerHTML = `<h2>${question.question}</h2>
    <form id="question${currentQuestion}" class="optionsForm">
      ${optionsHtml}
      <button type="button" class="submitAnswer" data-question-id="${currentQuestion}">Submit</button>
    </form>
    <p class="feedback" id="feedback-${currentQuestion}"></p>`;

  function shuffleArray(array) {
    return array
      .map((item) => ({ item, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map(({ item }) => item);
  }

  setTimeout(() => {
    document.querySelector(".submitAnswer").addEventListener("click", () => {
      evaluateAnswer(currentQuestion, dataSet);
    });
  }, 0);
}

// sourcing questions from API instead
export async function startQuiz() {
  try {
    questions = await fetchQuestions(5, category, difficulty); // Fetch API and user-submitted questions

    if (questions.length === 0) {
      console.error("No questions available.");
      return;
    }

    currentQuestion = 0;
    currentScore = 0;
  } catch (error) {
    console.error("Error starting the quiz:", error);
  }
  const quizForm = document.getElementById("quiz-settings");
  if (!quizForm) return; // Ensure the form exists before adding the event listener

  quizForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Redirect to quiz.html with query parameters
    window.location.href = `/quiz.html?category=${category}&difficulty=${difficulty}`;
  });
}
//function to evaluate submission
export function evaluateAnswer(questionIndex, dataSet) {
  const question = dataSet[questionIndex];
  // Find the selected answer
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestion}"]:checked`
    //Explanation: this part selects an <input> element with a name attribute that matches the value of questionId.
  );
  const feedbackDisplay = document.getElementById(`feedback-${questionIndex}`); // Target individual feedback

  if (!selectedOption) {
    feedbackDisplay.textContent = "Please select an answer!";
    return;
  }

  // integrate user-submitted question format
  const correctAnswer = question.correct_answer || question.correctAnswer;

  // Check if the answer is correct and displaying associated feedback
  if (selectedOption.value === correctAnswer) {
    feedbackDisplay.textContent = "That's correct!";
    currentScore++;
  } else {
    feedbackDisplay.textContent = `Not quite! The correct answer was: ${correctAnswer}`;
  }

  const scoreTracker = document.querySelector(".scoreTracker");
  scoreTracker.innerHTML = `<p>${currentScore} out of ${dataSet.length}</p>`;

  //
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("nextQuestion");
  nextButton.addEventListener("click", () => {
    if (currentQuestion < dataSet.length - 1) {
      currentQuestion++;
      renderQuiz(dataSet);
    } else {
      localStorage.setItem("finalScore", currentScore);
      window.location.href = "result.html"; // redirects user to result page once no questions are available. This is really neat!
    }
  });
  feedbackDisplay.after(nextButton); // Insert the button right after the feedback message.
}

// Get category and difficulty from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "";
const difficulty = urlParams.get("difficulty") || "easy";

import { fetchQuestions } from "../data/questions.js";

let currentQuestion = 0; //variable to store currently displayed question
let currentScore = 0; //variable for score tracking
let questions = []; //empty array to hold combined questions

//function to load the quiz
export function renderQuiz(dataSet) {
  const quizInterface = document.querySelector(".quizInterface");

  quizInterface.innerHTML = ""; // clear previous question

  const question = dataSet[currentQuestion];

  // Check if the question format is correct
  if (
    !question.question ||
    (!question.correct_answer && !question.correctAnswer)
  ) {
    console.error("Question format error:", question);
    return; // Prevents rendering a broken question
  }

  // Standardize the keys for correct_answer and incorrect_answers
  const correctAnswer = question.correct_answer || question.correctAnswer;
  const incorrectAnswers =
    question.incorrect_answers || question.incorrectAnswers || [];

  // Combine answers (handling both API & user-submitted formats)
  let options = [...incorrectAnswers, correctAnswer];
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
  // ensuring button exists before attaching an event listener
  setTimeout(() => {
    const submitButton = document.querySelector(".submitAnswer");
    if (submitButton) {
      // displaying buttom again when quiz is reloaded
      submitButton.classList.remove("disabled");
      submitButton.addEventListener("click", () => {
        evaluateAnswer(currentQuestion, dataSet);
      });
    }
  }, 0);
}

// Handle API rate limiting and fetching
async function fetchQuestionsWithRetry(amount, category, difficulty) {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

  for (let i = 0; i < 3; i++) {
    // Retry 3 times
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        // If rate-limited (too many requests)
        console.warn("Rate limit hit. Retrying in 2 seconds...");
        await delay(2000); // Wait 2 seconds before retrying
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.results; // Return the questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  return []; // Return empty if all retries fail
}

// Delay function
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// start the quiz by fetching questions and storing them in localStorage to avoid the rate-limited error

export async function startQuiz() {
  try {
    let cachedQuestions = localStorage.getItem("quizQuestions");

    // Load cached questions if available, otherwise fetch from API
    if (cachedQuestions) {
      questions = JSON.parse(cachedQuestions); // Load from cache if available
    } else {
      questions = await fetchQuestionsWithRetry(5, category, difficulty); // Fetch from API
      localStorage.setItem("quizQuestions", JSON.stringify(questions)); // Cache questions
    }

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

  // disable the submit button
  const submitButton = document.querySelector(".submitAnswer");
  if (submitButton) {
    // hiding submit button when answer is submitted;
    submitButton.classList.add("disabled");
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

  // create next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("nextQuestion");
  nextButton.addEventListener("click", () => {
    // Avoid creating a new copy of the dataset, just update the currentQuestion index
    if (currentQuestion < dataSet.length - 1) {
      currentQuestion++;
      renderQuiz(dataSet);
    } else {
      localStorage.setItem("finalScore", currentScore);
      window.location.href = "result.html"; // redirects user to result page once no questions are available. This is really neat!
    }
  });
  if (currentQuestion < dataSet.length - 1) {
    feedbackDisplay.after(nextButton); // Insert the button right after the feedback message.
  } else {
    feedbackDisplay.after(nextButton); // Insert the button right after the feedback message.
    nextButton.textContent = "Finish Quiz"; // If it's the last question, change button text to "Finish Quiz"
  }
}

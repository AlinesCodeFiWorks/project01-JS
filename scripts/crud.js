export function crud() {
  document.addEventListener("DOMContentLoaded", function () {
    class NewQuestion {
      constructor(
        difficulty,
        category,
        question,
        correctAnswer,
        incorrectAnswers
      ) {
        this.type = "multiple";
        this.difficulty = difficulty;
        this.category = category;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
      }
    }
    //get form and buttons
    const form = document.querySelectorAll(".newQuestionForm");
    const questionList = document.querySelectorAll("#questionList");
    const clearButton = document.querySelectorAll(".clearSubmittedQuestions");

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        // retrieve form inputs
        const difficulty = document.querySelector("#newDiff").value;
        const category = document.querySelector("#newCat").value;
        const question = document.querySelector("#newQuestion").value;
        const correctAnswer = document.querySelector(".newCorrectAnswer").value;
        const incorrectAnswers = [
          ...document.querySelectorAll(".newIncorrectAnswer"),
        ].map((input) => input.value);

        // Create a new question instance
        const newQuestion = new NewQuestion(
          difficulty,
          category,
          question,
          correctAnswer,
          incorrectAnswers
        );
        // Store in localStorage
        saveQuestion(newQuestion);

        // Reset the form
        form.reset();
      });
    } else {
      console.error(
        "Form not found. Check if the class 'newQuestionForm' is correct."
      );
    }
    //clear all questions
    if (clearButton) {
      clearButton.addEventListener("click", function () {
        localStorage.removeItem("questions");
        displayStoredQuestions();
      });
    } else {
      console.error(
        "Clear button not found. Check if the class 'clearSubmittedQuestions' is correct."
      );
    }
    // Save question to localStorage
    function saveQuestion(question) {
      let questions = JSON.parse(localStorage.getItem("questions")) || [];
      questions.push(question);
      localStorage.setItem("questions", JSON.stringify(questions));
      displayStoredQuestions();
    }

    // Display stored questions
    function displayStoredQuestions() {
      questionList.innerHTML = ""; // Clear current list
      let questions = JSON.parse(localStorage.getItem("questions")) || [];

      questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${index + 1}. ${
          question.question
        }</strong> <button class="delete" data-index="${index}">Delete</button>`;
        questionList.appendChild(listItem);
      });

      // Add event listeners to delete buttons
      document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", deleteQuestion);
      });
    }

    // Delete a specific question
    function deleteQuestion(event) {
      let questions = JSON.parse(localStorage.getItem("questions")) || [];
      const index = event.target.dataset.index;
      questions.splice(index, 1);
      localStorage.setItem("questions", JSON.stringify(questions));
      displayStoredQuestions();
    }
    // Load stored questions on page load
    document.addEventListener("DOMContentLoaded", displayStoredQuestions);
  });
}

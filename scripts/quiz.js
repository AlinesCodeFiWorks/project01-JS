//Function to display questions from the question bank
export function renderQuiz(dataSet) {
  const quizInterface = document.querySelector(".quizInterface");
  dataSet.forEach((question) => {
    quizInterface.innerHTML = `<h2>${question.question}</h2>
    <form id="${question.questionId} class="optionsForm">
    <input type="radio" name="${question.questionId}" id="${question.questionId}a">
    <label for="${question.questionId}a">a. ${question.options.a}</label>
    <br>
    <input type="radio" name="${question.questionId}" id="${question.questionId}b">
    <label for="${question.questionId}b">b. ${question.options.b}</label>
    <br>
    <input type="radio" name="${question.questionId}" id="${question.questionId}c">
    <label for="${question.questionId}c">c. ${question.options.c}</label>
    <br>
    <input type="radio" name="${question.questionId}" id="${question.questionId}d">
    <label for="${question.questionId}d">d. ${question.options.d}</label>
    <br>
    <input type="submit" class="submitAnswer">
    </form>`;
  });
}

//TODO use class for crud portion of adding new questions
export class NewQuestion {
  constructor(inputs) {
    (this.type = "multiple"),
      (this.difficulty = `"${newDiff.value}"`),
      (this.category = `"${newCat.value}"`),
      (this.question = `"${newQuestion.value}"`),
      (this.correctAnswer = `"${newCorrectAnswer.value}"`),
      (this.incorrectAnswers = [`"${newIncorrectAnswer.value}"`]);
  }

  submitNewQuestion(parameters) {
    // method to create new instance at the press of the submit button and append it to list of available questions
  }
}

//TODO for CRUD class AND finalScore, before storing to local storage, convert string to JSON, then the other way around when pulled from local storage

/* question format in the api to replicate when building class
{
  "response_code": 0,
  "results": [
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Video Games",
      "question": "Who is the character you play as in Yume Nikki?",
      "correct_answer": "Madotsuki",
      "incorrect_answers": [
        "Masada",
        "Uboa",
        "Poniko"
      ]
    } */

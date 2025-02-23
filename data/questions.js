// Initial question bank object for testing and preliminary setup
export const questionBank = [
  {
    questionId: 1,
    question: "What is my name?",
    options: {
      a: "Bob",
      b: "Melissa",
      c: "Mark",
      d: "Grace",
    },
    answer: "c",
    feedback: {
      correct: "That's right! My name is Mark.",
      incorrect: "That is not my name.",
    },
  },
  {
    questionId: 2,
    question: "Where are we?",
    options: {
      a: "Earth",
      b: "The United States of America",
      c: "Here",
      d: "Greece",
    },
    answer: "b",
    feedback: {
      correct: "Correct: we are in the US.",
      incorrect: "You don't know where you are? That's concerning.",
    },
  },
  {
    questionId: 3,
    question: "What color is the sky?",
    options: {
      a: "Red",
      b: "It depends on the time of the day!",
      c: "Blue",
      d: "Grace",
    },
    answer: "c",
    feedback: {
      correct: "Very good, the sky is always blue!",
      incorrect: "You should go out more often",
    },
  },
  {
    questionId: 4,
    question: "How do you say 'Hello' in Spanish?",
    options: {
      a: "Hola",
      b: "Ciao",
      c: "?Como ce dice hola en ingles?",
      d: "Yellow",
    },
    answer: "a",
    feedback: {
      correct: "!Hola- muy bien!",
      incorrect: "Keep trying, you'll get there!",
    },
  },
  {
    questionId: 5,
    question: "What is my name?",
    options: {
      a: "Bob",
      b: "Melissa",
      c: "Mark",
      d: "Grace",
    },
    answer: "c",
    feedback: {
      correct: "You remembered me!",
      incorrect: "The sky is always blue.",
    },
  },
];
//trying out API integration
export async function fetchQuestions(
  amount = 5,
  category = "",
  difficulty = "easy",
  type = "multiple"
) {
  try {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error("Failed to fetch questions. Try again.");
    }

    return data.results; // returns an array of questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

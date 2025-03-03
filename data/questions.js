//API: https://opentdb.com/api_config.php
export async function fetchQuestions(
  amount = 5,
  category = "",
  difficulty = "easy",
  type = "multiple"
) {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    console.log("Fetching with:", { amount, category, difficulty, type });

    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error("Failed to fetch questions. Try again.");
    }

    let apiQuestions = data.results || []; // api questions
    let userQuestions = JSON.parse(localStorage.getItem("questions")) || []; // custom questions

    // Convert category to number (ensuring correct comparison)
    let categoryNum = category ? Number(category) : null;

    // Filter user questions based on selected difficulty and category
    let filteredUserQuestions = userQuestions.filter((q) => {
      return (
        (!difficulty || q.difficulty === difficulty) &&
        (!category || q.category === category) // Use == for potential string/number mismatch
      );
    });

    // combine api and submitted questions
    let allQuestions = [...apiQuestions, ...filteredUserQuestions];

    // Shuffle and limit to 5 questions
    return shuffleArray(allQuestions).slice(0, 5); // return merged list
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

// shuffling arrays - moved from main quiz file
function shuffleArray(array) {
  return array
    .map((item) => ({ item, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item);
}

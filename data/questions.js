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

    let apiQuestions = data.results || []; // api questions
    let userQuestions = JSON.parse(localStorage.getItem("questions")) || []; // custom questions

    // Filter user questions based on selected difficulty and category -optional
    let filteredUserQuestions = userQuestions.filter((q) => {
      return (
        (!difficulty || q.difficulty === difficulty) &&
        (!category || q.category === category)
      );
    });

    // combine api and submitted questions
    let combinedQuestions = [...apiQuestions, ...filteredUserQuestions];

    return combinedQuestions; // return merged list
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

export const getQuestions = async (category, difficulty) => {
  const queries = new URLSearchParams({
    difficulty,
    category,
    amount: 1,
    type: "multiple",
  });

  const response = await fetch(
    `https://opentdb.com/api.php?${queries.toString()}`
  );
  const data = await response.json();
  return data.results;
};

import { getQuestions } from "./api";
import { CATEGORIES_ID } from "./constants";

export const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const processQuestionObject = (questionObj) => {
  const { correct_answer, incorrect_answers } = questionObj;

  const answers = [
    { id: 1, isCorrect: true, text: correct_answer },
    ...incorrect_answers.map((answer, index) => ({
      id: index + 2,
      isCorrect: false,
      text: answer,
    })),
  ];

  delete questionObj.correct_answer;
  delete questionObj.incorrect_answers;

  questionObj.answers = answers;

  return questionObj;
};

export const getRandomQuestions = async (difficulty) => {
  const shuffledArray = CATEGORIES_ID.slice();
  const randomIds = [];

  while (randomIds.length < 3) {
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    const randomId = shuffledArray.splice(randomIndex, 1)[0];
    randomIds.push(randomId);
  }

  const promises = randomIds.map((id) => getQuestions(id, difficulty));

  const questions = await Promise.all(promises);

  console.log(
    questions.flat().map((questionObj) => processQuestionObject(questionObj))
  );
};

export const generateUser = (username, avatarId) => ({
  id: crypto.randomUUID(),
  username,
  avatarId,
  highestScore: null,
  preferredDifficulty: null,
  playedGames: [],
});

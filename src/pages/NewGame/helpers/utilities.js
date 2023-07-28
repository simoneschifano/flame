import { AVATARS } from "@/shared/helpers/constants";
import { getQuestions } from "./api";
import { CATEGORIES_ID, MULTIPLIER, TIMER_DURATION } from "./constants";
import { shuffle } from "@/shared/helpers/utilities";

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

  questionObj.answers = shuffle(answers);
  questionObj.shouldShowCorrection = false;
  questionObj.id = crypto.randomUUID();
  questionObj.score = null;

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

  return questions
    .flat()
    .map((questionObj) => processQuestionObject(questionObj));
};

export const generateUser = (username, avatarId) => ({
  id: crypto.randomUUID(),
  username,
  avatarId,
  highestScore: null,
  preferredDifficulty: null,
  playedGames: [],
});

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export const generateGameLog = (score) => ({
  id: crypto.randomUUID(),
  date: getCurrentDate(),
  score,
});

export const getAvatarFromUserId = (usersList, userId) =>
  AVATARS[usersList.find((user) => user.id === userId)?.avatarId];

export const getSingleQuestionScore = (responseTime, difficulty) =>
  Math.round(
    (1 - responseTime / TIMER_DURATION / 2 / MULTIPLIER[difficulty]) * 1000
  );

export function scoreFlamer(score) {
  if (score < 333) return "🔥";
  else if (score < 666) return "🔥🔥";
  else if (score >= 666) return "🔥🔥🔥";
}

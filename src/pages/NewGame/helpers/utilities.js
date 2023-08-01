import { getQuestions } from "./api";
import { CATEGORIES_ID, MULTIPLIER, TIMER_DURATION } from "./constants";
import { getRoomUrl, shuffle } from "@/shared/helpers/utilities";

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

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const generateGameLog = (score) => ({
  id: crypto.randomUUID(),
  date: getCurrentDate(),
  score,
});

export const generateRoomObject = (id) => ({
  id,
  createdAt: getCurrentDate(),
  users: [],
});

export const getUserFromUsername = (users, username) =>
  users?.find((user) => user.username === username);

export const getSingleQuestionScore = (responseTime, difficulty) =>
  Math.round(
    (1 - responseTime / TIMER_DURATION / 2 / MULTIPLIER[difficulty]) * 1000
  );

export const generateRoomId = () =>
  String(Math.floor(100000 + Math.random() * 900000));

export const getFlamesFromScore = (score) => {
  if (score > 666) return "🔥🔥🔥";
  if (score > 333) return "🔥🔥";
  if (score >= 1) return "🔥";
  return "";
};

export const getShareCopy = (
  roomId
) => `Join my room in FLAME, let's challenge ourselves! 

Enter the PIN: ${roomId}
Or click on this link: ${getRoomUrl(roomId)}`;

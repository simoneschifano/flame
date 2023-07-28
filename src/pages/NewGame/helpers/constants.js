export const CATEGORIES_ID = [
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32,
];

export const DIFFICULTIES = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export const TIMER_DURATION = 19.9;

export const INITIAL_GAME_STATE = {
  userData: null,
  finalScore: null,
  questions: [],
  currentQuestionIndex: 0,
  isCtaLoading: false,
};

export const GAME_STATE_ACTIONS = {
  OVERWRITE_STATE: "OVERWRITE_STATE",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  UPDATE_QUESTION_INDEX: "UPDATE_QUESTION_INDEX",
  CONCLUDE_GAME: "CONCLUDE_GAME",
};

export const NEW_GAME_ROUTES = {
  CHOOSE_USERNAME: "choose-username",
  CHOOSE_DIFFICULTY: "choose-difficulty",
  QUIZ: "quiz",
  RESULTS: "results",
};

const [EASY, MEDIUM, HARD] = DIFFICULTIES.map((difficulty) => difficulty.value);
export const MULTIPLIER = {
  [EASY]: 1,
  [MEDIUM]: 2,
  [HARD]: 3,
};

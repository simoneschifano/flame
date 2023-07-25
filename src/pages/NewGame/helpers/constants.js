export const CATEGORIES_ID = [
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32,
];

export const TIMER_DURATION = 4;

export const INITIAL_GAME_STATE = {
  userData: null,
  score: 0,
  questions: [],
  currentQuestionIndex: 0,
};

export const GAME_STATE_ACTIONS = {
  USER_INIT: "USER_INIT",
  UPDATE_AVATAR_ID: "UPDATE_AVATAR_ID",
  UPDATE_PREFERRED_DIFFICULTY: "UPDATE_PREFERRED_DIFFICULTY",
  UPDATE_QUESTION_STATE: "UPDATE_QUESTION_STATE",
};

export const NEW_GAME_ROUTES = {
  CHOOSE_USERNAME: "choose-username",
  CHOOSE_DIFFICULTY: "choose-difficulty",
  QUIZ: "quiz",
  RESULTS: "results",
};
// if(user)
// dispatch('TYPE', user)

// if(!user)
// const newUser = generateUser('test', 1);
// dispatch('TYPE', newUser)
// addUser(newUser)

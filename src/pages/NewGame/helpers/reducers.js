import { GAME_STATE_ACTIONS } from "./constants";

const {
  USER_INIT,
  UPDATE_USER,
  QUESTIONS_INIT,
  UPDATE_QUESTION_INDEX,
  UPDATE_QUESTION_STATE,
} = GAME_STATE_ACTIONS;

export const gameReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_INIT:
      return { ...state, userData: payload };

    case UPDATE_USER: {
      const { key, value } = payload;

      return { ...state, userData: { ...state.userData, [key]: value } };
    }

    case QUESTIONS_INIT:
      return { ...state, questions: payload };

    case UPDATE_QUESTION_STATE: {
      const { key, value } = payload;
      const updatedQuestions = [...state.questions];
      updatedQuestions[state.currentQuestionIndex][key] = value;

      return {
        ...state,
        questions: updatedQuestions,
      };
    }

    case UPDATE_QUESTION_INDEX:
      if (state.currentQuestionIndex === state.questions.length - 1)
        return state;

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    default:
      return state;
  }
};

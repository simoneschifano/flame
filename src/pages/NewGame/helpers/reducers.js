import { GAME_STATE_ACTIONS } from "./constants";
import { generateGameLog } from "./utilities";

const {
  OVERWRITE_STATE,
  UPDATE_USER,
  UPDATE_QUESTION_INDEX,
  UPDATE_QUESTION,
  CONCLUDE_GAME,
} = GAME_STATE_ACTIONS;

export const gameReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case OVERWRITE_STATE: {
      return { ...state, ...payload };
    }

    case UPDATE_USER: {
      const { key, value } = payload;

      return { ...state, userData: { ...state.userData, [key]: value } };
    }

    case UPDATE_QUESTION: {
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

    case CONCLUDE_GAME: {
      const finalScore = Math.round(
        state.questions.reduce((acc, curr) => acc + curr.score, 0) /
          state.questions.length
      );

      return {
        ...state,
        userData: {
          ...state.userData,
          ...(finalScore > (state.userData.highestScore || 0) && {
            highestScore: finalScore,
          }),
          playedGames: [
            ...state.userData.playedGames,
            generateGameLog(finalScore),
          ],
        },
        finalScore,
      };
    }

    default:
      return state;
  }
};

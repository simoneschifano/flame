import { upsertById } from "@/shared/helpers/utilities";
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
    case OVERWRITE_STATE:
      return { ...state, ...payload };

    case UPDATE_USER: {
      const { key, value } = payload;
      const newUserData = { ...state.userData, [key]: value };
      const updatedUsers = upsertById(state.roomData.users, newUserData);

      return {
        ...state,
        roomData: { ...state.roomData, users: updatedUsers },
        userData: newUserData,
      };
    }

    case UPDATE_QUESTION: {
      const updatedQuestions = [...state.questions];
      const targetQuestion = updatedQuestions[state.currentQuestionIndex];
      updatedQuestions[state.currentQuestionIndex] = {
        ...targetQuestion,
        ...payload,
      };

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
      const isNewRecord = finalScore > (state.userData.highestScore || 0);

      const newUserData = {
        ...state.userData,
        ...(isNewRecord && {
          highestScore: finalScore,
        }),
        playedGames: [
          ...state.userData.playedGames,
          generateGameLog(finalScore),
        ],
      };

      return {
        ...state,
        userData: newUserData,
        roomData: {
          ...state.roomData,
          users: upsertById(state.roomData.users, newUserData),
        },
        finalScore,
      };
    }

    default:
      return state;
  }
};

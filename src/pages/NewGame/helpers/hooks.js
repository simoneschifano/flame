import { useLocation, useOutletContext } from "react-router-dom";
import { useCallback } from "react";
import { GAME_STATE_ACTIONS } from "./constants";

const {
  USER_INIT,
  UPDATE_AVATAR_ID,
  UPDATE_PREFERRED_DIFFICULTY,
  UPDATE_QUESTION_STATE,
} = GAME_STATE_ACTIONS;

export const useCurrentStep = () => {
  const location = useLocation();
  if (!location?.pathname.includes("new-game")) return null;

  const currentStep = location?.pathname.split("/").pop();
  return currentStep;
};

export const useGameContext = () => {
  const { state, dispatch } = useOutletContext();

  const initUser = useCallback(
    (user) => dispatch({ type: USER_INIT, payload: user }),
    [dispatch]
  );

  const updateAvatarId = useCallback(
    (avatarId) => dispatch({ type: UPDATE_AVATAR_ID, payload: avatarId }),
    [dispatch]
  );

  const updatePreferredDifficulty = useCallback(
    (difficulty) =>
      dispatch({ type: UPDATE_PREFERRED_DIFFICULTY, payload: difficulty }),
    [dispatch]
  );

  const updateQuestionState = useCallback(
    (key, value) =>
      dispatch({ type: UPDATE_QUESTION_STATE, payload: { key, value } }),
    [dispatch]
  );

  return {
    gameState: state,
    initUser,
    updateAvatarId,
    updatePreferredDifficulty,
    updateQuestionState,
  };
};

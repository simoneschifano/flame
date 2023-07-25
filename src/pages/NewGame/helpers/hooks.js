import { useLocation } from "react-router-dom";
import { GameContext } from "./contexts";
import { useCallback, useContext } from "react";

export const useCurrentStep = () => {
  const location = useLocation();
  if (!location?.pathname.includes("new-game")) return null;

  const currentStep = location?.pathname.split("/").pop();
  return currentStep;
};

export const useGameContext = () => {
  const { state, dispatch } = useContext(GameContext);

  const initUser = useCallback(
    (user) => {
      dispatch({ type: "USER_INIT", payload: user });
    },
    [dispatch]
  );

  const updatePreferredDifficulty = useCallback(
    (difficulty) => {
      dispatch({ type: "UPDATE_PREFERRED_DIFFICULTY", payload: difficulty });
    },
    [dispatch]
  );

  const updateQuestionState = useCallback(
    (key, value) => {
      dispatch({ type: "UPDATE_QUESTION_STATE", payload: { key, value } });
    },
    [dispatch]
  );

  return {
    gameState: state,
    initUser,
    updatePreferredDifficulty,
    updateQuestionState,
  };
};

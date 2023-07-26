import { useLocation, useOutletContext } from "react-router-dom";
import { useCallback } from "react";
import { GAME_STATE_ACTIONS } from "./constants";

const { USER_INIT, UPDATE_USER, QUESTIONS_INIT, UPDATE_QUESTION_STATE } =
  GAME_STATE_ACTIONS;

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

  const updateUser = useCallback(
    (key, value) => dispatch({ type: UPDATE_USER, payload: { key, value } }),
    [dispatch]
  );

  const initQuestions = useCallback(
    (questions) => dispatch({ type: QUESTIONS_INIT, payload: questions }),
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
    updateUser,
    initQuestions,
    updateQuestionState,
  };
};

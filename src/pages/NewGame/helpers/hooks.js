import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_STATE_ACTIONS, NEW_GAME_ROUTES } from "./constants";
import { getRandomQuestions, getSingleQuestionScore } from "./utilities";
import { ROUTES } from "@/shared/helpers/constants";
import { updateUserCollection } from "@/shared/helpers/api";

const {
  OVERWRITE_STATE,
  UPDATE_USER,
  UPDATE_QUESTION,
  UPDATE_QUESTION_INDEX,
  CONCLUDE_GAME,
} = GAME_STATE_ACTIONS;
const { CHOOSE_USERNAME, CHOOSE_DIFFICULTY, QUIZ, RESULTS } = NEW_GAME_ROUTES;

export const useCurrentStep = () => {
  const location = useLocation();
  if (!location?.pathname.includes("new-game")) return null;

  const currentStep = location?.pathname.split("/").pop();
  return currentStep;
};

export const useGameContext = () => {
  const { state, dispatch } = useOutletContext();

  const { questions, currentQuestionIndex } = state;

  const currentQuestion = questions?.[currentQuestionIndex];

  const initUser = useCallback(
    (user) =>
      dispatch({
        type: OVERWRITE_STATE,
        payload: { userData: user },
      }),
    [dispatch]
  );

  const updateUser = useCallback(
    (key, value) => dispatch({ type: UPDATE_USER, payload: { key, value } }),
    [dispatch]
  );

  const initQuestions = useCallback(
    (questions) =>
      dispatch({
        type: OVERWRITE_STATE,
        payload: { questions },
      }),
    [dispatch]
  );

  const updateQuestionState = useCallback(
    (key, value) =>
      dispatch({ type: UPDATE_QUESTION, payload: { key, value } }),
    [dispatch]
  );

  return {
    gameState: state,
    currentQuestion,
    initUser,
    updateUser,
    initQuestions,
    updateQuestionState,
  };
};

const useSyncEndGameWithDb = (state, dispatch, setIsLoading) => {
  const { userData, finalScore } = state;
  const currentStep = useCurrentStep();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep !== QUIZ || finalScore === null) return;

    const updateUserInDb = async () => {
      setIsLoading(true);
      await updateUserCollection(userData);
      dispatch({
        type: OVERWRITE_STATE,
        payload: { currentQuestionIndex: 0, questions: [] },
      });
      setIsLoading(false);
      navigate(RESULTS);
    };

    updateUserInDb();
  }, [currentStep, navigate, userData, finalScore, setIsLoading, dispatch]);
};

export const useNavigation = (state, dispatch) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const currentStep = useCurrentStep();

  useSyncEndGameWithDb(state, dispatch, setIsLoading);

  const { userData, questions, currentQuestionIndex } = state;
  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const ctaDisabledMessage = (() => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        return !userData?.username ||
          (!userData?.avatarId && userData?.avatarId !== 0)
          ? "Please choose username and avatar to continue"
          : null;
      case CHOOSE_DIFFICULTY:
        return !userData?.preferredDifficulty
          ? "Please choose a difficulty to continue"
          : null;
      default:
        return null;
    }
  })();

  const evaluatedCtaCopy = (() => {
    if (currentStep === RESULTS) return "Go to leaderboard";
    if (currentStep === QUIZ) {
      if (!currentQuestion?.shouldShowCorrection) return "Continue";
      if (isLastQuestion) return "Go to results";
      return "Next Question";
    }
    return "Continue";
  })();

  const navigateBack = () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        navigate(ROUTES.LANDING);
        break;
      case CHOOSE_DIFFICULTY:
        navigate(CHOOSE_USERNAME);
        break;
      case QUIZ:
        dispatch({
          type: OVERWRITE_STATE,
          payload: { currentQuestionIndex: 0, questions: [] },
        });
        navigate(CHOOSE_DIFFICULTY);
        break;
      case RESULTS:
        dispatch({
          type: OVERWRITE_STATE,
          payload: { finalScore: null },
        });
        navigate(CHOOSE_USERNAME);
        break;
    }
  };

  const evaluateNextStep = async () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        setIsLoading(true);
        await updateUserCollection(userData);
        setIsLoading(false);
        navigate(CHOOSE_DIFFICULTY);
        break;

      case CHOOSE_DIFFICULTY:
        setIsLoading(true);
        await updateUserCollection(userData);
        setIsLoading(false);
        navigate(QUIZ);
        break;

      case QUIZ: {
        if (!currentQuestion?.shouldShowCorrection) {
          dispatch({
            type: UPDATE_QUESTION,
            payload: { key: "shouldShowCorrection", value: true },
          });
          return;
        }

        if (isLastQuestion) {
          dispatch({
            type: CONCLUDE_GAME,
            payload: {},
          });
          return;
        }

        dispatch({
          type: UPDATE_QUESTION_INDEX,
        });
        break;
      }

      case RESULTS:
        navigate("/");
    }
  };

  return {
    isLoading,
    navigateBack,
    evaluateNextStep,
    ctaDisabledMessage,
    evaluatedCtaCopy,
  };
};

export const useRetrieveQuestions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { gameState, initQuestions } = useGameContext();
  const { userData } = gameState;
  const dataFetchedRef = useRef(false);

  const fetchQuestions = useCallback(async () => {
    const results = await getRandomQuestions(userData?.preferredDifficulty);
    initQuestions(results);
    setIsLoading(false);
  }, [userData?.preferredDifficulty, initQuestions]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchQuestions();
  }, [fetchQuestions]);

  return isLoading;
};

export const useScoringLogic = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [responseTime, setResponseTime] = useState(0);

  const stopwatchRef = useRef(null);

  const { currentQuestion, updateQuestionState } = useGameContext();

  const initStopwatchInterval = useCallback(() => {
    setResponseTime(0);
    const intervalId = setInterval(
      () =>
        setResponseTime(
          (prevSeconds) => Math.round((prevSeconds + 0.1) * 10) / 10
        ),
      100
    );
    stopwatchRef.current = intervalId;
  }, []);

  const handleTimerExpiration = useCallback(() => {
    updateQuestionState("shouldShowCorrection", true);
    updateQuestionState("score", 0);
  }, [updateQuestionState]);

  useEffect(() => {
    setSelectedAnswer(null);
    setResponseTime(0);
    initStopwatchInterval();

    return () => clearInterval(stopwatchRef.current);
  }, [initStopwatchInterval, currentQuestion?.id]);

  useEffect(() => {
    if (!currentQuestion?.shouldShowCorrection) return;

    clearInterval(stopwatchRef.current);
    if (
      currentQuestion?.answers.find((answer) => answer.isCorrect)?.id ===
      selectedAnswer?.id
    )
      updateQuestionState(
        "score",
        getSingleQuestionScore(responseTime, currentQuestion?.difficulty)
      );
    else updateQuestionState("score", 0);
  }, [
    currentQuestion?.answers,
    currentQuestion?.difficulty,
    responseTime,
    selectedAnswer?.id,
    currentQuestion?.shouldShowCorrection,
    updateQuestionState,
  ]);

  return {
    selectedAnswer,
    setSelectedAnswer,
    handleTimerExpiration,
  };
};

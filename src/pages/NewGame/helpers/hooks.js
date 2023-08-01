import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GAME_STATE_ACTIONS, NEW_GAME_ROUTES } from "./constants";
import {
  generateUser,
  getRandomQuestions,
  getSingleQuestionScore,
  getUserFromUsername,
} from "./utilities";
import { ROUTES } from "@/shared/helpers/constants";
import { updateRoomUser } from "./api";

import useSound from "use-sound";
import correctSfx from "@/assets/sounds/right.mp3";
import wrongSfx from "@/assets/sounds/wrong.mp3";
import { getStoredMuted } from "@/shared/helpers/storage";

const {
  OVERWRITE_STATE,
  UPDATE_USER,
  UPDATE_QUESTION,
  UPDATE_QUESTION_INDEX,
  CONCLUDE_GAME,
} = GAME_STATE_ACTIONS;
const { CHOOSE_ROOM, CHOOSE_USERNAME, CHOOSE_DIFFICULTY, QUIZ, RESULTS } =
  NEW_GAME_ROUTES;
const { LEADERBOARD, LANDING, NEW_GAME } = ROUTES;

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

  const initRoom = useCallback(
    (roomData) =>
      dispatch({
        type: OVERWRITE_STATE,
        payload: { roomData },
      }),
    [dispatch]
  );

  const initUser = useCallback(
    (user) =>
      dispatch({
        type: OVERWRITE_STATE,
        payload: {
          userData: user,
        },
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
    (payload) => dispatch({ type: UPDATE_QUESTION, payload }),
    [dispatch]
  );

  return {
    gameState: state,
    currentQuestion,
    initRoom,
    initUser,
    updateUser,
    initQuestions,
    updateQuestionState,
  };
};

export const useUsersAutocomplete = (users, handleUserChange) => {
  const [username, setUsername] = useState("");
  const [shouldShowDropdown, setShouldShowDropdown] = useState(true);
  const [targetOptionIndex, setTargetOptionIndex] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );

  const shouldShowIsFirst = !users?.length && !username;
  const shouldShowCreateNew = !getUserFromUsername(users, username) && username;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Tab":
        e.preventDefault();
        if (targetOptionIndex !== null) return;
        setTargetOptionIndex(0);
        break;

      case "ArrowDown":
        e.preventDefault();
        if (
          targetOptionIndex === null ||
          targetOptionIndex === filteredUsers.length - 1
        ) {
          setTargetOptionIndex(0);
          return;
        }
        setTargetOptionIndex(targetOptionIndex + 1);
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!targetOptionIndex) {
          setTargetOptionIndex(filteredUsers.length - 1);
          return;
        }
        setTargetOptionIndex(targetOptionIndex - 1);
        break;

      case "Enter": {
        e.preventDefault();
        if (shouldShowCreateNew && !filteredUsers.length) {
          handleUserChange(generateUser(username));
          setShouldShowDropdown(false);
        }

        if (targetOptionIndex === null) return;
        const targetUser = filteredUsers[targetOptionIndex];
        setUsername(targetUser?.username || username);
        handleUserChange(targetUser);
        setShouldShowDropdown(false);
        break;
      }

      case " ":
        e.preventDefault();
        setInvalid(true);
        break;

      default:
        break;
    }
  };

  const handleClickOutside = () => {
    shouldShowDropdown && setShouldShowDropdown(false);
    setTargetOptionIndex(null);
    invalid && setInvalid(false);
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    setUsername(value.trim());
    invalid && setInvalid(false);
    targetOptionIndex !== null && setTargetOptionIndex(null);
  };

  const handleUserSelection = (user) => {
    setUsername(user.username);
    handleUserChange(user);
    setShouldShowDropdown(false);
  };

  const handleClear = () => {
    setUsername("");
    invalid && setInvalid(false);
    handleUserChange(null);
  };

  const handleCreateNew = () => {
    handleUserChange(generateUser(username));
    setShouldShowDropdown(false);
  };

  return {
    username,
    shouldShowDropdown,
    setShouldShowDropdown,
    targetOptionIndex,
    invalid,
    filteredUsers,
    shouldShowIsFirst,
    shouldShowCreateNew,
    handleKeyDown,
    handleClickOutside,
    handleValueChange,
    handleUserSelection,
    handleClear,
    handleCreateNew,
  };
};

const useSyncEndGameWithDb = (state, dispatch, setIsLoading) => {
  const { roomData, userData, finalScore } = state;
  const currentStep = useCurrentStep();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep !== QUIZ || finalScore === null) return;

    const updateUserInDb = async () => {
      setIsLoading(true);
      await updateRoomUser(roomData?.id, userData);
      dispatch({
        type: OVERWRITE_STATE,
        payload: { currentQuestionIndex: 0, questions: [] },
      });
      setIsLoading(false);
      navigate(RESULTS);
    };

    updateUserInDb();
  }, [
    currentStep,
    navigate,
    finalScore,
    setIsLoading,
    dispatch,
    roomData?.id,
    userData,
  ]);
};

export const useNavigation = (state, dispatch) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentStep = useCurrentStep();

  const navigate = useNavigate();

  useSyncEndGameWithDb(state, dispatch, setIsLoading);

  const { roomData, userData, questions, currentQuestionIndex } = state;
  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const ctaDisabledMessage = useMemo(() => {
    const isAvatarSelected = userData?.avatarId || userData?.avatarId === 0;

    switch (currentStep) {
      case CHOOSE_USERNAME:
        return !userData?.username || !isAvatarSelected
          ? "Please choose username and avatar to continue"
          : null;
      case CHOOSE_DIFFICULTY:
        return !userData?.preferredDifficulty
          ? "Please choose a difficulty to continue"
          : null;
      case QUIZ:
        return !questions.length
          ? "Please wait until the questions are loaded"
          : null;
      default:
        return null;
    }
  }, [
    currentStep,
    questions.length,
    userData?.avatarId,
    userData?.preferredDifficulty,
    userData?.username,
  ]);

  const evaluatedCtaCopy = useMemo(() => {
    switch (currentStep) {
      case RESULTS:
        return "Go to leaderboard";
      case QUIZ:
        if (!currentQuestion?.shouldShowCorrection) return "Continue";
        if (isLastQuestion) return "Go to results";
        return "Next Question";
      default:
        return "Continue";
    }
  }, [currentStep, currentQuestion?.shouldShowCorrection, isLastQuestion]);

  const navigateBack = () => {
    switch (currentStep) {
      case CHOOSE_ROOM:
        navigate(LANDING);
        break;
      case CHOOSE_USERNAME:
        dispatch({
          type: OVERWRITE_STATE,
          payload: { userData: null, roomData: null },
        });
        navigate(CHOOSE_ROOM);
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

  const handleUpdateRoomDoc = async (nextStep) => {
    setIsLoading(true);
    await updateRoomUser(roomData?.id, userData);
    setIsLoading(false);
    navigate(nextStep);
  };

  const reachNextStep = async () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        handleUpdateRoomDoc(CHOOSE_DIFFICULTY);
        break;

      case CHOOSE_DIFFICULTY:
        handleUpdateRoomDoc(QUIZ);
        break;

      case QUIZ: {
        if (!currentQuestion?.shouldShowCorrection) {
          dispatch({
            type: UPDATE_QUESTION,
            payload: { shouldShowCorrection: true },
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
        navigate(
          "../" +
            LEADERBOARD +
            "?roomId=" +
            roomData?.id +
            "&userId=" +
            userData?.id
        );
        break;

      default:
        break;
    }
  };

  return {
    isLoading,
    navigateBack,
    reachNextStep,
    ctaDisabledMessage,
    evaluatedCtaCopy,
  };
};

export const useRedirectCheck = () => {
  const currentStep = useCurrentStep();
  const { gameState } = useGameContext();
  const { userData, roomData } = gameState;

  const navigate = useNavigate();

  useEffect(() => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        if (!roomData?.id) navigate(CHOOSE_ROOM);
        break;
      case CHOOSE_DIFFICULTY:
      case RESULTS:
        if (!userData?.id) navigate(NEW_GAME);
        break;
      case QUIZ:
        if (!userData?.preferredDifficulty) navigate(NEW_GAME);
        break;
      default:
        break;
    }
  }, [
    currentStep,
    userData?.id,
    navigate,
    roomData?.id,
    userData?.preferredDifficulty,
  ]);
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
  const [correctSound] = useSound(correctSfx, { volume: 0.2, interrupt: true });
  const [wrongSound] = useSound(wrongSfx, { volume: 0.2, interrupt: true });
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

  useEffect(() => {
    setSelectedAnswer(null);
    setResponseTime(0);
    initStopwatchInterval();

    return () => clearInterval(stopwatchRef.current);
  }, [initStopwatchInterval, currentQuestion?.id]);

  useEffect(() => {
    if (!currentQuestion?.shouldShowCorrection) return;

    clearInterval(stopwatchRef.current);

    if (selectedAnswer?.isCorrect) {
      !getStoredMuted() && correctSound();
      updateQuestionState({
        score: getSingleQuestionScore(
          responseTime,
          currentQuestion?.difficulty
        ),
      });
    } else {
      !getStoredMuted() && wrongSound();
      updateQuestionState({ score: 0 });
    }
  }, [
    currentQuestion?.difficulty,
    responseTime,
    currentQuestion?.shouldShowCorrection,
    updateQuestionState,
    selectedAnswer?.isCorrect,
    correctSound,
    wrongSound,
  ]);

  return {
    selectedAnswer,
    setSelectedAnswer,
  };
};

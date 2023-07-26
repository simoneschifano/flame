import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useCurrentStep } from "./helpers/hooks";
import {
  GAME_STATE_ACTIONS,
  INITIAL_GAME_STATE,
  NEW_GAME_ROUTES,
} from "./helpers/constants";
import Button from "@/shared/components/Button";
import { gameReducer } from "./helpers/reducers";
import { useReducer } from "react";
import { updateUserCollection } from "@/shared/helpers/api";
import logo from "@/assets/brand/logo-word.png";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import { AVATARS, ROUTES } from "@/shared/helpers/constants";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";

const { CHOOSE_USERNAME, CHOOSE_DIFFICULTY, QUIZ, RESULTS } = NEW_GAME_ROUTES;
const { UPDATE_QUESTION_STATE, UPDATE_QUESTION_INDEX } = GAME_STATE_ACTIONS;

const NewGame = () => {
  const currentStep = useCurrentStep();

  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const { userData, questions, currentQuestionIndex } = state;
  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const navigate = useNavigate();

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

  const navigateBack = () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        navigate(ROUTES.LANDING);
        break;
      case CHOOSE_DIFFICULTY:
        navigate(CHOOSE_USERNAME);
        break;
      case QUIZ:
        navigate(CHOOSE_DIFFICULTY);
        break;
      case RESULTS:
        navigate(QUIZ);
        break;
    }
  };

  const evaluateNextStep = async () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        await updateUserCollection(userData);
        navigate(CHOOSE_DIFFICULTY);
        break;

      case CHOOSE_DIFFICULTY:
        await updateUserCollection(userData);
        navigate(QUIZ);
        break;

      case QUIZ: {
        if (!currentQuestion.shouldShowCorrection) {
          dispatch({
            type: UPDATE_QUESTION_STATE,
            payload: { key: "shouldShowCorrection", value: true },
          });
          return;
        }

        if (isLastQuestion) {
          navigate(RESULTS);
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

  const evaluatedCtaCopy = (() => {
    if (currentStep === RESULTS) return "Go to leaderboard";
    if (currentStep === QUIZ) {
      if (!currentQuestion?.shouldShowCorrection) return "Continue";
      if (isLastQuestion) return "Go to results";
      return "Next Question";
    }
    return "Continue";
  })();

  return (
    <main className={styles.NewGame}>
      <header className={styles["NewGame-header"]}>
        <button className={styles["NewGame-headerBack"]} onClick={navigateBack}>
          <img src={arrowBlack} alt="" />
        </button>
        <img className={styles["NewGame-headerLogo"]} src={logo} alt="" />
        <img
          className={getCleanedUpClassNames([
            styles["NewGame-headerAvatar"],
            currentStep === CHOOSE_USERNAME &&
              styles["NewGame-headerAvatar--hidden"],
          ])}
          src={AVATARS[userData?.avatarId]}
          alt=""
        />
      </header>
      <section className={styles["NewGame-content"]}>
        <Outlet context={{ state, dispatch }} />
      </section>
      <footer className={styles["NewGame-footer"]}>
        <Button onClick={evaluateNextStep} disabledMessage={ctaDisabledMessage}>
          {evaluatedCtaCopy}
        </Button>
      </footer>
    </main>
  );
};

export default NewGame;

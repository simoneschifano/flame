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

const { CHOOSE_USERNAME, CHOOSE_DIFFICULTY, QUIZ, RESULTS } = NEW_GAME_ROUTES;
const { UPDATE_QUESTION_STATE } = GAME_STATE_ACTIONS;

const NewGame = () => {
  const currentStep = useCurrentStep();

  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const { questions, currentQuestionIndex } = state;

  const navigate = useNavigate();

  const evaluateNextStep = () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        updateUserCollection(state.userData);
        navigate(CHOOSE_DIFFICULTY);
        break;

      case CHOOSE_DIFFICULTY:
        navigate(QUIZ);
        break;

      case QUIZ: {
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion.isAnswered) {
          dispatch({
            type: UPDATE_QUESTION_STATE,
            payload: { key: "isAnswered", value: true },
          });
        }

        if (!currentQuestion.isValidated) {
          dispatch({
            type: UPDATE_QUESTION_STATE,
            payload: { key: "isValidated", value: true },
          });
        }

        navigate(RESULTS);
        break;
      }

      case RESULTS:
        navigate("/");
    }
  };

  return (
    <main className={styles.NewGame}>
      <header className={styles["NewGame-header"]}></header>
      <section className={styles["NewGame-content"]}>
        <Outlet context={{ state, dispatch }} />
        {/* <section className={styles.test}></section> */}
      </section>
      <footer className={styles["NewGame-footer"]}>
        <Button onClick={evaluateNextStep}>
          {currentStep !== "results" ? "Continue" : "Go to leaderboard"}
        </Button>
      </footer>
    </main>
  );
};

export default NewGame;

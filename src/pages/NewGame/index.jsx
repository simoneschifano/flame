import { Outlet, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useCurrentStep, useGameContext } from "./helpers/hooks";
import { NEW_GAME_ROUTES } from "./helpers/constants";

const { CHOOSE_USERNAME, CHOOSE_DIFFICULTY, QUIZ, RESULTS } = NEW_GAME_ROUTES;

const NewGame = () => {
  const currentStep = useCurrentStep();

  const { gameState, updateQuestionState } = useGameContext();
  const { questions, currentQuestionIndex } = gameState;
  console.log(currentStep);
  console.log(gameState);
  const navigate = useNavigate();

  const evaluateNextStep = () => {
    switch (currentStep) {
      case CHOOSE_USERNAME:
        navigate(CHOOSE_DIFFICULTY);
        break;
      case CHOOSE_DIFFICULTY:
        navigate(QUIZ);
        break;
      case QUIZ: {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion.isAnswered) {
          updateQuestionState("isAnswered", true);
        }
        if (currentQuestion.isAnswered && !currentQuestion.isValidated) {
          updateQuestionState("isValidated", true);
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
        <Outlet />
      </section>
      <footer className={styles["NewGame-footer"]}>
        <button onClick={evaluateNextStep}>
          {currentStep !== "results" ? "Continue" : "Go to leaderboard"}
        </button>
      </footer>
    </main>
  );
};

export default NewGame;

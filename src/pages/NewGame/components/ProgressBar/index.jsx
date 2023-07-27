import { useGameContext } from "../../helpers/hooks";
import styles from "./index.module.scss";

const ProgressBar = () => {
  const { gameState } = useGameContext();
  const { questions, currentQuestionIndex } = gameState;

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

  return (
    <div className={styles.ProgressBar}>
      <div
        className={styles["ProgressBar-thumb"]}
        style={{ width: progressPercentage }}
      />
    </div>
  );
};

export default ProgressBar;

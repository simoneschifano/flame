import { memo } from "react";
import { useGameContext } from "../../helpers/hooks";
import styles from "./index.module.scss";

const ProgressBar = memo(() => {
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
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;

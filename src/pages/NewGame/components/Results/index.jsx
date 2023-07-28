import styles from "./index.module.scss";
import { useGameContext } from "@/pages/NewGame/helpers/hooks";
import GamesHistory from "../GamesHistory";

const Results = () => {
  const { gameState } = useGameContext();
  return (
    <section className={styles.Results}>
      <div className={styles["Results-hero"]}>
        <h1>Congratulations!</h1>
        <h2>You scored: {` ${gameState.finalScore}`} pt</h2>
      </div>
      <h4>History</h4>
      <GamesHistory />
    </section>
  );
};

export default Results;

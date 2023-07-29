import styles from "./index.module.scss";
import { useGameContext } from "@/pages/NewGame/helpers/hooks";
import GamesHistory from "../GamesHistory";

const Results = () => {
  const { gameState } = useGameContext();
  return (
    <section className={styles.Results}>
      <div className={styles["Results-hero"]}>
        <h1>Congratulations!</h1>
        <h2>You scored: {gameState.finalScore} 🔥pt.</h2>
      </div>
      <div className={styles["Results-card-title"]}>
        <p>👑 History 👑</p>
        <GamesHistory />
      </div>
    </section>
  );
};

export default Results;

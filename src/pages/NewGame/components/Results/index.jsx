import ConfettiExplosion from "react-confetti-explosion";
import styles from "./index.module.scss";
import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import GamesHistory from "../GamesHistory";

const Results = () => {
  const { gameState } = useGameContext();

  useRedirectCheck();
  return (
    <section className={styles.Results}>
      <ConfettiExplosion style={{ marginLeft: "50%" }} particleCount={300} />
      <div className={styles["Results-hero"]}>
        <h1>Congratulations!</h1>
        <h2>You scored {gameState.finalScore} pt.</h2>
      </div>
      <div className={styles["Results-card"]}>
        <p className={styles["Results-cardTitle"]}>👑 History 👑</p>
        <GamesHistory />
      </div>
    </section>
  );
};

export default Results;

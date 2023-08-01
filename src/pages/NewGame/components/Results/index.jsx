import ConfettiExplosion from "react-confetti-explosion";
import styles from "./index.module.scss";
import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import GamesHistory from "../GamesHistory";

const Results = () => {
  const { gameState } = useGameContext();
  console.log(gameState);

  useRedirectCheck();
  return (
    <section className={styles.Results}>
      <ConfettiExplosion
        style={{ marginLeft: "50%" }}
        particleCount={gameState.finalScore}
      />
      <div className={styles["Results-hero"]}>
        <h1>
          {gameState.finalScore === 0
            ? "Is this your best?"
            : "Congratulations!"}
        </h1>
        <h2>You scored {gameState.finalScore} pts.</h2>
      </div>

      <div className={styles["Results-card"]}>
        <h4 className={styles["Results-cardTitle"]}>👑 History 👑</h4>
        <GamesHistory />
      </div>
    </section>
  );
};

export default Results;

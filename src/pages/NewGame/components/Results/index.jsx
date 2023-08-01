import ConfettiExplosion from "react-confetti-explosion";
import styles from "./index.module.scss";
import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import GamesHistory from "../GamesHistory";
import { useEffect } from "react";
import victorySfx from "@/assets/sounds/victory.mp3";
import lossSfx from "@/assets/sounds/fail.wav";
import useSound from "use-sound";
import { getStoredMuted } from "@/shared/helpers/storage";

const Results = () => {
  const [victorySound] = useSound(victorySfx, { volume: 0.2 });
  const [lossSound] = useSound(lossSfx, { volume: 0.2 });
  const { gameState } = useGameContext();

  useEffect(() => {
    !getStoredMuted() && gameState.finalScore !== 0
      ? victorySound()
      : lossSound();
  }, [gameState.finalScore, lossSound, victorySound]);

  useRedirectCheck();
  return (
    <section className={styles.Results}>
      {gameState.finalScore !== 0 && (
        <ConfettiExplosion
          style={{ marginLeft: "50%" }}
          particleCount={gameState.finalScore / 2}
        />
      )}
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

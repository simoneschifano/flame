import { useNavigate } from "react-router-dom";
import { DIFFICULTIES } from "../../helpers/constants";
import { useGameContext } from "../../helpers/hooks";
import Slot from "../Slot";
import styles from "./index.module.scss";
import { ROUTES } from "@/shared/helpers/constants";
import { useEffect } from "react";

const DifficultySelection = () => {
  const { gameState, updateUser } = useGameContext();
  const navigate = useNavigate();

  const preferredDifficulty = gameState.userData?.preferredDifficulty;

  useEffect(() => {
    if (!gameState?.userData) navigate(ROUTES.NEW_GAME);
  }, [gameState?.userData, navigate]);

  return (
    <section className={styles.DifficultySelection}>
      <h3>Choose game difficulty</h3>
      <div className={styles["DifficultySelection-options"]}>
        {DIFFICULTIES.map(({ value, label }) => (
          <Slot
            key={value}
            variant={preferredDifficulty === value ? "selected" : null}
            onClick={() => updateUser("preferredDifficulty", value)}
          >
            {label}
          </Slot>
        ))}
      </div>
    </section>
  );
};

export default DifficultySelection;

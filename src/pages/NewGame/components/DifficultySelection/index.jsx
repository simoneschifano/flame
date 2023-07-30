import { DIFFICULTIES } from "@/pages/NewGame/helpers/constants";
import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import Slot from "../Slot";
import styles from "./index.module.scss";

const DifficultySelection = () => {
  const { gameState, updateUser } = useGameContext();

  const preferredDifficulty = gameState.userData?.preferredDifficulty;

  useRedirectCheck();

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

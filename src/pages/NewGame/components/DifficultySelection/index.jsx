import { DIFFICULTIES } from "@/pages/NewGame/helpers/constants";
import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import Slot from "../Slot";
import styles from "./index.module.scss";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";

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
            className={getCleanedUpClassNames([
              styles["DifficultySelection-optionsItem"],
              preferredDifficulty === value &&
                styles["DifficultySelection-optionsItem--selected"],
            ])}
          >
            {label}
          </Slot>
        ))}
      </div>
    </section>
  );
};

export default DifficultySelection;

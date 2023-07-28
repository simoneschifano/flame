import styles from "./index.module.scss";
import { useGameContext } from "@/pages/NewGame/helpers/hooks";
import { scoreFlamer } from "../../helpers/utilities";

const GamesHistory = () => {
  const { gameState } = useGameContext();
  return (
    <div className={styles.GamesHistory}>
      {gameState.userData.playedGames.map(({ id, score, date }) => (
        <div key={id} className={styles["GamesHistory-singleGame"]}>
          <span>
            {score} {scoreFlamer(score)}
          </span>
          <span>{date}</span>
        </div>
      ))}
    </div>
  );
};

export default GamesHistory;

import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import { INITIAL_GAME_STATE } from "./helpers/constants";
import Button from "@/shared/components/Button";
import { gameReducer } from "./helpers/reducers";
import { useReducer } from "react";
import { useNavigation } from "./helpers/hooks";
import Header from "./components/Header";
import GamesHistory from "./components/GamesHistory";

const NewGame = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

  const {
    isLoading,
    evaluateNextStep,
    evaluatedCtaCopy,
    navigateBack,
    ctaDisabledMessage,
  } = useNavigation(state, dispatch);

  return (
    <main className={styles.NewGame}>
      <Header
        userAvatarId={state.userData?.avatarId}
        handleBack={navigateBack}
      />
      <section className={styles["NewGame-content"]}>
        <Outlet context={{ state, dispatch }} />
      </section>
      <footer className={styles["NewGame-footer"]}>
        <Button
          isLoading={isLoading}
          onClick={evaluateNextStep}
          disabledMessage={ctaDisabledMessage}
        >
          {evaluatedCtaCopy}
        </Button>
      </footer>
    </main>
  );
};

export default NewGame;

import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import { INITIAL_GAME_STATE, NEW_GAME_ROUTES } from "./helpers/constants";
import Button from "@/shared/components/Button";
import { gameReducer } from "./helpers/reducers";
import { useReducer } from "react";
import { useCurrentStep, useNavigation } from "./helpers/hooks";
import NewGameHeader from "./components/NewGameHeader";

const NewGame = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const currentStep = useCurrentStep();

  const {
    isLoading,
    reachNextStep,
    evaluatedCtaCopy,
    navigateBack,
    ctaDisabledMessage,
  } = useNavigation(state, dispatch);

  return (
    <main className={styles.NewGame}>
      <NewGameHeader
        userAvatarId={state.userData?.avatarId}
        handleBack={navigateBack}
      />
      <section className={styles["NewGame-content"]}>
        <Outlet context={{ state, dispatch }} />
      </section>
      {currentStep !== NEW_GAME_ROUTES.CHOOSE_ROOM && (
        <footer className={styles["NewGame-footer"]}>
          <Button
            isLoading={isLoading}
            onClick={reachNextStep}
            disabledMessage={ctaDisabledMessage}
          >
            {evaluatedCtaCopy}
          </Button>
        </footer>
      )}
    </main>
  );
};

export default NewGame;

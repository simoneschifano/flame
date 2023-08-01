import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import logo from "@/assets/brand/logo-word.svg";
import { useCurrentStep } from "@/pages/NewGame/helpers/hooks";
import { AVATARS, ROUTES } from "@/shared/helpers/constants";
import { useNavigate } from "react-router-dom";
import VolumeButton from "@/shared/components/VolumeButton";

const { CHOOSE_ROOM, CHOOSE_USERNAME, QUIZ } = NEW_GAME_ROUTES;

const NewGameHeader = ({ handleBack, userAvatarId }) => {
  const currentStep = useCurrentStep();

  const navigate = useNavigate();

  return (
    <header className={styles.NewGameHeader}>
      <button className={styles["NewGameHeader-back"]} onClick={handleBack}>
        <img src={arrowBlack} alt="" />
      </button>
      <img
        className={styles["NewGameHeader-logo"]}
        src={logo}
        onClick={() => currentStep !== QUIZ && navigate(ROUTES.LANDING)}
        style={{ cursor: currentStep === QUIZ ? "default" : "pointer" }}
        alt=""
      />
      <VolumeButton className={styles["NewGameHeader-volumeButton"]} />
      {userAvatarId !== null &&
        ![CHOOSE_ROOM, CHOOSE_USERNAME].includes(currentStep) && (
          <img
            className={styles["NewGameHeader-avatar"]}
            src={AVATARS[userAvatarId]}
            alt=""
          />
        )}
    </header>
  );
};

NewGameHeader.propTypes = {
  handleBack: PropTypes.func.isRequired,
  userAvatarId: PropTypes.number,
};

export default NewGameHeader;

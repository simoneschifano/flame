import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import logo from "@/assets/brand/logo-word.svg";
import { useCurrentStep } from "@/pages/NewGame/helpers/hooks";
import { AVATARS } from "@/shared/helpers/constants";
import { useClassNames } from "@/shared/helpers/hooks";

const { CHOOSE_ROOM, CHOOSE_USERNAME } = NEW_GAME_ROUTES;

const Header = ({ handleBack, userAvatarId }) => {
  const currentStep = useCurrentStep();
  const avatarClassNames = useClassNames([
    styles["Header-avatar"],
    [CHOOSE_ROOM, CHOOSE_USERNAME].includes(currentStep) &&
      styles["Header-avatar--hidden"],
  ]);

  return (
    <header className={styles.Header}>
      <button className={styles["Header-back"]} onClick={handleBack}>
        <img src={arrowBlack} alt="" />
      </button>
      <img className={styles["Header-logo"]} src={logo} alt="" />
      <img className={avatarClassNames} src={AVATARS?.[userAvatarId]} alt="" />
    </header>
  );
};

Header.propTypes = {
  handleBack: PropTypes.func.isRequired,
  userAvatarId: PropTypes.number,
};

export default Header;

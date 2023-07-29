import PropTypes from "prop-types";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";
import styles from "./index.module.scss";
import { NEW_GAME_ROUTES } from "../../helpers/constants";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import logo from "@/assets/brand/logo-word.svg";
import { useCurrentStep } from "../../helpers/hooks";
import { AVATARS } from "@/shared/helpers/constants";

const { CHOOSE_USERNAME } = NEW_GAME_ROUTES;

const Header = ({ handleBack, userAvatarId }) => {
  const currentStep = useCurrentStep();

  return (
    <header className={styles.Header}>
      <button className={styles["Header-back"]} onClick={handleBack}>
        <img src={arrowBlack} alt="" />
      </button>
      <img className={styles["Header-logo"]} src={logo} alt="" />
      <img
        className={getCleanedUpClassNames([
          styles["Header-avatar"],
          currentStep === CHOOSE_USERNAME && styles["Header-avatar--hidden"],
        ])}
        src={AVATARS?.[userAvatarId]}
        alt=""
      />
    </header>
  );
};

Header.propTypes = {
  handleBack: PropTypes.func.isRequired,
  userAvatarId: PropTypes.number,
};

export default Header;

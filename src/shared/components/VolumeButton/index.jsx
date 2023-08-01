import PropTypes from "prop-types";
import styles from "./index.module.scss";
import volumeOn from "@/assets/svg/volume-on.svg";
import volumeOff from "@/assets/svg/volume-off.svg";
import { useState } from "react";
import { getStoredMuted, setStoredMuted } from "@/shared/helpers/storage";
import { useClassNames } from "@/shared/helpers/hooks";

const VolumeButton = ({ className }) => {
  const [isMuted, setIsMuted] = useState(getStoredMuted);
  const classNames = useClassNames([
    styles.VolumeButton,
    className,
    isMuted && styles["VolumeButton--muted"],
  ]);

  const handleClick = () => {
    setIsMuted(!isMuted);
    setStoredMuted(!isMuted);
  };

  return (
    <img
      className={classNames}
      src={isMuted ? volumeOff : volumeOn}
      role="button"
      onClick={handleClick}
    />
  );
};

VolumeButton.propTypes = {
  className: PropTypes.string,
};

export default VolumeButton;

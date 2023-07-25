import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { useClassNames } from "@/shared/helpers/hooks";

const Loader = ({ isContainerWide, containerHeight }) => {
  const classNames = useClassNames([
    styles.Loader,
    isContainerWide && styles["Loader--wide"],
  ]);

  return (
    <div
      className={classNames}
      style={containerHeight ? { height: `${containerHeight}px` } : {}}
    >
      <div className={styles["Loader-circle"]}>
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32" />
        </svg>
      </div>
    </div>
  );
};

Loader.propTypes = {
  isContainerWide: PropTypes.bool,
  containerHeight: PropTypes.number,
};

export default Loader;

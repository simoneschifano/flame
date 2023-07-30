import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { useClassNames } from "@/shared/helpers/hooks";
import { memo } from "react";

const Loader = memo(
  ({ isContainerWide, takesRemainingHeight, containerHeight, className }) => {
    const classNames = useClassNames([
      styles.Loader,
      isContainerWide && styles["Loader--wide"],
      takesRemainingHeight && styles["Loader--grows"],
      className,
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
  }
);

Loader.propTypes = {
  isContainerWide: PropTypes.bool,
  takesRemainingHeight: PropTypes.bool,
  containerHeight: PropTypes.number,
  className: PropTypes.string,
};

Loader.displayName = "Loader";

export default Loader;

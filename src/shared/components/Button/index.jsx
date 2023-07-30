import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Loader from "../Loader";
import { useClassNames } from "@/shared/helpers/hooks";

const Button = ({
  children,
  className,
  disabledMessage,
  isLoading,
  ...props
}) => {
  const classNames = useClassNames([
    styles.Button,
    className,
    isLoading && styles["Button--loading"],
  ]);

  return (
    <div className={classNames}>
      {disabledMessage && (
        <div className={styles["Button-tooltip"]}>{disabledMessage}</div>
      )}
      <button
        className={styles["Button-cta"]}
        disabled={disabledMessage || props.disabled}
        {...props}
      >
        {children}
        <Loader className={styles["Button-ctaLoader"]} />
      </button>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;

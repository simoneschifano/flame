import PropTypes from "prop-types";
import styles from "./index.module.scss";

const Button = ({ children, disabledMessage, ...props }) => {
  return (
    <div className={styles.Button}>
      {disabledMessage && (
        <div className={styles["Button-tooltip"]}>{disabledMessage}</div>
      )}
      <button
        className={styles["Button-cta"]}
        disabled={disabledMessage || props.disabled}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disabledMessage: PropTypes.string,
};

export default Button;

import PropTypes from "prop-types";
import styles from "./index.module.scss";

const Button = (props) => {
  const { children } = props;

  return (
    <button className={styles.Button} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default Button;

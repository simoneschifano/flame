import PropTypes from "prop-types";
import { useClassNames } from "@/shared/helpers/hooks";
import styles from "./index.module.scss";

const Answer = ({ children, variant, onClick }) => {
  const classNames = useClassNames([
    styles.Answer,
    variant && styles[`Answer--${variant}`],
  ]);

  return (
    <div role="button" tabIndex={0} className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};

Answer.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Answer;

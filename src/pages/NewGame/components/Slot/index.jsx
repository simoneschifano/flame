import PropTypes from "prop-types";
import { useClassNames } from "@/shared/helpers/hooks";
import styles from "./index.module.scss";

const Slot = ({ children, variant, onClick }) => {
  const classNames = useClassNames([
    styles.Slot,
    variant && styles[`Slot--${variant}`],
  ]);

  return (
    <div role="button" tabIndex={0} className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};

Slot.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Slot;

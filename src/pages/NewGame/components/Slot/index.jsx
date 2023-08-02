import PropTypes from "prop-types";
import { useClassNames } from "@/shared/helpers/hooks";
import styles from "./index.module.scss";
import { memo } from "react";

const Slot = memo(({ children, className, variant, onClick }) => {
  const classNames = useClassNames([
    styles.Slot,
    className,
    variant && styles[`Slot--${variant}`],
  ]);

  return (
    <div role="button" tabIndex={0} className={classNames} onClick={onClick}>
      {children}
    </div>
  );
});

Slot.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Slot.displayName = "Slot";

export default Slot;

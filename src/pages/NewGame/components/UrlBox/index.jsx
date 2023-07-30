import { useClassNames } from "@/shared/helpers/hooks";
import styles from "./index.module.scss";
import { useState } from "react";
import PropTypes from "prop-types";

const UrlBox = ({ url }) => {
  const [hasLinkBeenCopied, setHasLinkBeenCopied] = useState(false);

  const classNames = useClassNames([
    styles.UrlBox,
    hasLinkBeenCopied && styles["UrlBox--copied"],
  ]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setHasLinkBeenCopied(true);
  };

  return (
    <div className={classNames}>
      <input readOnly type="text" value={url} />
      <button onClick={handleCopyLink}>
        {hasLinkBeenCopied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
};

UrlBox.propTypes = {
  url: PropTypes.string.isRequired,
};

export default UrlBox;

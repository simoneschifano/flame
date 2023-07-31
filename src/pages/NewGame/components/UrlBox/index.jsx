import { useClassNames } from "@/shared/helpers/hooks";
import styles from "./index.module.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import { getRoomUrl } from "../../helpers/utilities";

const UrlBox = ({ roomId }) => {
  const [hasLinkBeenCopied, setHasLinkBeenCopied] = useState(false);

  const roomUrl = getRoomUrl(roomId);

  const classNames = useClassNames([
    styles.UrlBox,
    hasLinkBeenCopied && styles["UrlBox--copied"],
  ]);

  const handleCopyLink = () => {
    const finalString = `
Join my room in FLAME, let's challenge ourselves! 

Enter the PIN: ${roomId}
Or click on this link: ${roomUrl}`;

    navigator.clipboard.writeText(finalString);
    setHasLinkBeenCopied(true);
  };

  return (
    <div className={classNames}>
      <input readOnly type="text" value={roomUrl} />
      <button onClick={handleCopyLink}>
        {hasLinkBeenCopied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
};

UrlBox.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default UrlBox;

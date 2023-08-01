import { useClassNames } from "@/shared/helpers/hooks";
import styles from "./index.module.scss";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { getRoomUrl } from "@/shared/helpers/utilities";
import { getShareCopy } from "../../helpers/utilities";

const UrlBox = ({ roomId }) => {
  const [clicked, setClicked] = useState(false);

  const roomUrl = getRoomUrl(roomId);

  const classNames = useClassNames([
    styles.UrlBox,
    clicked && styles["UrlBox--copied"],
  ]);

  const deviceCanShare = navigator.share;

  const ctaCopy = useMemo(() => {
    if (deviceCanShare) return clicked ? "Shared!" : "Share link";
    return clicked ? "Copied!" : "Copy link";
  }, [clicked, deviceCanShare]);

  const handleShareLink = async () => {
    const shareCopy = getShareCopy(roomId);

    if (deviceCanShare) {
      try {
        await navigator
          .share({
            title: "Join my room in FLAME!",
            text: shareCopy,
            url: roomUrl,
          })
          .then(() => setClicked(true));
      } catch (error) {
        console.error(`Couldn't share link: ${error}`);
      }
      return;
    }

    navigator.clipboard.writeText(shareCopy);
    setClicked(true);
  };

  return (
    <div className={classNames}>
      <input readOnly type="text" value={roomUrl} />
      <button onClick={handleShareLink}>{ctaCopy}</button>
    </div>
  );
};

UrlBox.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default UrlBox;

import PropTypes from "prop-types";
import { createNewRoom } from "@/pages/NewGame/helpers/api";
import { getRoomUrl } from "@/pages/NewGame/helpers/utilities";
import UrlBox from "../UrlBox";
import styles from "./index.module.scss";
import { useState } from "react";
import Button from "@/shared/components/Button";

const CreateNewRoom = ({ newRoomId, handleCreation }) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleCreateNewRoom = async () => {
    setIsCreatingRoom(true);
    const roomId = await createNewRoom();
    setIsCreatingRoom(false);
    handleCreation(roomId);
  };

  return (
    <div className={styles.CreateNewRoom}>
      {newRoomId ? (
        <>
          <h4>Your room has been created</h4>
          <h4>
            Share the code with your friends or send this link to start playing!
          </h4>
          <h4>⬇️</h4>
          <h4>PIN: {newRoomId}</h4>
          <UrlBox url={getRoomUrl(newRoomId)} />
        </>
      ) : (
        <Button
          onClick={handleCreateNewRoom}
          className={styles["CreateNewRoom-cta"]}
          isLoading={isCreatingRoom}
        >
          Create new room!
        </Button>
      )}
    </div>
  );
};

CreateNewRoom.propTypes = {
  newRoomId: PropTypes.string,
  handleCreation: PropTypes.func,
};

export default CreateNewRoom;

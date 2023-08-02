import PropTypes from "prop-types";
import { createNewRoom } from "@/pages/NewGame/helpers/api";
import arrow from "@/assets/svg/arrow-back--white.svg";
import UrlBox from "../UrlBox";
import styles from "./index.module.scss";
import { useState } from "react";
import Button from "@/shared/components/Button";
import { useClassNames } from "@/shared/helpers/hooks";
import { useNavigate } from "react-router-dom";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";

const CreateNewRoom = ({ newRoomId, handleCreation }) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const classNames = useClassNames([
    styles.CreateNewRoom,
    newRoomId && styles["CreateNewRoom--created"],
  ]);

  const navigate = useNavigate();

  const handleCreateNewRoom = async () => {
    setIsCreatingRoom(true);
    const roomId = await createNewRoom();
    setIsCreatingRoom(false);
    handleCreation(roomId);
  };

  const handleStartPlaying = () =>
    navigate({
      pathname: "../" + NEW_GAME_ROUTES.CHOOSE_ROOM,
      search: "?roomId=" + newRoomId,
    });

  return (
    <div className={classNames}>
      {newRoomId ? (
        <>
          <h1>🎉</h1>
          <h4>
            Share the code with your friends or send the link to start playing!
          </h4>
          <img src={arrow} alt="" />
          <h1>{newRoomId}</h1>
          <UrlBox roomId={newRoomId} />
          <Button
            style={{ backgroundColor: "#fff" }}
            onClick={handleStartPlaying}
          >
            Start playing now!
          </Button>
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

import styles from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useGameContext } from "@/pages/NewGame/helpers/hooks";
import Loader from "@/shared/components/Loader";
import CreateNewRoom from "../CreateNewRoom";
import { useNavigate } from "react-router-dom";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import { useRoomId } from "@/shared/helpers/hooks";
import useSound from "use-sound";
import boopSfx from "@/assets/sounds/boop.mp3";
import { getStoredMuted } from "@/shared/helpers/storage";

const { CHOOSE_USERNAME } = NEW_GAME_ROUTES;

const RoomSelection = () => {
  const [newRoomId, setNewRoomId] = useState(null);

  const [playSound] = useSound(boopSfx, { volume: 0.2 });

  const navigate = useNavigate();

  const { initRoom } = useGameContext();

  const handleJoin = useCallback(
    (room) => {
      initRoom(room);
      navigate("../" + CHOOSE_USERNAME);
    },
    [initRoom, navigate]
  );

  const { isLoadingRoomFromUrl, RoomIdInput } = useRoomId(handleJoin);

  useEffect(() => {
    !getStoredMuted() && !isLoadingRoomFromUrl && playSound();
  }, [isLoadingRoomFromUrl, playSound]);

  return isLoadingRoomFromUrl ? (
    <Loader isContainerWide />
  ) : (
    <section className={styles.RoomSelection}>
      {!newRoomId && (
        <>
          <RoomIdInput />
          <div className={styles["RoomSelection-divider"]}>
            <div />
            <span>OR</span>
            <div />
          </div>
        </>
      )}

      <CreateNewRoom
        newRoomId={newRoomId}
        handleCreation={(id) => setNewRoomId(id)}
      />
    </section>
  );
};

export default RoomSelection;

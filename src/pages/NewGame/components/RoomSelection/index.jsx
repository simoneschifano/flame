import RoomIdInput from "../RoomIdInput";
import styles from "./index.module.scss";
import { useState } from "react";
import { useRoomIdInUrl } from "@/pages/NewGame/helpers/hooks";
import Loader from "@/shared/components/Loader";
import CreateNewRoom from "../CreateNewRoom";

const RoomSelection = () => {
  const [newRoomId, setNewRoomId] = useState(null);

  const { isLoadingRoomFromUrl } = useRoomIdInUrl();

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

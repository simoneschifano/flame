import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";
import { ROUTES } from "@/shared/helpers/constants";
import logo from "@/assets/brand/logo-word.svg";
import RoomIdInput from "../../shared/components/RoomIdInput";
import { useCallback, useState } from "react";
import { useRoomIdInUrl } from "@/shared/helpers/hooks";
import Loader from "@/shared/components/Loader";

const Leaderboard = () => {
  const [roomData, setRoomData] = useState(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams?.get("userId");

  const navigate = useNavigate();

  console.log(roomData);
  console.log(userId);

  const handleRoomFromUrl = useCallback((room) => {
    setRoomData(room);
  }, []);

  const { isLoadingRoomFromUrl } = useRoomIdInUrl(handleRoomFromUrl);

  return (
    <div className={styles.Leaderboard}>
      <header className={styles["Leaderboard-header"]}>
        <img src={logo} onClick={() => navigate(ROUTES.LANDING)} alt="" />
      </header>
      {isLoadingRoomFromUrl ? (
        <Loader isContainerWide takesRemainingHeight />
      ) : (
        <section className={styles["Leaderboard-content"]}>
          {!roomData ? (
            <RoomIdInput handleSuccess={(room) => setRoomData(room)} />
          ) : (
            <span>room</span>
          )}
        </section>
      )}
    </div>
  );
};

export default Leaderboard;

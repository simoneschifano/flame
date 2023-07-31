import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";
import { AVATARS, ROUTES } from "@/shared/helpers/constants";
import logo from "@/assets/brand/logo-word.svg";
import RoomIdInput from "../../shared/components/RoomIdInput";
import { useCallback, useState } from "react";
import { useRoomIdInUrl } from "@/shared/helpers/hooks";
import Loader from "@/shared/components/Loader";
import Button from "@/shared/components/Button";
import { getMedalFromIndex } from "../NewGame/helpers/utilities";

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

  const sortedUsers =
    roomData?.users?.sort((a, b) => b.highestScore - a.highestScore) || [];

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
            <div className={styles["Leaderboard-container"]}>
              <h4>👑 Leaderboard 👑</h4>
              {sortedUsers.map((user, index) => (
                <div className={styles["Leaderboard-users"]} key={user.id}>
                  <img src={AVATARS?.[user.avatarId]} alt="" />
                  <div> {user.username}</div>

                  <div>
                    {" "}
                    {getMedalFromIndex(index)}
                    {user.highestScore || "🦖?!"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      <Button onClick={() => navigate(ROUTES.NEW_GAME)}>Play again!</Button>
    </div>
  );
};

export default Leaderboard;

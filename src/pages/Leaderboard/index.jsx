import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";
import { AVATARS, ROUTES } from "@/shared/helpers/constants";
import logo from "@/assets/brand/logo-word.svg";
import { useCallback, useState } from "react";
import { useRoomId } from "@/shared/helpers/hooks";
import Loader from "@/shared/components/Loader";
import Button from "@/shared/components/Button";
import { getMedalFromIndex, getSortedUsers } from "./helpers/utilities";
import { getCleanedUpClassNames, getRoomUrl } from "@/shared/helpers/utilities";

const Leaderboard = () => {
  const [roomData, setRoomData] = useState(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams?.get("userId");

  const navigate = useNavigate();

  const sortedUsers = getSortedUsers(roomData?.users);
  console.log(roomData);
  console.log(userId);

  const handleRoomFromUrl = useCallback((room) => setRoomData(room), []);

  const { isLoadingRoomFromUrl, RoomIdInput } = useRoomId(handleRoomFromUrl);

  return (
    <div className={styles.Leaderboard}>
      <header className={styles["Leaderboard-header"]}>
        <img src={logo} onClick={() => navigate(ROUTES.LANDING)} alt="" />
      </header>
      {isLoadingRoomFromUrl ? (
        <Loader isContainerWide containerHeight={300} />
      ) : (
        <section className={styles["Leaderboard-content"]}>
          {!roomData ? (
            <RoomIdInput />
          ) : (
            <>
              <div className={styles["Leaderboard-content-leader"]}>
                <h2>{sortedUsers?.[0].username} is leading! 🔥</h2>
                <img src={AVATARS[sortedUsers?.[0].avatarId]} alt="" />
              </div>
              <div className={styles["Leaderboard-content-usersList"]}>
                <h4>👑 Leaderboard 👑</h4>
                {sortedUsers?.map((user, index) => (
                  <div
                    className={getCleanedUpClassNames([
                      styles["Leaderboard-content-usersListItem"],
                      user.id === userId &&
                        styles[
                          "Leaderboard-content-usersListItem--highlighted"
                        ],
                    ])}
                    key={user.id}
                  >
                    <img src={AVATARS[user.avatarId]} alt="" />
                    <span>{user.username}</span>
                    <span>
                      {getMedalFromIndex(index)}
                      {user.highestScore || "🦖?!"}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => (location.href = getRoomUrl(roomData?.id))}
              >
                Play again!
              </Button>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default Leaderboard;

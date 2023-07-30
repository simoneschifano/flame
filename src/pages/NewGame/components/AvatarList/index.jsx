import { AVATARS } from "@/shared/helpers/constants";
import styles from "./index.module.scss";
import { useGameContext } from "@/pages/NewGame/helpers/hooks";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";

const AvatarList = () => {
  const { gameState, updateUser } = useGameContext();
  const selectedAvatarId = gameState.userData?.avatarId;

  return (
    <section className={styles.AvatarList}>
      {Object.values(AVATARS).map((avatarSrc, index) => (
        <img
          key={avatarSrc}
          src={avatarSrc}
          className={getCleanedUpClassNames([
            styles["AvatarList-avatar"],
            selectedAvatarId === index && styles["AvatarList-avatar--selected"],
          ])}
          onClick={() =>
            index !== selectedAvatarId && updateUser("avatarId", index)
          }
        />
      ))}
      <a href="https://www.freepik.com/free-vector/set-people-avatars-isolated-round-icons-faces_28590618.htm#query=avatar&position=38&from_view=keyword&track=sph">
        Credits for the avatars design to upklyak on Freepik
      </a>
    </section>
  );
};

export default AvatarList;

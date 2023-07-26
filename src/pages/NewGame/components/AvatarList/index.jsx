import { AVATARS } from "@/shared/helpers/constants";
import styles from "./index.module.scss";
import { useGameContext } from "../../helpers/hooks";
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
    </section>
  );
};

export default AvatarList;

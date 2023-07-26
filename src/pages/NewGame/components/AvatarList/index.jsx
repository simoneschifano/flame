import { AVATARS } from "@/shared/helpers/constants";
import styles from "./index.module.scss";
import { useGameContext } from "../../helpers/hooks";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";

const AvatarList = () => {
  const { gameState, updateAvatarId } = useGameContext();
  const selectedAvatarId = gameState.userData?.avatarId;

  const handleAvatarSelection = (index) =>
    index !== selectedAvatarId && updateAvatarId(index);

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
          onClick={() => handleAvatarSelection(index)}
        />
      ))}
    </section>
  );
};

export default AvatarList;

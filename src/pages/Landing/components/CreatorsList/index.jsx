import { CREATORS } from "@/pages/Landing/helpers/constants";
import styles from "./index.module.scss";

const CreatorList = () => {
  return (
    <div className={styles.CreatorsList}>
      {CREATORS.map(
        ({ username, name, profileImage, linkedInUrl, githubUrl }) => (
          <div key={username} className={styles["CreatorsList-creator"]}>
            <h4>{username}</h4>
            <span>{name}</span>
            <img src={profileImage} alt={username} width={110} height={110} />
            <div className={styles["CreatorsList-creatorLinks"]}>
              <a href={githubUrl}>🥷 GitHub</a>
              <a href={linkedInUrl}>🔗 LinkedIn</a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CreatorList;

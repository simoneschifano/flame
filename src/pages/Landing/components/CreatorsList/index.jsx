import { CREATORS } from "@/pages/Landing/helpers/constants";
import styles from "./index.module.scss";

const CreatorList = () => {
  return (
    <div className={styles.CreatorsList}>
      {CREATORS.map(
        ({ username, name, profileImage, linkedInUrl, githubUrl }) => (
          <div key={username} className={styles["CreatorsList-creator"]}>
            <h4>{username}</h4>
            <h6>{name}</h6>
            <img src={profileImage} alt="photo"></img>
            <div className={styles["CreatorsList-creatorLinks"]}>
              <a href={linkedInUrl}>🔗 LinkedIn</a>
              <a href={githubUrl}>🥷 GitHub</a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CreatorList;

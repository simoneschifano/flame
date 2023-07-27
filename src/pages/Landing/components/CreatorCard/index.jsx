import styles from "../CreatorCard/index.module.scss"

const CreatorCard = ({ data }) => {
    return (

        <div className={styles.CreatorCard}>
            <h3>{data.name}</h3>
            <img src={data.profileImage} alt="photo"></img>
            <div className={styles["CreatorCard-links"]}>
                <a href={data.linkedInUrl}>LinkedIn</a>
                <a href={data.githubUrl}>GitHub</a>
            </div>
        </div>
    );
};
export default CreatorCard


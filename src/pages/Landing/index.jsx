import styles from "../Landing/index.module.scss";
import logo from "../../assets/brand/logo-word.png";

const Landing = () => {
  return (
    <main className={styles.Landing}>
      <header className={styles["Landing-header"]}>
        <img className={styles["Landing-logo"]} src={logo} alt="logo-word" />
        <ul className={styles["Landing-infos"]}>
          <li>About us</li>
          <li>🏆</li>
        </ul>
      </header>
      <p className={styles["Landing-instructions"]}>
        <h2>The clock is ticking ⏰</h2>
        Challenge your knowledge in this quiz game where time is essential! The
        faster you choose the answer, higher your time bonus will be. There are
        dozens of question categories and three levels of difficult. Keep track
        of your results and your best scores! Challenge yourself to achieve the
        highest score!
      </p>
      <button className={styles.newGameButton}>New Game</button>
    </main>
  );
};

export default Landing;

import styles from "../Landing/index.module.scss";
import logo from "@/assets/brand/logo-word.png";
import arrow from "@/assets/svg/arrow-back--white.svg";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import Button from "@/shared/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/helpers/constants";
import Timer from "../NewGame/components/Timer";
import CreatorList from "./components/CreatorsList";
import { CREATORS } from "./helpers/constants";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.Landing}>
      <header className={styles["Landing-header"]}>
        <img className={styles["Landing-logo"]} src={logo} alt="logo-word" />
        <Link to={ROUTES.LEADERBOARD}>
          <img src={arrowBlack} alt="" />
          Leaderboard 🏆
        </Link>
      </header>
      <div className={styles["Landing-hero"]}>
        <Timer onExpire={() => { }} />
        <h1>Ready to win? ⏰</h1>
        <p>
          Immerse yourself in our thrilling quiz game, where quick thinking
          brings you to the top. With diverse question categories and three
          difficulty levels, the challenge is on! Track your progress and aim
          for the top score to become the ultimate quiz champion.
        </p>
      </div>
      <Button onClick={() => navigate(ROUTES.NEW_GAME)}>Play now</Button>
      <article className={styles["Landing-aboutUs"]}>
        <section className={styles["Landing-aboutUs-content"]}>
          <div className={styles["Landing-aboutUs-contentHero"]}>
            <h1>About us</h1>
            <img src={arrow} alt="" />
          </div>
          <div className={styles["Landing-aboutUs-contentItem"]}>
            <h2>The Scoring Algorithm</h2>
            <p>
              We were inspired by Kahoot and developed our own scoring
              algorithm, drawing from their successful model. When a user
              encounters a question, a chronometer starts running in the
              background, precisely measuring the time taken in milliseconds to
              provide an answer. This time measurement is crucial for
              determining the user&apos;s points for each question and,
              ultimately, for the entire game.
            </p>
            <p>
              Additionally, we wanted to introduce an exciting twist to the
              scoring system: the difficulty multiplier. By incorporating this
              feature, the score is influenced by the level of challenge the
              user opts for during the game. The more difficult the questions
              they choose to tackle, the higher the potential score they can
              achieve.
            </p>
            <p>
              Our aim is to create an engaging and dynamic gaming experience,
              where users can put their knowledge to the test while being
              rewarded for both accuracy and quick thinking. By combining
              elements from Kahoot&apos;s approach and our own innovations, we
              believe our scoring algorithm will make the gameplay even more
              enjoyable and competitive.
            </p>
          </div>
          <div className={styles["Landing-aboutUs-contentItem"]}>
            <h2>The Project&apos;s Idea</h2>
            <p>
              For our final project, we enthusiastically selected an idea that
              blended excitement with a worthy challenge. After careful
              consideration, we settled on utilizing the{" "}
              <strong>Trivia API</strong>, finding it to be the perfect fit for
              this endeavor. Our goal was to craft a user-friendly app that
              would captivate and entertain users through a sleek, minimalist
              design.
            </p>
          </div>
          <div>
            <CreatorList creators={CREATORS} />
          </div>
        </section>
      </article>
    </main>
  );
};

export default Landing;

import styles from "../Landing/index.module.scss";
import logo from "@/assets/brand/logo-word.png";
import arrow from "@/assets/svg/arrow-back--white.svg";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import Button from "@/shared/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/helpers/constants";
import Timer from "../NewGame/components/Timer";
import CreatorList from "./components/CreatorsList";

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
        <Timer onExpire={() => {}} />
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
          <div className={styles["Landing-aboutUs-contentItem"]}>
            <h2>The Team</h2>
            <p>
              Our application&apos;s logo and name were born from a unique
              combination of our team members&apos; first initials, along with
              the common bond that unites us: Edgemony, the bootcamp that
              challenged us to create this project.
            </p>
            <p>
              Thus, FLAME was formed, representing the first letters of our
              names: Francesco Imperiale, Lorenzo Fraterrigo Garofalo, Andrea
              Paracino, Marina Valenza, and Edgemony itself. FLAME is not just
              any quiz!
            </p>
            <p>
              The name perfectly complements the game&apos;s dynamics,
              highlighting the significance of the scoring logic, which
              we&apos;ll discuss shortly. It also reflects our shared influences
              and a touch of experimental style.
            </p>
            <p>
              FLAME is all about engaging and stimulating the mind. We drew
              inspiration from the knowledge and skills we gained at
              Edgemony&apos;s bootcamp, which fueled our excitement to embark on
              this project. Our collective experience shaped our approach to
              create a quiz that challenges users while keeping the experience
              enjoyable.
            </p>
            <p>
              The FLAME logo symbolizes the unity and knowledge-seeking passion
              of our team. The fusion of our initials signifies not only
              collaboration but also the blending of diverse ideas and
              perspectives we bring to the table. Our goal is to spark curiosity
              and intellect in our users, making their quiz journey an
              enlightening and entertaining adventure.
            </p>
          </div>
          <div className={styles["Landing-aboutUs-contentItem"]}>
            <h2>Our ✨Flames✨</h2>
            <CreatorList />
          </div>
        </section>
      </article>
    </main>
  );
};

export default Landing;

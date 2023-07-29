import styles from "../Landing/index.module.scss";
import logo from "@/assets/brand/logo-word.png";
import arrow from "@/assets/svg/arrow-back--white.svg";
import arrowBlack from "@/assets/svg/arrow-back.svg";
import Button from "@/shared/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/helpers/constants";
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
        <svg
          className={styles["Landing-heroBlob"]}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          id="blobSvg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(155, 205, 210)" }}
              ></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient)">
            <animate
              attributeName="d"
              dur="10000ms"
              repeatCount="indefinite"
              values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"
            ></animate>
          </path>
        </svg>
        <img className={styles["Landing-heroLogo"]} src={logo} alt="" />
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
              consideration, we settled on utilizing the Trivia API, finding it
              to be the perfect fit for this endeavor. Our goal was to craft a
              user-friendly app that would captivate and entertain users through
              a sleek, minimalist design.
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

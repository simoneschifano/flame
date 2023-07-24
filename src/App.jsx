import reactLogo from "./assets/react.svg";
import { AVATARS } from "./helpers/constants";
import styles from "./App.module.scss";

function App() {
  return (
    <main className={styles.App}>
      <div>
        <img src={AVATARS[1]} className={styles["App-logo"]} alt="Vite logo" />
        <img src={reactLogo} className={styles["App-logo"]} alt="React logo" />
      </div>
    </main>
  );
}

export default App;

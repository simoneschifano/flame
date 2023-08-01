import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import styles from "./index.module.scss";
import AvatarList from "../AvatarList";
import UsersAutocomplete from "../UsersAutocomplete";

const UserInit = () => {
  const { gameState, initUser } = useGameContext();
  const username = gameState.userData?.username || "";
  const usersList = gameState.roomData?.users;

  useRedirectCheck();
  return (
    <section className={styles.UserInit}>
      <h3>Choose your username & avatar</h3>
      <UsersAutocomplete users={usersList} handleUserChange={initUser} />
      {gameState.userData && (
        <>
          <h3>Welcome {username}!</h3>
          <AvatarList />
        </>
      )}
    </section>
  );
};

export default UserInit;

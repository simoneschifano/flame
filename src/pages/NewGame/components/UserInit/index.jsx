import {
  useGameContext,
  useRedirectCheck,
} from "@/pages/NewGame/helpers/hooks";
import styles from "./index.module.scss";
import CreatableSelect from "react-select/creatable";
import AvatarList from "../AvatarList";
import {
  generateUser,
  getAvatarFromUserId,
} from "@/pages/NewGame/helpers/utilities";

const UserInit = () => {
  const { gameState, initUser } = useGameContext();
  const username = gameState.userData?.username || "";
  const usersList = gameState.roomData?.users;

  const selectOptions = usersList?.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const handleSelectExistingUser = (selectedOption) =>
    initUser(
      usersList?.find((user) => user.id === selectedOption?.value) || null
    );

  const getOptionLabel = ({ label, value }) => (
    <div className={styles["UserInit-selectOption"]}>
      {label}
      <img src={getAvatarFromUserId(usersList, value)} alt="" />
    </div>
  );

  useRedirectCheck();

  return (
    <section className={styles.UserInit}>
      <h3>Choose your username & avatar</h3>
      {!usersList?.length && (
        <p>(Looks like you&apos;re the first one here 👀)</p>
      )}
      <CreatableSelect
        className={styles["UserInit-select"]}
        autoFocus={true}
        options={selectOptions}
        isClearable
        onChange={handleSelectExistingUser}
        onCreateOption={(newUsername) => initUser(generateUser(newUsername))}
        name="username"
        value={{ label: username, value: username }}
        getOptionLabel={getOptionLabel}
      />
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

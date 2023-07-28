import { useState, useEffect } from "react";
import { useGameContext } from "../../helpers/hooks";
import { getUsers } from "@/shared/helpers/api";
import Loader from "@/shared/components/Loader";
import styles from "./index.module.scss";
import CreatableSelect from "react-select/creatable";
import AvatarList from "../AvatarList";
import {
  generateUser,
  getAvatarFromUserId,
} from "@/pages/NewGame/helpers/utilities";

const UserInit = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { gameState, initUser } = useGameContext();
  const username = gameState.userData?.username || "";

  const selectOptions = usersList.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const handleSelectExistingUser = (selectedOption) =>
    initUser(
      usersList.find((user) => user.id === selectedOption?.value) || null
    );

  const getOptionLabel = ({ label, value }) => (
    <div className={styles["UserInit-selectOption"]}>
      {label}
      <img src={getAvatarFromUserId(usersList, value)} alt="" />
    </div>
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsersList(users);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return isLoading ? (
    <Loader isContainerWide containerHeight={100} />
  ) : (
    <section className={styles.UserInit}>
      <h3>Choose your username & avatar</h3>
      <CreatableSelect
        className={styles["UserInit-select"]}
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

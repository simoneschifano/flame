import { useRef } from "react";
import styles from "./index.module.scss";
import { AVATARS } from "@/shared/helpers/constants";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";
import crossIcon from "@/assets/svg/cross.svg";
import { useClassNames, useClickOutside } from "@/shared/helpers/hooks";
import PropTypes from "prop-types";
import { useUsersAutocomplete } from "../../helpers/hooks";

const UsersAutocomplete = ({ users, handleUserChange }) => {
  const {
    username,
    shouldShowDropdown,
    setShouldShowDropdown,
    targetOptionIndex,
    invalid,
    filteredUsers,
    shouldShowIsFirst,
    shouldShowCreateNew,
    handleKeyDown,
    handleClickOutside,
    handleValueChange,
    handleUserSelection,
    handleClear,
    handleCreateNew,
  } = useUsersAutocomplete(users, handleUserChange);

  const autocompleteRef = useRef(null);

  const classNames = useClassNames([
    styles.UsersAutocomplete,
    shouldShowDropdown && styles["UsersAutocomplete--showDropdown"],
    invalid && styles["UsersAutocomplete--invalid"],
  ]);

  useClickOutside(autocompleteRef, handleClickOutside);

  return (
    <div className={classNames} ref={autocompleteRef}>
      <input
        type="text"
        maxLength={20}
        autoComplete="off"
        onChange={handleValueChange}
        value={username}
        className={styles["UsersAutocomplete-input"]}
        autoFocus
        onFocus={() => setShouldShowDropdown(true)}
        onKeyDown={handleKeyDown}
      />
      <img
        role="button"
        className={styles["UsersAutocomplete-clear"]}
        src={crossIcon}
        alt=""
        onClick={handleClear}
      />
      {invalid && (
        <div className={styles["UsersAutocomplete-tooltip"]}>
          The username should not contain any space
        </div>
      )}
      {shouldShowDropdown && (
        <div className={styles["UsersAutocomplete-dropdown"]}>
          {filteredUsers?.map((user, index) => (
            <div
              onClick={() => handleUserSelection(user)}
              key={user.id}
              className={getCleanedUpClassNames([
                styles["UsersAutocomplete-dropdownItem"],
                targetOptionIndex === index &&
                  styles["UsersAutocomplete-dropdownItem--target"],
              ])}
            >
              <span>{user.username}</span>
              <img src={AVATARS[user.avatarId]} alt="" />
            </div>
          ))}
          {shouldShowIsFirst && (
            <span className={styles["UsersAutocomplete-dropdown-noUsers"]}>
              Looks like you&apos;re the first one here 👀 <br />
              <strong>Start typing to create a new user!</strong>
            </span>
          )}
          {shouldShowCreateNew && (
            <div
              className={styles["UsersAutocomplete-dropdown-newOption"]}
              onClick={handleCreateNew}
            >
              <span>
                Create new user <strong>&quot;{username}&quot;</strong>
              </span>
              {username && <span>{username.length}/20</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

UsersAutocomplete.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      avatarId: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
  handleUserChange: PropTypes.func.isRequired,
};

export default UsersAutocomplete;

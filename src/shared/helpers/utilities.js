import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import { ROUTES } from "./constants";

export const getCleanedUpClassNames = (classNames) =>
  classNames.filter(Boolean).join(" ").trim();

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const upsertById = (array, newPayload) => {
  const id = newPayload.id;
  const existingIndex = array?.findIndex((obj) => obj.id === id);

  if (existingIndex !== -1) array[existingIndex] = newPayload;
  else array = [...array, newPayload];

  return array;
};

export const getRoomUrl = (id) =>
  `${window.location.origin.toString()}${ROUTES.NEW_GAME}/${
    NEW_GAME_ROUTES.CHOOSE_ROOM
  }?roomId=${id}`;

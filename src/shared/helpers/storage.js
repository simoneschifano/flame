import { LOCAL_STORAGE_KEYS } from "./constants";

export const setStoredMuted = (muted) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.MUTED, muted);
};

export const getStoredMuted = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.MUTED) === "true";
};

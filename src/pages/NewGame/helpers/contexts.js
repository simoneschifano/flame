import { createContext } from "react";
import { INITIAL_GAME_STATE } from "./constants";

export const GameContext = createContext({
  state: INITIAL_GAME_STATE,
  dispatch: () => {},
});

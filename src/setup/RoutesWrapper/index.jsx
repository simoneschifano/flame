import Landing from "@/pages/Landing";
import { ROUTES } from "@/shared/helpers/constants";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const NewGame = lazy(() => import("@/pages/NewGame"));
const RoomSelection = lazy(() =>
  import("@/pages/NewGame/components/RoomSelection")
);
const UserInit = lazy(() => import("@/pages/NewGame/components/UserInit"));
const DifficultySelection = lazy(() =>
  import("@/pages/NewGame/components/DifficultySelection")
);
const Quiz = lazy(() => import("@/pages/NewGame/components/Quiz"));
const Results = lazy(() => import("@/pages/NewGame/components/Results"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));

const { LANDING, NEW_GAME, LEADERBOARD } = ROUTES;
const { CHOOSE_ROOM, CHOOSE_USERNAME, CHOOSE_DIFFICULTY, QUIZ, RESULTS } =
  NEW_GAME_ROUTES;

const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path={LANDING} element={<Landing />} />
      <Route path={NEW_GAME} element={<NewGame />}>
        <Route path={CHOOSE_ROOM} element={<RoomSelection />} />
        <Route path={CHOOSE_USERNAME} element={<UserInit />} />
        <Route path={CHOOSE_DIFFICULTY} element={<DifficultySelection />} />
        <Route path={QUIZ} element={<Quiz />} />
        <Route path={RESULTS} element={<Results />} />
        <Route index element={<Navigate to={CHOOSE_ROOM} replace />} />
        <Route path="*" element={<Navigate to={CHOOSE_ROOM} replace />} />
      </Route>
      <Route path={LEADERBOARD} element={<Leaderboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesWrapper;

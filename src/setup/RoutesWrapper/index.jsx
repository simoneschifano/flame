import Landing from "@/pages/Landing";
import NewGame from "@/pages/NewGame";
import { ROUTES } from "@/shared/helpers/constants";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import { Navigate, Route, Routes } from "react-router-dom";
import Quiz from "@/pages/NewGame/components/Quiz";
import UserInit from "@/pages/NewGame/components/UserInit";
import DifficultySelection from "@/pages/NewGame/components/DifficultySelection";
import RoomSelection from "@/pages/NewGame/components/RoomSelection";
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
        <Route path={RESULTS} element={<div />} />
        <Route index element={<Navigate to={CHOOSE_ROOM} replace />} />
        <Route path="*" element={<Navigate to={CHOOSE_ROOM} replace />} />
      </Route>
      <Route path={LEADERBOARD} element={<NewGame />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesWrapper;

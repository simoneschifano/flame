import Landing from "@/pages/Landing";
import { ROUTES } from "@/shared/helpers/constants";
import { NEW_GAME_ROUTES } from "@/pages/NewGame/helpers/constants";
import { Navigate, Route, Routes } from "react-router-dom";
import NewGame from "@/pages/NewGame";
import RoomSelection from "@/pages/NewGame/components/RoomSelection";
import UserInit from "@/pages/NewGame/components/UserInit";
import DifficultySelection from "@/pages/NewGame/components/DifficultySelection";
import Quiz from "@/pages/NewGame/components/Quiz";
import Results from "@/pages/NewGame/components/Results";
import Leaderboard from "@/pages/Leaderboard";

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

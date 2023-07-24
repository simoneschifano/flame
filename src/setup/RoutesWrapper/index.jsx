import Landing from "@/pages/Landing";
import NewGame from "@/pages/NewGame";
import { Navigate, Route, Routes } from "react-router-dom";

const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/new-game" element={<NewGame />}></Route>

      <Route path="/leaderboard" element={<NewGame />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesWrapper;

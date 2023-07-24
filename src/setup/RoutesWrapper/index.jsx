import Landing from "@/pages/Landing";
import NewGame from "@/pages/NewGame";
import { Navigate, Route, Routes } from "react-router-dom";

const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/new-game" element={<NewGame />}>
        <Route path="choose-username" element={<div />} />
        <Route path="choose-difficulty" element={<div />} />
        <Route path="quiz" element={<div />} />
        <Route path="results" element={<div />} />
        <Route
          index
          element={<Navigate to={"/new-game/choose-username"} replace />}
        />
        {/* <Route path="*" element={<Navigate to={"choose-username"} replace />} /> */}
      </Route>

      <Route path="/leaderboard" element={<NewGame />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesWrapper;

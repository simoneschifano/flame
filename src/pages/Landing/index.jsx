import { getUsers, addUser } from "@/shared/helpers/api";
import Timer from "../NewGame/components/Timer";

const Landing = () => {
  return (
    <div>
      <button onClick={() => console.log(getUsers)}>test</button>
      <button onClick={() => console.log(addUser)}>add</button>
      <Timer onExpire={() => console.log("expired")} />
    </div>
  );
};

export default Landing;

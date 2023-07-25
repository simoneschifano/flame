import { getUsers, addUser } from "@/shared/helpers/api";
import { getRandomQuestions } from "../NewGame/helpers/utilities";
import Timer from "../NewGame/components/Timer";

const Landing = () => {
  return (
    <div>
      <button
        onClick={async () => {
          const questions = await getRandomQuestions("easy");
          console.log(questions);
        }}
      >
        get questions
      </button>
      <button
        onClick={async () => {
          const users = await getUsers();
          console.log(users);
        }}
      >
        get users
      </button>
      <button
        onClick={async () => {
          const user = await addUser("test2", 10);
          console.log(user);
        }}
      >
        add
      </button>
      <Timer onExpire={() => console.log("expired")} />
    </div>
  );
};

export default Landing;

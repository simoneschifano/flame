import { useState } from "react";
import { decodeHtml } from "../../helpers/utilities";
import Answer from "../Answer";
import styles from "./index.module.scss";

const test = {
  category: "Entertainment: Books",
  type: "multiple",
  difficulty: "easy",
  question:
    "What is the name of the three headed dog in Harry Potter and the Sorcerer&#039;s Stone?",
  answers: [
    {
      id: 1,
      isCorrect: true,
      text: "Fluffy",
    },
    {
      id: 2,
      isCorrect: false,
      text: "Spike",
    },
    {
      id: 3,
      isCorrect: false,
      text: "Poofy",
    },
    {
      id: 4,
      isCorrect: false,
      text: "Spot",
    },
  ],
  isValidated: false,
  isAnswered: false,
  id: "373a8d49-f372-4457-8b81-9f490701e058",
};

const Quiz = () => {
  // const { gameState } = useGameContext();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [test1, setTest1] = useState(false);
  //   const isAnswered =
  //     gameState.questions[gameState.currentQuestionIndex].isAnswered;

  const getVariant = (answer) => {
    if (answer.id === selectedAnswer?.id && !test1) return "selected";

    if (!test1) return null;

    if (answer.id === selectedAnswer?.id && !selectedAnswer?.isCorrect)
      return "wrong";
    if (answer.isCorrect) return "correct";

    return null;
  };

  return (
    <section className={styles.Quiz}>
      {test.answers.map((answer) => (
        <Answer
          key={answer.id}
          variant={getVariant(answer)}
          onClick={() => setSelectedAnswer(answer)}
        >
          {decodeHtml(answer.text)}
        </Answer>
      ))}
      <button onClick={() => setTest1(true)}>test</button>
    </section>
  );
};

export default Quiz;

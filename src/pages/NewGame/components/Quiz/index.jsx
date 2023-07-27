import { useCallback, useEffect, useRef, useState } from "react";
import { decodeHtml, getRandomQuestions } from "../../helpers/utilities";
import Slot from "../Slot";
import styles from "./index.module.scss";
import { useGameContext } from "../../helpers/hooks";
import Loader from "@/shared/components/Loader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/helpers/constants";
import ProgressBar from "../ProgressBar";

const Quiz = () => {
  const { gameState, initQuestions } = useGameContext();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dataFetchedRef = useRef(false);

  const navigate = useNavigate();

  const { userData, questions, currentQuestionIndex } = gameState;

  const currentQuestion = questions?.[currentQuestionIndex];
  const shouldShowCorrection = currentQuestion?.shouldShowCorrection;

  const fetchQuestions = useCallback(async () => {
    const results = await getRandomQuestions(userData?.preferredDifficulty);
    initQuestions(results);
    setIsLoading(false);
  }, [userData?.preferredDifficulty, initQuestions]);

  const getVariant = (answer) => {
    if (answer.id === selectedAnswer?.id && !shouldShowCorrection)
      return "selected";

    if (!shouldShowCorrection) return null;

    if (answer.id === selectedAnswer?.id && !selectedAnswer?.isCorrect)
      return "wrong";
    if (answer.isCorrect) return "correct";

    return null;
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion?.id]);

  if (!userData?.preferredDifficulty) navigate(ROUTES.NEW_GAME);
  return isLoading ? (
    <Loader isContainerWide containerHeight={100} />
  ) : (
    <section className={styles.Quiz}>
      <ProgressBar />
      <h3>{decodeHtml(currentQuestion?.question)}</h3>
      {currentQuestion?.answers.map((answer) => (
        <Slot
          key={answer.id}
          variant={getVariant(answer)}
          onClick={() => setSelectedAnswer(answer)}
        >
          {decodeHtml(answer.text)}
        </Slot>
      ))}
    </section>
  );
};

export default Quiz;

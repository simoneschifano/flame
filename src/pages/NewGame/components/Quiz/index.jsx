import { useCallback } from "react";
import { decodeHtml } from "@/pages/NewGame/helpers/utilities";
import Slot from "../Slot";
import styles from "./index.module.scss";
import {
  useGameContext,
  useRedirectCheck,
  useRetrieveQuestions,
  useScoringLogic,
} from "@/pages/NewGame/helpers/hooks";
import Loader from "@/shared/components/Loader";
import ProgressBar from "../ProgressBar";
import Timer from "../Timer";

const Quiz = () => {
  const { currentQuestion, updateQuestionState } = useGameContext();
  const shouldShowCorrection = currentQuestion?.shouldShowCorrection;

  const isLoading = useRetrieveQuestions();
  const { selectedAnswer, setSelectedAnswer } = useScoringLogic();

  const isSelectedCorrect = selectedAnswer?.isCorrect;
  const selectedAnswerId = selectedAnswer?.id;

  const handleTimerExpiration = useCallback(() => {
    updateQuestionState({
      shouldShowCorrection: true,
      score: 0,
    });
  }, [updateQuestionState]);

  const getAnswerDisplayVariant = useCallback(
    ({ id, isCorrect }) => {
      if (id === selectedAnswerId && !shouldShowCorrection) return "selected";

      if (!shouldShowCorrection) return null;

      if (id === selectedAnswerId && !isSelectedCorrect) return "wrong";
      if (isCorrect) return "correct";

      return null;
    },
    [selectedAnswerId, isSelectedCorrect, shouldShowCorrection]
  );

  useRedirectCheck();

  return isLoading ? (
    <Loader isContainerWide containerHeight={100} />
  ) : (
    <section className={styles.Quiz}>
      <Timer
        shouldStop={shouldShowCorrection}
        onExpire={handleTimerExpiration}
      />
      <ProgressBar />
      <h4>{decodeHtml(currentQuestion?.question)}</h4>
      {currentQuestion?.answers.map((answer) => (
        <Slot
          key={answer.id}
          variant={getAnswerDisplayVariant(answer)}
          onClick={() => setSelectedAnswer(answer)}
        >
          {decodeHtml(answer.text)}
        </Slot>
      ))}
    </section>
  );
};

export default Quiz;

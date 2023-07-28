import { useCallback } from "react";
import { decodeHtml } from "../../helpers/utilities";
import Slot from "../Slot";
import styles from "./index.module.scss";
import {
  useGameContext,
  useRetrieveQuestions,
  useScoringLogic,
} from "../../helpers/hooks";
import Loader from "@/shared/components/Loader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/helpers/constants";
import ProgressBar from "../ProgressBar";
import Timer from "../Timer";

const Quiz = () => {
  const { gameState, currentQuestion } = useGameContext();
  const shouldShowCorrection = currentQuestion?.shouldShowCorrection;

  const navigate = useNavigate();

  const isLoading = useRetrieveQuestions();
  const { selectedAnswer, setSelectedAnswer, handleTimerExpiration } =
    useScoringLogic();

  const isSelectedCorrect = selectedAnswer?.isCorrect;
  const selectedAnswerId = selectedAnswer?.id;

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

  if (!gameState.userData?.preferredDifficulty) navigate(ROUTES.NEW_GAME);
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

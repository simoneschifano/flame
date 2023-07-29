import PropTypes from "prop-types";
import { useState, useEffect, useRef, useCallback } from "react";
import { TIMER_DURATION } from "@/pages/NewGame/helpers/constants";
import styles from "./index.module.scss";
import stopwatchIcon from "@/assets/svg/stopwatch.svg";
import { useGameContext } from "@/pages/NewGame/helpers/hooks";
import { getCleanedUpClassNames } from "@/shared/helpers/utilities";

const Timer = ({ shouldStop, onExpire }) => {
  const [seconds, setSeconds] = useState(TIMER_DURATION);
  const timerRef = useRef(null);

  const { currentQuestion } = useGameContext();

  const initTimerInterval = useCallback(() => {
    setSeconds(TIMER_DURATION);
    const intervalId = setInterval(
      () =>
        setSeconds((prevSeconds) => Math.round((prevSeconds - 0.1) * 10) / 10),
      100
    );
    timerRef.current = intervalId;
  }, []);

  useEffect(() => {
    initTimerInterval();

    return () => clearInterval(timerRef.current);
  }, [currentQuestion?.id, initTimerInterval]);

  useEffect(() => {
    if (seconds > 0) return;

    onExpire();
    clearInterval(timerRef.current);
  }, [onExpire, seconds]);

  useEffect(() => {
    if (shouldStop) clearInterval(timerRef.current);
  }, [shouldStop]);

  return (
    <div
      className={getCleanedUpClassNames([
        styles.Timer,
        (!seconds || shouldStop) && styles["Timer--stop"],
      ])}
    >
      <img src={stopwatchIcon} alt="" />
      <span>{seconds.toString().length < 3 ? `${seconds}.0` : seconds}s</span>
    </div>
  );
};

Timer.propTypes = {
  shouldStop: PropTypes.bool.isRequired,
  onExpire: PropTypes.func.isRequired,
};

export default Timer;

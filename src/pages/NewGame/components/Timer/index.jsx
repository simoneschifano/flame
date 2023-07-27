import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { TIMER_DURATION } from "../../helpers/constants";
import styles from "./index.module.scss";
import stopwatchIcon from "@/assets/svg/stopwatch.svg";

const Timer = ({ onExpire }) => {
  const [seconds, setSeconds] = useState(TIMER_DURATION);
  const timerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setSeconds((prevSeconds) => Math.round((prevSeconds - 0.1) * 10) / 10),
      100
    );
    timerRef.current = intervalId;

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds > 0) return;

    onExpire();
    clearInterval(timerRef.current);
  }, [onExpire, seconds]);

  return (
    <div className={styles.Timer}>
      <img src={stopwatchIcon} alt="" />
      <span>
        {seconds > 0
          ? seconds.toString().length < 3
            ? `${seconds}.0`
            : seconds
          : "0.0"}
        s
      </span>
    </div>
  );
};

Timer.propTypes = {
  onExpire: PropTypes.func.isRequired,
};

export default Timer;

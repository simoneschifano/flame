import { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Button from "@/shared/components/Button";
import { useClassNames } from "@/shared/helpers/hooks";
import { getRoomById } from "@/shared/helpers/api";

const RoomIdInput = ({ handleSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);

  const inputsRefs = useRef([]);

  const isValid = digits.every(Boolean);
  const finalDigits = digits.join("");

  const classNames = useClassNames([
    styles.RoomIdInput,
    isValid && styles["RoomIdInput--valid"],
    isError && styles["RoomIdInput--error"],
  ]);

  const disabledCtaMessage = !isValid
    ? "Enter the 6-digits room PIN to continue"
    : "";

  const handleJoin = async () => {
    setIsLoading(true);
    const room = await getRoomById(finalDigits);
    setIsLoading(false);
    if (!room) {
      setIsError(true);
      return;
    }

    handleSuccess(room);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Backspace": {
        event.preventDefault();

        if (event.ctrlKey || event.metaKey) {
          setDigits(Array(6).fill(""));
          inputsRefs[0].focus();
          return;
        }

        const newDigits = [...digits];
        const targetHasValue = !!newDigits[currentDigitIndex];

        newDigits[currentDigitIndex] = "";
        setDigits(newDigits);

        if (currentDigitIndex === 0 || targetHasValue) return;
        setCurrentDigitIndex(currentDigitIndex - 1);
        inputsRefs[currentDigitIndex - 1].focus();
        break;
      }

      case "Enter":
        event.preventDefault();
        if (!isValid) return;
        handleJoin();
        break;

      case "ArrowLeft": {
        event.preventDefault();
        if (currentDigitIndex === 0) return;
        setCurrentDigitIndex(currentDigitIndex - 1);
        inputsRefs[currentDigitIndex - 1].focus();
        break;
      }

      case "ArrowRight": {
        event.preventDefault();
        if (currentDigitIndex === digits.length - 1) return;
        setCurrentDigitIndex(currentDigitIndex + 1);
        inputsRefs[currentDigitIndex + 1].focus();
        break;
      }

      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (value.trim().length === 6) {
      setDigits(value.trim().split(""));
      inputsRefs[5].focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[currentDigitIndex] = value[value.length - 1];
    setDigits(newDigits);

    if (currentDigitIndex === digits.length - 1) return;
    setCurrentDigitIndex(currentDigitIndex + 1);
    inputsRefs[currentDigitIndex + 1].focus();
  };

  return (
    <section className={classNames}>
      <h4 className={styles["RoomIdInput-title"]}>
        {isError
          ? "No room found with given identifier. Please try again"
          : "Enter room PIN"}
      </h4>
      <div className={styles["RoomIdInput-inputBox"]}>
        {digits.map((digit, index) => (
          <Fragment key={index}>
            <input
              tabIndex={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              ref={(ref) => (inputsRefs[index] = ref)}
              autoFocus={index === 0}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                isError && setIsError(false);
                setCurrentDigitIndex(index);
              }}
            />
            {index === 2 && <span>-</span>}
          </Fragment>
        ))}
      </div>
      <Button
        className={styles["RoomIdInput-cta"]}
        disabledMessage={disabledCtaMessage}
        onClick={handleJoin}
        isLoading={isLoading}
      >
        Join
      </Button>
    </section>
  );
};

RoomIdInput.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
};

export default RoomIdInput;

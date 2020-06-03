import React, { useState, useCallback, useEffect } from "react";
import "./Counter.css";
import NumberSquares from "../NumberSquares";
import MathSigns from "../MathSigns";
import StepDigits from "../StepDigits";
import CheckMark from "../CheckMark";

export const Counter = () => {
  const [counterRandom, setCounterRandom] = useState(0);
  const [digit1, setDigit1] = useState(0);
  const [digit10, setDigit10] = useState(0);
  const [digit100, setDigit100] = useState(0);
  const [digit1000, setDigit1000] = useState(0);
  const [equalNrs, setEqualNrs] = useState(false);

  const getCounterRandom = useCallback(() => {
    setCounterRandom(Math.floor(Math.random() * 10000));
  }, []);

  useEffect(() => {
    getCounterRandom();
  }, [getCounterRandom]);

  const checkEqualNrs = useCallback(() => {
    if (
      counterRandom ===
      digit1000 * 1000 + digit100 * 100 + digit10 * 10 + digit1
    ) {
      setEqualNrs(true);
    } else {
      setEqualNrs(false);
    }
  }, [counterRandom, digit1000, digit100, digit10, digit1]);

  useEffect(() => {
    checkEqualNrs();
  }, [checkEqualNrs]);

  const handleStepDigit = useCallback((operator, setDigit, digit) => {
    if (operator === "+") {
      digit < 9 ? setDigit(digit + 1) : setDigit(0);
    }
    if (operator === "-") {
      digit > 0 ? setDigit(digit - 1) : setDigit(9);
    }
  }, []);

  return (
    <div className="counter">
      <NumberSquares className={"randomSquare"}>{counterRandom}</NumberSquares>
      <MathSigns>=</MathSigns>
      <NumberSquares
        className={"counterSquare"}
        newColor={equalNrs && "green"}
        onChange={checkEqualNrs}
      >
        {digit1000}
      </NumberSquares>
      <NumberSquares
        className={"counterSquare"}
        newColor={equalNrs && "green"}
        onChange={checkEqualNrs}
      >
        {digit100}
      </NumberSquares>
      <NumberSquares
        className={"counterSquare"}
        newColor={equalNrs && "green"}
        onChange={checkEqualNrs}
      >
        {digit10}
      </NumberSquares>
      <NumberSquares
        className={"counterSquare"}
        newColor={equalNrs && "green"}
        onChange={checkEqualNrs}
      >
        {digit1}
      </NumberSquares>
      <CheckMark>{equalNrs && "✅"}</CheckMark>
      <div className="stepdigitboard">
        <StepDigits
          onClickMinus={() => {
            handleStepDigit("-", setDigit1000, digit1000);
          }}
          onClickPlus={() => {
            handleStepDigit("+", setDigit1000, digit1000);
          }}
          disabled={equalNrs && true}
        >
          1000
        </StepDigits>
        <StepDigits
          onClickMinus={() => {
            handleStepDigit("-", setDigit100, digit100);
          }}
          onClickPlus={() => {
            handleStepDigit("+", setDigit100, digit100);
          }}
          disabled={equalNrs && true}
        >
          100
        </StepDigits>
        <StepDigits
          onClickMinus={() => {
            handleStepDigit("-", setDigit10, digit10);
          }}
          onClickPlus={() => {
            handleStepDigit("+", setDigit10, digit10);
          }}
          disabled={equalNrs && true}
        >
          10
        </StepDigits>
        <StepDigits
          onClickMinus={() => {
            handleStepDigit("-", setDigit1, digit1);
          }}
          onClickPlus={() => {
            handleStepDigit("+", setDigit1, digit1);
          }}
          disabled={equalNrs && true}
        >
          1
        </StepDigits>
      </div>
    </div>
  );
};

export default Counter;

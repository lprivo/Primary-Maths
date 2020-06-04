import React, { useState, useCallback, useEffect } from "react";
import "./Counter.css";
import NumberSquares from "../NumberSquares";
import MathSigns from "../MathSigns";
import StepDigits from "../StepDigits";
import CheckMark from "../CheckMark";
import SetUp from "../SetUp";
import GameButtons from "../GameButtons";

export const Counter = () => {
  const [exeAmount, setExeAmount] = useState(0);
  const [Completed, setCompleted] = useState(0);
  const [countTotal, setCountTotal] = useState(1);
  const [counterRandom, setCounterRandom] = useState();
  const [answer, setAnswer] = useState(0);
  const [digits, setDigits] = useState([]);
  const [equalNrs, setEqualNrs] = useState(false);

  const getCounterRandom = useCallback(() => {
    setCounterRandom(Math.floor(Math.random() * 10000));
    setDigits(["0", "0", "0", "0"]);
  }, []);

  useEffect(() => {
    getCounterRandom();
  }, [getCounterRandom]);

  const checkEqualNrs = useCallback(() => {
    if (counterRandom === answer) {
      setEqualNrs(true);
      setCompleted(Completed + 1);
    } else {
      setEqualNrs(false);
    }
  }, [counterRandom, answer, Completed]);

  const handleClick = useCallback(
    (operator, number) => {
      operator ? setAnswer(answer + number) : setAnswer(answer - number);
    },
    [answer]
  );

  const leadingZeros = (number) => {
    let zeros = "";
    for (let i = `${number}`.length; i < 4; i++) {
      zeros += "0";
    }
    return zeros + `${number}`;
  };

  const convertToString = useCallback(() => {
    const answerLZ = leadingZeros(answer);
    setDigits([
      `${answerLZ}`[0],
      `${answerLZ}`[1],
      `${answerLZ}`[2],
      `${answerLZ}`[3],
    ]);
  }, [answer]);

  useEffect(() => {
    checkEqualNrs();
    convertToString();
  }, [convertToString]);

  const handleNext = useCallback(() => {
    if (countTotal < exeAmount) {
      setCountTotal(countTotal + 1);
      setEqualNrs(false);
      getCounterRandom();
      setAnswer(0);
    }
  }, [exeAmount, countTotal, getCounterRandom]);

  const getExeAmount = useCallback((event) => {
    setExeAmount(event?.target?.value || 10);
  }, []);

  useEffect(() => {
    getExeAmount();
  }, [getExeAmount]);

  return (
    <div>
      <div className="counterboard">
        <SetUp eventHandler={getExeAmount}></SetUp>
        <div className="counterSquares">
          <NumberSquares className={"randomSquare"}>
            {counterRandom}
          </NumberSquares>
          <MathSigns>=</MathSigns>
          <NumberSquares
            className={"counterSquare"}
            newColor={equalNrs && "green"}
          >
            {digits[0]}
          </NumberSquares>
          <NumberSquares
            className={"counterSquare"}
            newColor={equalNrs && "green"}
          >
            {digits[1]}
          </NumberSquares>
          <NumberSquares
            className={"counterSquare"}
            newColor={equalNrs && "green"}
          >
            {digits[2]}
          </NumberSquares>
          <NumberSquares
            className={"counterSquare"}
            newColor={equalNrs && "green"}
          >
            {digits[3]}
          </NumberSquares>
          <CheckMark>{equalNrs && "✅"}</CheckMark>
          <GameButtons
            className={"gameButtons"}
            onClick={handleNext}
            disabled={exeAmount > countTotal ? false : true}
          >
            NEXT
          </GameButtons>
        </div>
        {!(Completed < exeAmount) && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Well Done - Completed!
          </p>
        )}
      </div>
      <div className="stepdigitboard">
        <StepDigits
          onClickMinus={() => {
            handleClick(false, 1000);
          }}
          onClickPlus={() => {
            handleClick(true, 1000);
          }}
          disabledMinus={(equalNrs || answer - 1000 < 0) && true}
          disabledPlus={(equalNrs || answer + 1000 > 9999) && true}
        >
          1000
        </StepDigits>
        <StepDigits
          onClickMinus={() => {
            handleClick(false, 100);
          }}
          onClickPlus={() => {
            handleClick(true, 100);
          }}
          disabledMinus={(equalNrs || answer - 100 < 0) && true}
          disabledPlus={(equalNrs || answer + 100 > 9999) && true}
        >
          100
        </StepDigits>
        <StepDigits
          onClickMinus={() => {
            handleClick(false, 10);
          }}
          onClickPlus={() => {
            handleClick(true, 10);
          }}
          disabledMinus={(equalNrs || answer - 10 < 0) && true}
          disabledPlus={(equalNrs || answer + 10 > 9999) && true}
        >
          10
        </StepDigits>
        <StepDigits
          onClickMinus={() => {
            handleClick(false, 1);
          }}
          onClickPlus={() => {
            handleClick(true, 1);
          }}
          disabledMinus={(equalNrs || answer - 1 < 0) && true}
          disabledPlus={(equalNrs || answer + 1 > 9999) && true}
        >
          1
        </StepDigits>
      </div>
    </div>
  );
};

export default Counter;

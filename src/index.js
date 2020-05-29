import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SetUp from "./SetUp";
import Exercise from "./Exercise";
import Stats from "./Stats";
import GameButtons from "./GameButtons";

const getOperator = () => {
  const operator = ["+", "-", "*"];
  return operator[Math.floor(Math.random() * operator.length)];
};

export const Game = () => {
  const [exeAmount, setExeAmount] = useState(0);
  const [countTotal, setCountTotal] = useState(1);
  const [randomNrs, setRandomNrs] = useState([]);
  const [mathOperator, setMathOperator] = useState();
  const [userInput, setUserInput] = useState("");
  const [inputChanged, setInputChanged] = useState(false);
  const [result, setResults] = useState();
  const [resultColor, setResultColor] = useState("black");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [countCorrectAnswer, setCountCorrectAswer] = useState(0);
  const [countWrongAnswer, setCountWrongAnswer] = useState(0);
  // const [autoFocus, setAutoFocus] = useState("resSq");
  // console.log("autoFocus: ", autoFocus);
  const nextRef = useRef(null);
  const inputRef = useRef(null);

  const getEquation = useCallback(() => {
    const operator = getOperator();
    setMathOperator(operator);
    if (operator === "+") {
      const randomN1 = Math.floor(Math.random() * 20) + 1;
      const randomN2 = Math.floor(Math.random() * 20) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 + randomN2);
    }
    if (operator === "-") {
      const randomN1 = Math.floor(Math.random() * 20) + 1;
      const randomN2 = Math.floor(Math.random() * 20) + 1;
      setRandomNrs([
        Math.max(randomN1, randomN2),
        Math.min(randomN1, randomN2),
      ]);
      setResults(Math.abs(randomN1 - randomN2));
    }
    if (operator === "*") {
      const randomN1 = Math.floor(Math.random() * 12) + 1;
      const randomN2 = Math.floor(Math.random() * 12) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 * randomN2);
    }
  }, []);

  const getInput = useCallback((event) => {
    setUserInput(event.target.value);
    setInputChanged(true);
    setCorrectAnswer(false);
    setResultColor("black");
  }, []);

  const handleNext = useCallback(() => {
    if (countTotal < exeAmount) {
      setCountTotal(countTotal + 1);
      getEquation();
      setUserInput("");
      setCorrectAnswer(false);
      setResultColor("black");
      inputRef.current.focus();
      // setAutoFocus("resSq");
    }
    return <div id="board" className="board-row"></div>;
  }, [exeAmount, countTotal, getEquation]);

  const handleCheck = useCallback(() => {
    if (userInput === `${result}`) {
      setCorrectAnswer(true);
      setResultColor("green");
      nextRef.current.focus();
      if (inputChanged) {
        setCountCorrectAswer(countCorrectAnswer + 1);
        setInputChanged(false);
        // setAutoFocus("next");
      }
    } else {
      setResultColor("red");
      if (inputChanged) {
        setCountWrongAnswer(countWrongAnswer + 1);
        setInputChanged(false);
        // setAutoFocus("next");
      }
    }
  }, [
    userInput,
    result,
    countCorrectAnswer,
    countWrongAnswer,
    inputChanged,
    nextRef,
  ]);

  const getExeAmount = useCallback((event) => {
    setExeAmount(event?.target?.value || 10);
  }, []);

  useEffect(() => {
    getExeAmount();
  }, [getExeAmount]);

  useEffect(() => {
    getEquation();
  }, [getEquation]);

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <SetUp eventHandler={getExeAmount}></SetUp>
          <div id="board" className="board-row">
            {/* css flexi boxes! */}
            <Exercise
              inputRef={inputRef}
              onChange={getInput}
              value={userInput}
              newColor={resultColor}
              onKeyPress={handleCheck}
              CheckMarkChild={correctAnswer}
              randomNrs1={randomNrs[0]}
              randomNrs2={randomNrs[1]}
              operator={mathOperator}
              // focus={autoFocus === "resSq" ? true : false}
            ></Exercise>
          </div>
        </div>
      </div>
      <div className="game-info">
        <GameButtons
          onClick={handleCheck}
          disabled={!inputChanged}
          // autoFocus={false}
        >
          CHECK
        </GameButtons>
        <GameButtons
          buttonRef={nextRef}
          onClick={handleNext}
          disabled={exeAmount > countTotal ? false : true}
          // autoFocus={autoFocus === "next" ? true : false}
          // focus={!inputChanged}
        >
          NEXT
        </GameButtons>
        {/* <button autoFocus={!inputChanged}>OK</button> */}
        <Stats
          total={countTotal}
          correct={countCorrectAnswer}
          wrong={countWrongAnswer}
        ></Stats>
        {exeAmount === countTotal && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Well Done - Completed!
          </p>
        )}
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

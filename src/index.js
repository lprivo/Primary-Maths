import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SetUp from "./SetUp";
import Exercise from "./Exercise";
import Stats from "./Stats";

const getOperator = () => {
  const operator = ["+", "-", "*"];
  return operator[Math.floor(Math.random() * operator.length)];
};

export const Game = () => {
  const [exeAmount, setExeAmount] = useState(0);
  // console.log("exeAmount: ", exeAmount);
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
  const [autoFocus, setAutoFocus] = useState(true);

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
      // setAutoFocus(true);
    } else {
      alert("Completed!");
    }
    return <div id="board" className="board-row"></div>;
  }, [exeAmount, countTotal, getEquation]);

  const handleCheck = useCallback(() => {
    if (userInput === `${result}`) {
      setCorrectAnswer(true);
      setResultColor("green");
      if (inputChanged) {
        setCountCorrectAswer(countCorrectAnswer + 1);
        setInputChanged(false);
      }
    } else {
      setResultColor("red");
      if (inputChanged) {
        setCountWrongAnswer(countWrongAnswer + 1);
        setInputChanged(false);
      }
    }
  }, [userInput, result, countCorrectAnswer, countWrongAnswer, inputChanged]);

  const getExeAmount = useCallback((event) => {
    setExeAmount(event?.target?.value || 1);
    // handleNext(event);
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
          <div>
            <table id="board" className="board-row">
              <Exercise
                onChange={getInput}
                value={userInput}
                newColor={resultColor}
                CheckMarkChild={correctAnswer}
                randomNrs1={randomNrs[0]}
                randomNrs2={randomNrs[1]}
                operator={mathOperator}
                focus={autoFocus}
              ></Exercise>
            </table>
          </div>
        </div>
      </div>
      <div className="game-info">
        <button
          className="gameButtons"
          type="submit"
          onClick={() => handleCheck()}
        >
          CHECK
        </button>
        <button className="gameButtons" onClick={() => handleNext()}>
          NEXT
        </button>
        <Stats
          total={countTotal}
          correct={countCorrectAnswer}
          wrong={countWrongAnswer}
        ></Stats>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

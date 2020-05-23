import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SetUp from "./SetUp";
import Exercise from "./Exercise";

const getOperator = () => {
  const operator = ["+", "-", "*"];
  return operator[Math.floor(Math.random() * operator.length)];
};

export const Game = () => {
  const [exeAmount, setExeAmount] = useState(0);
  console.log("exeAmount: ", exeAmount);
  const [count, setCount] = useState(1);
  const [countCorrect, setCountCorrect] = useState(0);
  const [countWrong, setCountWrong] = useState(0);
  const [randomNrs, setRandomNrs] = useState([]);
  const [mathOperator, setMathOperator] = useState();
  const [userInput, setUserInput] = useState("");
  const [result, setResults] = useState();
  const [resultColor, setResultColor] = useState("black");
  const [correctAnswer, setCorrectAnswer] = useState(false);
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
    setCorrectAnswer(false);
    setResultColor("black");
  }, []);

  const handleNext = useCallback(() => {
    setCount(count + 1);
    getEquation();
    setUserInput("");
    setCorrectAnswer(false);
    setResultColor("black");
    setAutoFocus(true);
    return <div id="board" className="board-row"></div>;
  }, [count, getEquation]);

  const handleCheck = useCallback(() => {
    if (userInput === `${result}`) {
      setCorrectAnswer(true);
      setResultColor("green");
      setCountCorrect(countCorrect + 1);
    } else {
      setResultColor("red");
      setCountWrong(countWrong + 1);
    }
  }, [userInput, result, countCorrect, countWrong]);

  const getExeAmount = useCallback(() => {
    const eA = document.getElementById("selectAmount").value;
    // console.log("eA: ", eA);
    setExeAmount(eA);
  }, []);

  useEffect(() => {
    getEquation();
    getExeAmount();
  }, [getEquation, getExeAmount]);

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <SetUp onClick={getExeAmount}></SetUp>
          <div id="board" className="board-row">
            <Exercise
              e={getInput}
              value={userInput}
              value2={resultColor}
              value3={correctAnswer}
              randomNrs1={randomNrs[0]}
              randomNrs2={randomNrs[1]}
              operator={mathOperator}
              focus={autoFocus}
            ></Exercise>
            {/* {() => {
              for (let i = 0; i < exeAmount; i++) {
                console.log("i: ", i);
                return (
                  <Exercise
                    e={getInput}
                    value={userInput}
                    value2={resultColor}
                    value3={correctAnswer}
                    randomNrs1={randomNrs[0]}
                    randomNrs2={randomNrs[1]}
                    operator={mathOperator}
                  ></Exercise>
                );
              }
            }} */}
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
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

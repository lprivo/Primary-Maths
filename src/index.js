import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";
import CheckMark from "./CheckMark";

const getOperator = () => {
  const operator = ["+", "-", "*"];
  return operator[Math.floor(Math.random() * operator.length)];
};

export const Game = () => {
  const [count, setCount] = useState(1);
  const [randomNrs, setRandomNrs] = useState([]);
  const [mathOperator, setMathOperator] = useState();
  const [userInput, setUserInput] = useState("");
  const [result, setResults] = useState();
  const [resultColor, setResultColor] = useState("black");
  const [correctAnswer, setCorrectAnswer] = useState(false);

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

  useEffect(() => {
    getEquation();
  }, [getEquation]);

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
    return <div id="board" className="board-row"></div>;
  }, [count, getEquation]);

  const handleCheck = useCallback(() => {
    if (userInput === `${result}`) {
      setCorrectAnswer(true);
      setResultColor("green");
    } else {
      setResultColor("red");
    }
  }, [userInput, result]);

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div id="board" className="board-row">
            <NumberSquares>{randomNrs[0]}</NumberSquares>
            <MathSigns>{mathOperator}</MathSigns>
            <NumberSquares>{randomNrs[1]}</NumberSquares>
            <MathSigns>=</MathSigns>
            <ResultSquare
              onChange={getInput}
              value={userInput}
              newColor={resultColor}
            />
            <CheckMark>{correctAnswer && "✅"}</CheckMark>
          </div>
        </div>
      </div>
      <div className="game-info">
        <button id="checkButton" type="submit" onClick={() => handleCheck()}>
          CHECK
        </button>
        <button onClick={() => handleNext()}>NEXT</button>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

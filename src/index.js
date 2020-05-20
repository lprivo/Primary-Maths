import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";
import CheckMark from "./CheckMark";

const getOperator = () => {
  const operator = ["+", "-"];
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

  const getRandomNr = useCallback(() => {
    const randomN1 = Math.floor(Math.random() * 20) + 1;
    console.log("randomN1: ", randomN1);
    const randomN2 = Math.floor(Math.random() * 20) + 1;
    console.log("randomN2: ", randomN2);
    const operator = getOperator();
    setMathOperator(operator);
    if (operator === "+") {
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 + randomN2);
    }
    if (operator === "-") {
      setRandomNrs([
        Math.max(randomN1, randomN2),
        Math.min(randomN1, randomN2),
      ]);
      setResults(Math.abs(randomN1 - randomN2));
    }
  }, []);

  useEffect(() => {
    getRandomNr();
  }, [getRandomNr]);

  const getInput = useCallback((event) => {
    setUserInput(event.target.value);
    setCorrectAnswer(false);
    setResultColor("black");
  }, []);

  const handleNext = useCallback(() => {
    setCount(count + 1);
    getRandomNr();
    setUserInput(""); // Why doesn't it also clear the input field?
    setCorrectAnswer(false);
    setResultColor("black");
    return <div id="board" className="board-row"></div>;
  }, [count, getRandomNr]);

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
            {/* &#9989; "✔"  */}
          </div>
        </div>
      </div>
      <div className="game-info">
        <button onClick={() => handleNext()}>NEXT</button>
        <button onClick={() => handleCheck()}>CHECK</button>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

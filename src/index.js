import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";

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
    const randomN2 = Math.floor(Math.random() * 20) + 1;
    const operator = getOperator();
    setMathOperator(operator);
    setRandomNrs([randomN1, randomN2]);
    if (operator === "+") {
      setResults(randomN1 + randomN2);
    }
    if (operator === "-") {
      setResults(randomN1 - randomN2);
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
    setUserInput("");
    setCorrectAnswer(false);
    setResultColor("black");
    return <div className="game-board"></div>;
  }, [count, getRandomNr]);

  const handleCheck = useCallback(() => {
    if (userInput === `${result}`) {
      setCorrectAnswer(true);
      setResultColor("green");
    }
  }, [userInput, result]);

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div id="board" className="board-row">
            <NumberSquares value={randomNrs[0]}></NumberSquares>
            <MathSigns>{mathOperator}</MathSigns>
            <NumberSquares value={randomNrs[1]}></NumberSquares>
            <MathSigns>=</MathSigns>
            <ResultSquare
              onChange={getInput}
              value={userInput}
              newColor={resultColor}
            />
          </div>
        </div>
      </div>
      <div className="game-info">
        <button onClick={() => handleNext()}>NEXT</button>
        <button onClick={() => handleCheck()}>CHECK</button>
        {correctAnswer && (
          <span role="img" aria-label="Correct Answer">
            &#9989;
          </span>
        )}
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

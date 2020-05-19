import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";
// import Exercise from "./Exercise";

const getOperator = () => {
  const operator = ["+", "-"];
  return operator[Math.floor(Math.random() * operator.length)];
};

export const Game = () => {
  const [count, setCount] = useState(1);
  console.log(`count= ${count}`);
  const [randomNrs, setRandomNrs] = useState([]);
  console.log(`randomNrs= ${randomNrs[0]} ${randomNrs[1]}`);
  const [mathOperator, setMathOperator] = useState();
  console.log(`operator= ${mathOperator}`);
  const [userInput, setUserInput] = useState("");
  console.log(`userInput= ${userInput}`);
  const [result, setResults] = useState();
  console.log("results: ", result);
  const [resultColor, setResultColor] = useState("black");
  console.log("resultColor: ", resultColor);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  console.log("correctAnswer: ", correctAnswer);

  const getRandomNr = useCallback(() => {
    const randomN1 = Math.floor(Math.random() * 20) + 1;
    const randomN2 = Math.floor(Math.random() * 20) + 1;
    // console.log(`getRandomNr= ${randomN1} ${randomN2}`);
    const operator = getOperator();
    setMathOperator(operator);
    setRandomNrs([randomN1, randomN2]);
    if (operator === "+") {
      setResults(randomN1 + randomN2);
      console.log("randomNrs[0] + randomNrs[1]: ", randomN1 + randomN2);
    }
    if (operator === "-") {
      setResults(randomN1 - randomN2);
      console.log("randomNrs[0] - randomNrs[1]: ", randomN1 - randomN2);
    }
    // return {
    //   randomN1: randomNrs[0],
    //   randomN2: randomNrs[1],
    //   operator: operator,
    // };
  }, []);

  useEffect(() => {
    getRandomNr();
  }, [getRandomNr]); //if I include dependencies both here "getRandomNr" and "randomNrs" in getRandomNr() => infinite loop!!!

  const getInput = useCallback((event) => {
    setUserInput(event.target.value);
    console.log("event.target.value: ", event.target.value);
    setCorrectAnswer(false);
    setResultColor("black");
  }, []);

  const handleNext = useCallback(() => {
    setCount(count + 1);
    getRandomNr();
    setUserInput("");
    setCorrectAnswer(false);
    setResultColor("black");
    // console.log("userInput: ", userInput);
    // return <div id="board" className="board-row"></div>;
    return <div className="game-board"></div>;
  }, [count, getRandomNr]);

  const handleCheck = useCallback(() => {
    console.log("CHECK button pushed");
    console.log("userInput: ", userInput);
    console.log("result: ", result);
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
            {/* <Exercise numbersAndOperation={getRandomNr()}></Exercise> */}
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

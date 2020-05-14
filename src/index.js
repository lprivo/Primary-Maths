import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";

export const Game = () => {
  const [count, setCount] = useState(1);
  console.log(`count= ${count}`);
  const [mathOperator, setOperator] = useState();
  console.log(`operator= ${mathOperator}`);
  const [userInput, setInput] = useState();
  console.log(`input= ${userInput}`);

  const getRandomNr = () => {
    const randomNr = Math.floor(Math.random() * 20) + 1;
    return randomNr;
  };

  // = entryAlt[Math.floor(Math.random() * entryAlt.length)];
  const getOperator = () => {
    const mathOps = ["+", "-"];

    setOperator(mathOps[Math.floor(Math.random() * mathOps.length)]);
  };

  const getInput = (input) => {
    // setInput(input.target.value);  // I found this in a forum too - probably old React again??
    console.log(userInput);
  };

  const handleResult = () => {
    let result;
    // const result = document.getElementById("ResultSquare").value;
    console.log("result");
    return result;
  };

  const handleNext = () => {
    const NextPushed = () => {
      setCount(count + 1);
    };
    NextPushed();
    return (
      <div id="board" className="board-row">
        <NumberSquares value={getRandomNr()}></NumberSquares>
        <MathSigns value={getOperator()}></MathSigns>
        <NumberSquares value={getRandomNr()}></NumberSquares>
        <MathSigns value="="></MathSigns>
        {/* {gameResultSquare()} */}
        <ResultSquare onChange={getInput()} />
      </div>
    );
  };

  const handleCheck = () => {
    console.log("CHECK button pushed");
  };

  // renderNrSquare(i) {
  //   return (
  //     <NumberSquares
  //       value={this.getRandomNr()}
  //     />
  //   );
  // }

  // const gameResultSquare = () => {
  //   return <ResultSquare onChange={getInput()} />;
  // };

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div id="board" className="board-row">
            <NumberSquares value={getRandomNr()}></NumberSquares>
            {/* <MathSigns value={getOperator()}></MathSigns>*/}{" "}
            {/* Try switching these MathSighs around */}
            <MathSigns value={mathOperator}></MathSigns>{" "}
            <NumberSquares value={getRandomNr()}></NumberSquares>
            <MathSigns value="="></MathSigns>
            {/* {gameResultSquare()} */}
            <ResultSquare onChange={getInput()} />
          </div>
        </div>
      </div>
      <div className="game-info">
        {/* <button onClick={(Board.squares = () => this.handleClick())}>
            NEXT
          </button> */}
        <button onClick={() => handleNext()}>NEXT</button>
        <button onClick={() => handleCheck()}>CHECK</button>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";

export const Game = () => {
  const [count, setCount] = useState(1);

  const getRandomNr = () => {
    const randomNr = Math.floor(Math.random() * 20) + 1;
    return randomNr;
  };

  // = entryAlt[Math.floor(Math.random() * entryAlt.length)];
  const getOperator = () => {
    const mathOps = ["+", "-", "*", "/"];

    return mathOps[Math.floor(Math.random() * mathOps.length)];
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
    console.log("NEXT button pushed");
    // return <NumberSquares value={this.getRandomNr()}></NumberSquares>;
    return (
      <div>
        <button onClick={NextPushed}>Ez is next</button>
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
  const input = (input) => {
    //stub - nem tudom mi jon ide
    console.log(input);
  };

  const gameResultSquare = () => {
    return <ResultSquare onChange={input} />;
  };

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div className="board-row">
            {/* {this.renderNrSquare(0)} */}
            <NumberSquares value={getRandomNr()}></NumberSquares>
            <MathSigns value={getOperator()}></MathSigns>
            {/* {this.renderNrSquare(1)} */}
            <NumberSquares value={getRandomNr()}></NumberSquares>
            <MathSigns value="="></MathSigns>
            {gameResultSquare()}
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

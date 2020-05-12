import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";

class Game extends React.Component {
  getRandomNr() {
    const randomNr = Math.floor(Math.random() * 20) + 1;
    return randomNr;
  }

  // = entryAlt[Math.floor(Math.random() * entryAlt.length)];
  getOperator() {
    const mathOps = ["+", "-", "*", "/"];

    return mathOps[Math.floor(Math.random() * mathOps.length)];
  }

  handleResult() {
    let result;
    // const result = document.getElementById("ResultSquare").value;
    console.log("result");
    return result;
  }

  handleNext() {
    const [count, setCount] = useState(1);
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
  }

  handleCheck() {
    console.log("CHECK button pushed");
  }

  // renderNrSquare(i) {
  //   return (
  //     <NumberSquares
  //       value={this.getRandomNr()}
  //     />
  //   );
  // }

  gameResultSquare() {
    return <ResultSquare onChange={this.input} />;
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div>
            <div className="board-row">
              {/* {this.renderNrSquare(0)} */}
              <NumberSquares value={this.getRandomNr()}></NumberSquares>
              <MathSigns value={this.getOperator()}></MathSigns>
              {/* {this.renderNrSquare(1)} */}
              <NumberSquares value={this.getRandomNr()}></NumberSquares>
              <MathSigns value="="></MathSigns>
              {this.gameResultSquare()}
            </div>
          </div>
        </div>
        <div className="game-info">
          {/* <button onClick={(Board.squares = () => this.handleClick())}>
            NEXT
          </button> */}
          <button onClick={() => this.handleNext()}>NEXT</button>
          <button onClick={() => this.handleCheck()}>CHECK</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

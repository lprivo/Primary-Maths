import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import "./NumberSquares/NumberSquare.css"; // you suggested a shorter import format for this?
import ResultSquare from "./ResultSquares";
import "./ResultSquares/ResultSquare.css";
import MathSigns from "./MathSigns";
import "./MathSigns/MathSigns.css";

class Game extends React.Component {
  getRandomNr() {
    const randomNr = Math.floor(Math.random() * 10) + 1;
    return randomNr;
  }

  handleResult() {
    let result;
    // const result = document.getElementById("ResultSquare").value;
    console.log("result");
    return result;
  }

  handleNext() {
    console.log("NEXT button pushed");
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

  renderResultSquare() {
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
              <MathSigns value="+"></MathSigns>
              {/* {this.renderNrSquare(1)} */}
              <NumberSquares value={this.getRandomNr()}></NumberSquares>
              <MathSigns value="="></MathSigns>
              {this.renderResultSquare()}
            </div>
          </div>
        </div>
        <div className="game-info">
          {/* <button onClick={(Board.squares = () => this.handleClick())}>
            NEXT
          </button> */}
          <button onClick={() => this.getRandomNr()}>NEXT</button>
          <button onClick={() => this.handleCheck()}>CHECK</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

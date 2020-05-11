import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function NumberSquares(props) {
  return <button className="square">{props.value}</button>;
}
// answer input field
function ResultSquare(props) {
  return (
    <input
      type="text"
      className="resultSquare"
      value={props.value}
      onChange={props.onChange}
    />
  );
}

class Board extends React.Component {
  renderNrSquare(i) {
    return (
      <NumberSquares
        value={this.props.squares[i]}
        // onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderResultSquare() {
    return (
      <ResultSquare
        placeholder="??"
        value={this.props.result}
        onChange={this.props.input}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderNrSquare(0)}
          <div className="mathsSign">+</div>
          {this.renderNrSquare(1)}
          <div className="mathsSign">=</div>
          {this.renderResultSquare()}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // history:
    };
  }

  handleClick() {
    // let squares = this.squares;
    const aRandom = Math.floor(Math.random() * 10) + 1;
    const bRandom = Math.floor(Math.random() * 10) + 1;
    let squares = [aRandom, bRandom];
    // squares[(a, b)] = () => Math.floor(Math.random() * 10) + 1;
    return squares;
  }

  handleResult() {
    const result = "?";
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

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.handleClick()} result={this.handleResult()} />
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

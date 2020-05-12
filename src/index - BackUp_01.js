import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import "./NumberSquares/NumberSquare.css";
import ResultSquare from "./ResultSquares";
import "./ResultSquares/ResultSquare.css";
import MathSigns from "./MathSigns";
import "./MathSigns/MathSigns.css";

// function NumberSquares(props) {
//   return <button className="square">{props.value}</button>;
// }

// answer input field
// function ResultSquare(props) {
//   return (
//     <input
//       type="text"
//       className="resultSquare"
//       value={props.value}
//       onChange={props.onChange}
//     />
//   );
// }

// class Board extends React.Component {
//   renderNrSquare(i) {
//     return (
//       <NumberSquares
//         value={this.props.squares[i]}
//         // onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   renderResultSquare() {
//     return (
//       <ResultSquare
//         placeholder="??"
//         value={this.props.result}
//         onChange={this.props.input}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderNrSquare(0)}
//           <div className="mathsSign">+</div>
//           {this.renderNrSquare(1)}
//           <div className="mathsSign">=</div>
//           {this.renderResultSquare()}
//         </div>
//       </div>
//     );
//   }
// }

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // history:
    };
  }

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
          {/* <Board squares={this.handleClick()} result={this.handleResult()} /> */}
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

// checkNumber = (a, b)=>{
//   a

// }

// const setAValaszt = (ertek)=>{
//   setValasz(ertek);
// }
// const randmoiseNUmber=()=>{
//   //generate a ranonumber
//   const rand = 5;
//   setElsoSzam(rand);
// }
// const [elsoSzam, setElsoSzam]=useState(4);
// const [masodikSzam, setMasodikSzam]=useState(34);
// const [valasz, setValasz]=useState();
// <NumberSquare value={elsoSzam} />
// +
// <NumberSquare value={masodikSzam} />
// =
// <reusltComponent callback={setAValaszt}/>

// <buttom onClick=

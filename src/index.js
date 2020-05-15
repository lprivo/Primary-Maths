import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NumberSquares from "./NumberSquares";
import ResultSquare from "./ResultSquares";
import MathSigns from "./MathSigns";

export const Game = () => {
  const [count, setCount] = useState(1);
  console.log(`count= ${count}`);
  const [randomNrs, setRandomNrs] = useState();
  console.log(`randomNrs= ${randomNrs}`);
  const [mathOperator, setOperator] = useState();
  console.log(`operator= ${mathOperator}`);
  const [userInput, setInput] = useState();
  console.log(`input= ${userInput}`);

  const getRandomNr = () => {
    const randomNr = Math.floor(Math.random() * 20) + 1;
    let randomNrs = [];
    const pushRandomNr = () => {
      randomNrs.concat(randomNr);
    };
    pushRandomNr();
    for (let i = 0; i < randomNrs.length; i++) {
      console.log(`${randomNrs.length} ArrRandomNrs= ${randomNrs[i]}`);
    }
    // setRandomNrs(randomNrs); //Why does it see an infinite loop with this structure?
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

  // const handleResult = () => {
  //   let result;

  //   console.log("result");
  //   return result;
  // };

  const handleNext = () => {
    const NextPushed = () => {
      setCount(count + 1);
    };
    NextPushed();
    return (
      <div id="board" className="board-row">
        <NumberSquares id="nrSq1" value={getRandomNr()}></NumberSquares>
        <MathSigns id="mathOp1" value={getOperator()}></MathSigns>
        <NumberSquares id="nrSq2" value={getRandomNr()}></NumberSquares>
        <MathSigns value="="></MathSigns>
        {/* {gameResultSquare()} */}
        <ResultSquare onChange={getInput()} />
      </div>
    );
  };

  const handleCheck = (userInput) => {
    const nrSq1 = document.getElementById("nrSq1").value; // how do we get the value now?
    const nrSq2 = document.getElementById("nrSq2").value;
    const mathOp1 = document.getElementById("mathOp1").value;

    console.log("CHECK button pushed");

    // mathOp1 === "-" ? nrSq2 * -1 : nrSq2;  //how can I get mathOp1 into the equasion?
    if (mathOp1 === "-") {
      return -nrSq2;
    }
    if (userInput === nrSq1 + nrSq2) {
      alert("Well done!");
    } else {
      alert("Try again!");
    }
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
        <button onClick={() => handleNext()}>NEXT</button>
        <button onClick={() => handleCheck()}>CHECK</button>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

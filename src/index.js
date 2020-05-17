import React, { useState, useEffect } from "react";
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
    const randomN1 = Math.floor(Math.random() * 20) + 1;
    const randomN2 = Math.floor(Math.random() * 20) + 1;
    console.log(`getRandomNr= ${randomN1} ${randomN2}`);
    // setRandomNrs([randomN1, randomN2]);  // infinite loop
    return;
  };

  // useEffect(() => {  //causes infinite loop!
  //   getRandomNr();
  // });

  // getRandomNr(); //also causes infinite loop!

  // const getRandomNr = () => {
  //   const randomNr = Math.floor(Math.random() * 20) + 1;
  // let arrRandomNrs = [];
  // const pushRandomNr = () => {
  //   arrRandomNrs.push(randomNr);
  // };
  // pushRandomNr();
  // for (let i = 0; i < arrRandomNrs.length; i++) {
  //   console.log(`${arrRandomNrs.length} ArrRandomNrs= ${arrRandomNrs[i]}`);
  // }
  // setRandomNrs(randomNr); //Why does it see an infinite loop with this structure?
  //   return randomNr;
  // };

  const getOperator = () => {
    const mathOps = ["+", "-"];

    // setOperator(mathOps[Math.floor(Math.random() * mathOps.length)]); // infinite loop
    return mathOps[Math.floor(Math.random() * mathOps.length)];
  };

  const getInput = (event) => {
    // setInput(event.target.value);
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
        {/* <NumberSquares id="nrSq1" value={randomNrs[0]}></NumberSquares> */}
        {/* <MathSigns id="mathOp1" value={() => getOperator()}></MathSigns> */}
        {/* <NumberSquares id="nrSq2" value={randomNrs[1]}></NumberSquares> */}
        {/* <MathSigns value="="></MathSigns> */}
        {/* {gameResultSquare()} */}
        {/* <ResultSquare onChange={(e) => getInput(e)} /> */}
      </div>
    );
  };

  const handleCheck = () => {
    console.log("CHECK button pushed");

    // mathOp1 === "-" ? nrSq2 * -1 : nrSq2;  //how can I get mathOp1 into the equasion?
    if (mathOperator === "-") {
      return -randomNrs[1];
    }
    if (userInput === randomNrs[0] + randomNrs[1]) {
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
            <NumberSquares id="nrSq1" value={getRandomNr()}></NumberSquares>
            {/* <MathSigns id="mathOp1" value={getOperator()}></MathSigns> */}
            <MathSigns value={getOperator()}></MathSigns>{" "}
            {/* Try switching these MathSighs around */}
            <NumberSquares id="nrSq2" value={getRandomNr()}></NumberSquares>
            <MathSigns value="="></MathSigns>
            {/* {gameResultSquare()} */}
            <ResultSquare onChange={(e) => getInput(e)} />
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

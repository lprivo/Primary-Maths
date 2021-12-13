import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";
import SetUp from "../SetUp";
import Exercise from "../Exercise";
import Stats from "../Stats";
import GameButtons from "../GameButtons";
import OptionButton from "../OptionButton";
// import Counter from "../Counter";
import { WelcomeBox } from "../WelcomeBox/WelcomeBox";

export const Game = () => {
  const [mathematician, setMathematician] = useState("");
  const [exeAmount, setExeAmount] = useState(0);
  const [countTotal, setCountTotal] = useState(1);
  const [randomNrs, setRandomNrs] = useState([]);
  const [mathOperator, setMathOperator] = useState();
  const [plusOp, setPlusOp] = useState(true);
  const [minusOp, setMinusOp] = useState(true);
  const [timesOp, setTimesOp] = useState(true);
  const [divisionOp, setDivisionOp] = useState(true);
  const [plusLimit, setPlusLimit] = useState(70);
  const [minusLimit, setMinusLimit] = useState(50);
  const [timesLimit, setTimesLimit] = useState(14);
  const [divisionLimit, setDivisionLimit] = useState(2);
  const [userInput, setUserInput] = useState("");
  const [inputChanged, setInputChanged] = useState(false);
  const [result, setResults] = useState();
  const [resultColor, setResultColor] = useState("black");
  const [answered, setAnswered] = useState(0);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [countCorrectAnswer, setCountCorrectAswer] = useState(0);
  const [countWrongAnswer, setCountWrongAnswer] = useState(0);
  const nextRef = useRef(null);
  const inputRef = useRef(null);
  const divisionSign = String.fromCharCode(247);
      
  const toggleOperator = useCallback(
    (operator) => {
      if (operator === "+") setPlusOp(!plusOp);
      if (operator === "-") setMinusOp(!minusOp);
      if (operator === "x") setTimesOp(!timesOp);
      if (operator === divisionSign) setDivisionOp(!divisionOp);
    },
    [plusOp, minusOp, timesOp, divisionOp, divisionSign]
  );

  const getOperator = useCallback(() => {
    const operators = [];
    if (plusOp) operators.push("+");
    if (minusOp) operators.push("-");
    if (timesOp) operators.push("x");
    if (divisionOp) operators.push(divisionSign);
    return operators[Math.floor(Math.random() * operators.length)];
  }, [plusOp, minusOp, timesOp, divisionOp, divisionSign]);

  const getEquation = useCallback(() => {
    const operator = getOperator();
    setMathOperator(operator);
    setAlreadyAnswered(false);
    if (operator === "+") {
      const randomN1 = Math.floor(Math.random() * plusLimit) + 1;
      const randomN2 = Math.floor(Math.random() * plusLimit) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 + randomN2);
    }
    if (operator === "-") {
      const randomN1 = Math.floor(Math.random() * minusLimit) + 1;
      const randomN2 = Math.floor(Math.random() * minusLimit) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 - randomN2);
      // If we don't want negativ take-away results:
      // setRandomNrs([
      //   Math.max(randomN1, randomN2),
      //   Math.min(randomN1, randomN2),
      // ]);
    }
    if (operator === "x") {
      const randomN1 = Math.floor(Math.random() * (timesLimit-1)) + 2;
      const randomN2 = Math.floor(Math.random() * (timesLimit-1)) + 2;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 * randomN2);
    }
    if (operator === divisionSign) {
      const dividendArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100];
      const dividend = Math.floor(Math.random() * (dividendArray.length)) + 1;
      const randomN2 = Math.floor(Math.random() * (divisionLimit)) + 1;
      const randomN1 = dividend * randomN2;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 / randomN2);
    }
  }, [getOperator, plusLimit, minusLimit, timesLimit, divisionLimit, divisionSign]);

  const getPlusLimit = useCallback((event) => {
    let value = event.target.value;
    if (0 <= value && value < 1000) setPlusLimit(value);
    else alert("'+' limit must be between 1 and 999");
  }, []);

  const getMinusLimit = useCallback((event) => {
    let value = event.target.value;
    if (0 <= value && value < 1000) setMinusLimit(value);
    else alert("'-' limit must be between 1 and 999");
  }, []);

  const getTimesLimit = useCallback((event) => {
    let value = event.target.value;
    if (0 <= value && value <= 20) setTimesLimit(value);
    else alert("'*' limit must be between 1 and 20");
  }, []);

  const getDivisionLimit = useCallback((event) => {
    let value = event.target.value;
    if (0 <= value && value <= 10) setDivisionLimit(value);
    else alert(`'${divisionSign}' limit must be between 1 and 10`);
  }, [divisionSign]);

  const getInput = useCallback((event) => {
    setUserInput(event.target.value);
    setInputChanged(true);
    setCorrectAnswer(false);
    setResultColor("black");
  }, []);

  const handleNext = useCallback(() => {
    if (countTotal < exeAmount) {
      getEquation();
      setUserInput("");
      setCountTotal(countTotal + 1);
      setCorrectAnswer(false);
      setShowCheckMark(false);
      setResultColor("black");
      inputRef.current.focus();
    }
    return <div id="board" className="board-row"></div>;
  }, [exeAmount, countTotal, getEquation]);

  const handleCheck = useCallback(() => {
    if (!alreadyAnswered) {
      setAnswered(answered + 1);
      setAlreadyAnswered(true);
    }
    if (userInput === `${result}`) {
      setCorrectAnswer(true);
      setShowCheckMark(true);
      setResultColor("green");
      nextRef.current.focus();
      if (inputChanged && !alreadyAnswered) {
        setCountCorrectAswer(countCorrectAnswer + 1);
        setInputChanged(false);
      }
    } else {
      setResultColor("red");
      setCorrectAnswer(false);
      setShowCheckMark(true);
      if (inputChanged && !alreadyAnswered) {
        setCountWrongAnswer(countWrongAnswer + 1);
        setInputChanged(false);
      }
    }
  }, [
    answered,
    alreadyAnswered,
    userInput,
    result,
    countCorrectAnswer,
    countWrongAnswer,
    inputChanged,
    nextRef
  ]);

  const getExeAmount = useCallback((event) => {
    setExeAmount(event?.target?.value || 25);
  }, []);

  useEffect(() => {
    getExeAmount();
  }, [getExeAmount]);

  useEffect(() => {
    getEquation();
  }, [getEquation]);

  useEffect(() => {
    setMathematician("Roland");
  }, [setMathematician])

  return (
    <div className="game">
      <div className="equation-game">
        <WelcomeBox mathematician={mathematician}></WelcomeBox>
        <Exercise
            inputRef={inputRef}
            onChange={getInput}
            value={userInput}
            newColor={resultColor}
            onKeyPress={handleCheck}
            checkMarkChild={correctAnswer}
            showCheckMark={showCheckMark}
            randomNrs1={randomNrs[0]}
            randomNrs2={randomNrs[1]}
            operator={mathOperator}
          ></Exercise>
        <div className="gameContainer">
        <div className="game-board">
          <SetUp eventHandler={getExeAmount}></SetUp>
          <div className="optionButtonContainer">
            <span>Select operators and upper limit:</span>
            <div className="optionButtons">
            <OptionButton
              onClick={
                (minusOp || timesOp || divisionOp) &&
                (() => {
                  toggleOperator("+");
                })
              }
              onChange={getPlusLimit}
              value={plusOp ? plusLimit : ""}
              selected={plusOp ? "optionBtnPressed" : "optionBtn"}
              disabled={!plusOp}
            >
              +
            </OptionButton>
            <OptionButton
              onClick={
                (plusOp || timesOp || divisionOp) &&
                (() => {
                  toggleOperator("-");
                })
              }
              onChange={getMinusLimit}
              value={minusOp ? minusLimit : ""}
              selected={minusOp ? "optionBtnPressed" : "optionBtn"}
              disabled={!minusOp}
            >
              -
            </OptionButton>
            <OptionButton
              onClick={
                (plusOp || minusOp || divisionOp) &&
                (() => {
                  toggleOperator("x");
                })
              }
              onChange={getTimesLimit}
              value={timesOp ? timesLimit : ""}
              selected={timesOp ? "optionBtnPressed" : "optionBtn"}
              disabled={!timesOp}
            >
              x
            </OptionButton>
            <OptionButton
              onClick={
                (plusOp || minusOp || timesOp) &&
                (() => {
                  toggleOperator(divisionSign);
                })
              }
              onChange={getDivisionLimit}
              value={divisionOp ? divisionLimit : ""}
              selected={divisionOp ? "optionBtnPressed" : "optionBtn"}
              disabled={!divisionOp}
            >
              {divisionSign}
            </OptionButton>
            </div>
          </div>
          {/* <Exercise
            inputRef={inputRef}
            onChange={getInput}
            value={userInput}
            newColor={resultColor}
            onKeyPress={handleCheck}
            checkMarkChild={correctAnswer}
            showCheckMark={showCheckMark}
            randomNrs1={randomNrs[0]}
            randomNrs2={randomNrs[1]}
            operator={mathOperator}
          ></Exercise> */}
        </div>
        <div className="game-info">
          <div className="gameButtonsContainer">
          <GameButtons
            className={"gameButtons"}
            onClick={handleCheck}
            disabled={!inputChanged}
          >
            CHECK
          </GameButtons>
          <GameButtons
            className={"gameButtons"}
            buttonRef={nextRef}
            onClick={handleNext}
            disabled={(exeAmount > countTotal && alreadyAnswered === true) ? false : true}
          >
            NEXT
          </GameButtons>
          </div>
          <Stats
            total={countTotal}
            correct={countCorrectAnswer}
            wrong={countWrongAnswer}
          ></Stats>
          {!(answered < exeAmount) && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Well Done - Completed!
            </p>
          )}
        </div>
        </div>
      </div>
      {/* <Counter></Counter> */}
    </div>
  );
};

export default Game;

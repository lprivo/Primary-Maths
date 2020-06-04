import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";
import SetUp from "../SetUp";
import Exercise from "../Exercise";
import Stats from "../Stats";
import GameButtons from "../GameButtons";
import Counter from "../Counter";

const getOperator = () => {
  const operator = ["+", "-", "*"];
  return operator[Math.floor(Math.random() * operator.length)];
};

export const Game = () => {
  const [exeAmount, setExeAmount] = useState(0);
  const [countTotal, setCountTotal] = useState(1);
  const [randomNrs, setRandomNrs] = useState([]);
  const [mathOperator, setMathOperator] = useState();
  const [userInput, setUserInput] = useState("");
  const [inputChanged, setInputChanged] = useState(false);
  const [result, setResults] = useState();
  const [resultColor, setResultColor] = useState("black");
  const [answered, setAnswered] = useState(0);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [countCorrectAnswer, setCountCorrectAswer] = useState(0);
  const [countWrongAnswer, setCountWrongAnswer] = useState(0);
  const nextRef = useRef(null);
  const inputRef = useRef(null);

  const getEquation = useCallback(() => {
    const operator = getOperator();
    setMathOperator(operator);
    setAlreadyAnswered(false);
    if (operator === "+") {
      const randomN1 = Math.floor(Math.random() * 20) + 1;
      const randomN2 = Math.floor(Math.random() * 20) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 + randomN2);
    }
    if (operator === "-") {
      const randomN1 = Math.floor(Math.random() * 20) + 1;
      const randomN2 = Math.floor(Math.random() * 20) + 1;
      setRandomNrs([
        Math.max(randomN1, randomN2),
        Math.min(randomN1, randomN2),
      ]);
      setResults(Math.abs(randomN1 - randomN2));
    }
    if (operator === "*") {
      const randomN1 = Math.floor(Math.random() * 12) + 1;
      const randomN2 = Math.floor(Math.random() * 12) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 * randomN2);
    }
  }, []);

  const getInput = useCallback((event) => {
    setUserInput(event.target.value);
    setInputChanged(true);
    setCorrectAnswer(false);
    setResultColor("black");
  }, []);

  const handleNext = useCallback(() => {
    if (countTotal < exeAmount) {
      setCountTotal(countTotal + 1);
      getEquation();
      setUserInput("");
      setCorrectAnswer(false);
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
      setResultColor("green");
      nextRef.current.focus();
      if (inputChanged && !alreadyAnswered) {
        setCountCorrectAswer(countCorrectAnswer + 1);
        setInputChanged(false);
      }
    } else {
      setResultColor("red");
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
    nextRef,
  ]);

  const getExeAmount = useCallback((event) => {
    setExeAmount(event?.target?.value || 10);
  }, []);

  useEffect(() => {
    getExeAmount();
  }, [getExeAmount]);

  useEffect(() => {
    getEquation();
  }, [getEquation]);

  return (
    <div className="game">
      <div className="equation-game">
        <div className="game-board">
          <SetUp eventHandler={getExeAmount}></SetUp>
          <Exercise
            inputRef={inputRef}
            onChange={getInput}
            value={userInput}
            newColor={resultColor}
            onKeyPress={handleCheck}
            CheckMarkChild={correctAnswer}
            randomNrs1={randomNrs[0]}
            randomNrs2={randomNrs[1]}
            operator={mathOperator}
          ></Exercise>
        </div>
        <div className="game-info">
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
            disabled={exeAmount > countTotal ? false : true}
          >
            NEXT
          </GameButtons>
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
      <div className="counter-game">
        <Counter></Counter>
      </div>
    </div>
  );
};

export default Game;

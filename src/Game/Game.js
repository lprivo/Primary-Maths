import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.css";
import SetUp from "../SetUp";
import Exercise from "../Exercise";
import Stats from "../Stats";
import GameButtons from "../GameButtons";
import OptionButton from "../OptionButton";
// import Counter from "../Counter";
import { WelcomeBox } from "../WelcomeBox/WelcomeBox";
import correctTune from "../lib/mixkit-achievement-bell-600.wav";
import incorrectTune from "../lib/mixkit-car-double-horn-719.wav";
// import wellDoneTune from "../lib/mixkit-football-team-applause-509.wav";

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
  const plusSign = String.fromCharCode(43);
  const minusSign = String.fromCharCode(45);
  const multiplicationSign = String.fromCharCode(215);
  const divisionSign = String.fromCharCode(247);

  const [audio, setAudio] = useState(new Audio(correctTune));
  const [playing, setPlaying] = useState(false);

  const toggleOperator = useCallback(
    operator => {
      if (operator === plusSign) setPlusOp(!plusOp);
      if (operator === minusSign) setMinusOp(!minusOp);
      if (operator === multiplicationSign) setTimesOp(!timesOp);
      if (operator === divisionSign) setDivisionOp(!divisionOp);
    },
    [
      plusOp,
      minusOp,
      timesOp,
      divisionOp,
      plusSign,
      minusSign,
      multiplicationSign,
      divisionSign
    ]
  );

  const getOperator = useCallback(() => {
    const operators = [];
    if (plusOp) operators.push(plusSign);
    if (minusOp) operators.push(minusSign);
    if (timesOp) operators.push(multiplicationSign);
    if (divisionOp) operators.push(divisionSign);
    return operators[Math.floor(Math.random() * operators.length)];
  }, [
    plusOp,
    minusOp,
    timesOp,
    divisionOp,
    plusSign,
    minusSign,
    multiplicationSign,
    divisionSign
  ]);

  const getEquation = useCallback(() => {
    const operator = getOperator();
    setMathOperator(operator);
    setAlreadyAnswered(false);
    if (operator === plusSign) {
      const randomN1 = Math.floor(Math.random() * plusLimit) + 1;
      const randomN2 = Math.floor(Math.random() * plusLimit) + 1;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 + randomN2);
    }
    if (operator === minusSign) {
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
    if (operator === multiplicationSign) {
      const timesTableSize = "12";
      const randomN1 = Math.floor(Math.random() * (timesLimit - 1)) + 2;
      const randomN2 = Math.floor(Math.random() * (timesTableSize - 1)) + 2;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 * randomN2);
    }
    if (operator === divisionSign) {
      const dividendArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100];
      const dividend = Math.floor(Math.random() * dividendArray.length) + 1;
      const randomN2 = Math.floor(Math.random() * divisionLimit) + 1;
      const randomN1 = dividend * randomN2;
      setRandomNrs([randomN1, randomN2]);
      setResults(randomN1 / randomN2);
    }
  }, [
    getOperator,
    plusLimit,
    minusLimit,
    timesLimit,
    divisionLimit,
    plusSign,
    minusSign,
    multiplicationSign,
    divisionSign
  ]);

  const getPlusLimit = useCallback(
    event => {
      let value = event.target.value;
      if (0 <= value && value < 1000) setPlusLimit(value);
      else alert(`'${plusSign}' limit must be between 1 and 999`);
    },
    [plusSign]
  );

  const getMinusLimit = useCallback(
    event => {
      let value = event.target.value;
      if (0 <= value && value < 1000) setMinusLimit(value);
      else alert(`'${minusSign}' limit must be between 1 and 999`);
    },
    [minusSign]
  );

  const getTimesLimit = useCallback(
    event => {
      let value = event.target.value;
      if (0 <= value && value <= 20) setTimesLimit(value);
      else alert(`'${multiplicationSign}' limit must be between 1 and 20`);
    },
    [multiplicationSign]
  );

  const getDivisionLimit = useCallback(
    event => {
      let value = event.target.value;
      if (0 <= value && value <= 10) setDivisionLimit(value);
      else alert(`'${divisionSign}' limit must be between 1 and 10`);
    },
    [divisionSign]
  );

  const getInput = useCallback(event => {
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
        setAudio(new Audio(correctTune));
        setPlaying(true);
        setInputChanged(false);
      }
    } else {
      setResultColor("red");
      setCorrectAnswer(false);
      setAudio(new Audio(incorrectTune));
      setPlaying(true);
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

  const getExeAmount = useCallback(event => {
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
  }, [setMathematician]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    console.log("playing", playing);
    audio.addEventListener("ended", () => setPlaying(false));
    console.log("playing", playing);
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio, playing]);

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
                      toggleOperator(plusSign);
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
                      toggleOperator(minusSign);
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
                      toggleOperator(multiplicationSign);
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
                disabled={
                  exeAmount > countTotal && alreadyAnswered === true
                    ? false
                    : true
                }
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
              // setAudio(new Audio(wellDoneTune)),
              // setPlaying(true)
            )}
          </div>
        </div>
      </div>
      {/* <Counter></Counter> */}
    </div>
  );
};

export default Game;

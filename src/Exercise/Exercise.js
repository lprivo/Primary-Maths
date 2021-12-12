import React from "react";
import "./Exercise.css";
import NumberSquares from "../NumberSquares";
import ResultSquare from "../ResultSquares";
import MathSigns from "../MathSigns";
import CheckMark from "../CheckMark";

export const Exercise = ({
  randomNrs1,
  randomNrs2,
  operator,
  inputRef,
  onChange,
  value,
  newColor,
  onKeyPress,
  checkMarkChild,
  showCheckMark
}) => {
  let mathSignsClass = "";
  const checkMark = checkMarkChild ? "✔️" : "❌";
  (operator === "-" || operator === "x") ? mathSignsClass = "mathSigns-x" : mathSignsClass = "mathSigns";
  return (
    <div className="equation">
      <NumberSquares className={"nrSquare"}>{randomNrs1}</NumberSquares>
      <MathSigns className={mathSignsClass}>{operator}</MathSigns>
      <NumberSquares className={"nrSquare"}>{randomNrs2}</NumberSquares>
      <MathSigns className={"mathSigns"}>=</MathSigns>
      <ResultSquare
        inputRef={inputRef}
        onChange={onChange}
        value={value}
        newColor={newColor}
        onKeyPress={onKeyPress}
      // focus={focus}
      ></ResultSquare>
      <CheckMark>{showCheckMark && checkMark}</CheckMark>
    </div>
  );
};

export default Exercise;

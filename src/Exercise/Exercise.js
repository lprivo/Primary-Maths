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
  CheckMarkChild,
  // focus,
}) => {
  let MathSignsClass = "";
  (operator === "-" || operator === "x") ? MathSignsClass = "mathSigns-x" : MathSignsClass = "mathSigns";
  return (
    <div className="equation">
      <NumberSquares className={"nrSquare"}>{randomNrs1}</NumberSquares>
      <MathSigns className={MathSignsClass}>{operator}</MathSigns>
      <NumberSquares className={"nrSquare"}>{randomNrs2}</NumberSquares>
      <MathSigns>=</MathSigns>
      <ResultSquare
        inputRef={inputRef}
        onChange={onChange}
        value={value}
        newColor={newColor}
        onKeyPress={onKeyPress}
      // focus={focus}
      ></ResultSquare>
      <CheckMark>{CheckMarkChild && "✅"}</CheckMark>
    </div>
  );
};

export default Exercise;

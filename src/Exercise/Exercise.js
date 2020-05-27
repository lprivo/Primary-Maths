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
  onChange,
  value,
  newColor,
  CheckMarkChild,
  focus,
}) => {
  return (
    <tr className="equation">
      <NumberSquares>{randomNrs1}</NumberSquares>
      <MathSigns>{operator}</MathSigns>
      <NumberSquares>{randomNrs2}</NumberSquares>
      <MathSigns>=</MathSigns>
      <ResultSquare
        onChange={onChange}
        value={value}
        newColor={newColor}
        focus={focus}
      />
      <CheckMark>{CheckMarkChild && "✅"}</CheckMark>
    </tr>
  );
};

export default Exercise;

import React from "react";
import NumberSquares from "../NumberSquares";
import ResultSquare from "../ResultSquares";
import MathSigns from "../MathSigns";
import CheckMark from "../CheckMark";

export const Exercise = ({
  randomNrs1,
  randomNrs2,
  operator,
  e,
  value,
  value2,
  value3,
  focus,
}) => {
  return (
    <div>
      <NumberSquares>{randomNrs1}</NumberSquares>
      <MathSigns>{operator}</MathSigns>
      <NumberSquares>{randomNrs2}</NumberSquares>
      <MathSigns>=</MathSigns>
      <ResultSquare
        onChange={e}
        value={value}
        newColor={value2}
        focus={focus}
      />
      <CheckMark>{value3 && "✅"}</CheckMark>
    </div>
  );
};

export default Exercise;

import React from "react";
import "./StepDigits.css";
import GameButtons from "../GameButtons";

export const StepDigits = ({
  onClickMinus,
  onClickPlus,
  disabled,
  children,
}) => {
  return (
    <div className="stepdigitrow">
      <GameButtons onClick={onClickMinus} disabled={disabled} focus={false}>
        -
      </GameButtons>
      <span className="stepnumber">{children}</span>
      <GameButtons onClick={onClickPlus} disabled={disabled} focus={false}>
        +
      </GameButtons>
    </div>
  );
};

export default StepDigits;

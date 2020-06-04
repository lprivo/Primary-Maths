import React from "react";
import "./StepDigits.css";
import GameButtons from "../GameButtons";

export const StepDigits = ({
  onClickMinus,
  onClickPlus,
  disabledMinus,
  disabledPlus,
  children,
}) => {
  return (
    <div className="stepdigitrow">
      <GameButtons
        className={"plusminusButtons"}
        onClick={onClickMinus}
        disabled={disabledMinus}
        focus={false}
      >
        -
      </GameButtons>
      <span className="stepnumber">{children}</span>
      <GameButtons
        className={"plusminusButtons"}
        onClick={onClickPlus}
        disabled={disabledPlus}
        focus={false}
      >
        +
      </GameButtons>
    </div>
  );
};

export default StepDigits;

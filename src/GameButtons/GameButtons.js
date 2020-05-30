import React from "react";
import "./GameButtons.css";

export const GameButtons = ({
  buttonRef,
  onClick,
  disabled,
  focus,
  children,
}) => {
  return (
    <button
      className="gameButtons"
      ref={buttonRef}
      // tabIndex="-1"
      onClick={onClick}
      disabled={disabled}
      autoFocus={focus}
    >
      {children}
    </button>
  );
};

export default GameButtons;

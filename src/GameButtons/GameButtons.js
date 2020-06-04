import React from "react";
import "./GameButtons.css";

export const GameButtons = ({
  className,
  buttonRef,
  onClick,
  disabled,
  focus,
  children,
}) => {
  return (
    <button
      className={className}
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      autoFocus={focus}
    >
      {children}
    </button>
  );
};

export default GameButtons;

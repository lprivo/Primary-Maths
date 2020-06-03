import React from "react";
import "./ResultSquare.css";

export const ResultSquare = ({
  inputRef,
  onChange,
  value,
  newColor,
  onKeyPress,
}) => {
  return (
    <input
      type="text"
      className="resSquare"
      ref={inputRef}
      placeholder="?"
      onChange={onChange}
      value={value}
      style={{ color: newColor }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          onKeyPress();
        }
      }}
      autoFocus
    />
  );
};

export default ResultSquare;

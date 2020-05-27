import React from "react";
import "./ResultSquare.css";

export const ResultSquare = ({
  onChange,
  value,
  newColor,
  onKeyPress,
  focus,
}) => {
  return (
    <input
      type="text"
      className="resSquare"
      placeholder="?"
      onChange={onChange}
      value={value}
      style={{ color: newColor }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          console.log("Enter");
          onKeyPress();
        }
      }}
      autoFocus={focus}
    />
  );
};

export default ResultSquare;

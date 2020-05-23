import React from "react";
import "./ResultSquare.css";

export const ResultSquare = ({ onChange, value, newColor, focus }) => {
  return (
    <input
      type="text"
      className="resSquare"
      placeholder="?"
      onChange={onChange}
      value={value}
      style={{ color: newColor }}
      autoFocus={focus}
    />
  );
};

export default ResultSquare;

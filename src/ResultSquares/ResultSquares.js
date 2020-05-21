import React from "react";
import "./ResultSquare.css";

export const ResultSquare = ({ onChange, value, newColor }) => {
  return (
    <input
      type="text"
      className="resSquare"
      placeholder="?"
      onChange={onChange}
      Value={value}
      style={{ color: newColor }}
      autoFocus
    />
  );
};

export default ResultSquare;

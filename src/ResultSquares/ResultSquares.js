import React from "react";
import "./ResultSquare.css";

export const ResultSquare = ({ e }) => {
  return (
    <input type="text" className="resSquare" placeholder="?" onChange={e} />
  );
};

export default ResultSquare;

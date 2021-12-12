import React from "react";
import "./Stats.css";

export const Stats = ({ total, correct, wrong }) => {
  return (
    <div className="stats">
      <p>Total: {total}</p>
      <p className="correct">Correct: {correct} 👍</p>
      <p className="incorrect">Incorrect: {wrong}</p>
    </div>
  );
};

export default Stats;

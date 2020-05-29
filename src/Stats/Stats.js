import React from "react";
import "./Stats.css";

export const Stats = ({ total, correct, wrong }) => {
  return (
    <div className="stats">
      <p>Total: {total}</p>
      <p>Correct: {correct}</p>
      <p>Wrong: {wrong}</p>
    </div>
  );
};

export default Stats;

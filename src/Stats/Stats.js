import React from "react";
// import "./SetUp.css";

export const Stats = ({ total, correct, wrong }) => {
  return (
    <div>
      <p>Total: {total}</p>
      <p>Correct: {correct}</p>
      <p>Wrong: {wrong}</p>
    </div>
  );
};

export default Stats;

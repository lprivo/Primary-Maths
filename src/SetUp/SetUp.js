import React from "react";
import "./SetUp.css";

export const SetUp = ({ eventHandler }) => {
  return (
    <form className="setUp" action="">
      <div>
        Please select the number of exercises:
        <select defaultValue={25} onChange={eventHandler}>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </form>
  );
};

export default SetUp;

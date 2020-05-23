import React from "react";
import "./SetUp.css";

export const SetUp = ({ e }) => {
  return (
    <form className="setUp" action="">
      <div>
        Please select the number of exercises:
        <select id="selectAmount">
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button id="startbutton" onClick={e}>
          OK
        </button>
      </div>
    </form>
  );
};

export default SetUp;

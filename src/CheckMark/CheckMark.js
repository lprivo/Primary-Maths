import React from "react";
import "./CheckMark.css";

export const CheckMark = ({ children }) => {
  return (
    <div className="checkMark">
    <span className="checkMarkChild" role="img" aria-label="Correct Answer">
      {children}
    </span>
    </div>
  );
};

export default CheckMark;

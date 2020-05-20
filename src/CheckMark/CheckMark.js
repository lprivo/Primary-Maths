import React from "react";
import "./CheckMark.css";

export const CheckMark = ({ children }) => {
  return (
    <span className="checkMark" role="img" aria-label="Correct Answer">
      {children}
    </span>
  );
};

export default CheckMark;

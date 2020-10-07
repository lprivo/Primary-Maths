import React from "react";
import "./MathSigns.css";

export const MathSigns = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

export default MathSigns;

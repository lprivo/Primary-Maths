import React from "react";
import "./NumberSquare.css";

export const NumberSquare = ({ className, newColor, onChange, children }) => {
  // props.value = const {value} = props; = {value} ->
  return (
    <span className={className} style={{ color: newColor }} onChange={onChange}>
      {children}
    </span>
  );
};

export default NumberSquare;

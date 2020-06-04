import React from "react";
import "./NumberSquare.css";

export const NumberSquare = ({ className, newColor, children }) => {
  // props.value = const {value} = props; = {value} ->
  return (
    <span className={className} style={{ color: newColor }}>
      {children}
    </span>
  );
};

export default NumberSquare;

import React from "react";
import "./NumberSquare.css";

export const NumberSquare = ({ children }) => {
  // props.value = const {value} = props; = {value} ->
  return <div className="nrSquare">{children}</div>;
};

export default NumberSquare;

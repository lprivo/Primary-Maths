import React from "react";
import "./NumberSquare.css";

export const NumberSquare = ({ children }) => {
  // props.value = const {value} = props; = {value} ->
  return <span className="nrSquare">{children}</span>;
};

export default NumberSquare;

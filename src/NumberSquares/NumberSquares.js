import React from "react";
import "./NumberSquare.css";

export const NumberSquare = ({ value }) => {
  // props.value = const {value} = props; = {value} ->
  return <div className="nrSquare">{value}</div>;
};

export default NumberSquare;

import React from "react";
import "./OptionButton.css";

export const OptionButton = ({
  onClick,
  children,
  value,
  placeHolder,
  onChange,
  selected,
  disabled,
}) => {
  return (
    <div className="optionElement">
      <button className={selected} onClick={onClick}>
        {children}
      </button>
      <input
        type="text"
        className="optionInput"
        onChange={onChange}
        placeholder={placeHolder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default OptionButton;

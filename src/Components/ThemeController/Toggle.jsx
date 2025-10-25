import React from "react";
import "./Toggle.css";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <label className="flex cursor-pointer gap-2 items-center">
      <span className="label-text">Light</span>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={isChecked} 
        className="toggle theme-controller"
      />
      <span className="label-text">Dark</span>
    </label>
  );
};

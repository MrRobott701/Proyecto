import React from "react";

const Switch = ({ isActive, onToggle }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={isActive}
        onChange={onToggle}
      />
      <div className={`w-11 h-6 rounded-full relative transition-all ${
        isActive ? "bg-green-600" : "bg-gray-600"
      }`}>
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out transform ${
            isActive ? "translate-x-5 bg-white" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;

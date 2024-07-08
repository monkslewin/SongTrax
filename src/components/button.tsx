import React from "react";
import "../style/starterstyles.css";
import { ButtonProps } from "../types/buttonprops";

/**
 * Function for the creation of a Button component which serves as a 
 * general button used throughout the rest of the application
 * 
 * @param label - string representing the label for the button
 * @param isSelected - boolean representing whether a button is selected
 * @param onClick - function for handling the event where a button is clicked
 */

const Button: React.FC<ButtonProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      className={isSelected ? "toggle-selected" : "toggle"} // If a button is selected it has the toggle-selected class applied
      onClick={onClick}
    >
      {label || ""} 
    </button>
  );
};

export default Button;

import React from "react";
import Button from "./button";
import "../style/starterstyles.css";
import { ToggleRowProps } from "../types/buttonprops";

/**
 * Component for handling the keys on the create page. This contains seven rows 
 * of 16 buttons, each row having its own unique sound when clicked
 * 
 * @param label - A - G representing the note
 * @param buttonStates - array of objects representing the buttons and their selection state 
 * @param handleRowChange - function for handling the user clicking a note
 * @param onButtonClick - function for handling when the user clicks a note 
 */

const ToggleRow: React.FC<ToggleRowProps> = ({ // Use of generative AI to convert HTML to React component 
  label,
  buttonStates,
  handleRowChange,
  onButtonClick,
}) => {
  /**
   * Handles the click event on a button by toggling its state and invoking the provided callbacks.
   * @param {number} index - The index of the clicked button.
   */
  const handleButtonClick = (index: number) => {
    const newStates = [...buttonStates];
    newStates[index] = !newStates[index];
    handleRowChange(label, newStates);
    onButtonClick(label);
  };

  return (
    <div className="toggle-row-container">
      <div className="row-label">
        <h4>{label}</h4>
      </div>
      <div className="sequence-row-container">
        {buttonStates.map((isSelected, index) => (
          <Button
            key={index}
            isSelected={isSelected}
            onClick={() => handleButtonClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToggleRow;


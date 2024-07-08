import React, { useState, useEffect } from "react";
import "../style/starterstyles.css";
import Button from "./button";
import { InstrumentButtonProps } from "../types/instrumentprops";

/**
 * This component is for the bar containing the different instruments the 
 * user can select. Once the user selects a new instrument the state is updated 
 * to reflect the changes
 * 
 * @param selectedType - string representation of the user's selected instrument
 * @param onInstrumentChange - function to handle the user changing their instrument 
 */

const InstrumentButtons: React.FC<InstrumentButtonProps> = ({ // Use of generative AI for converting HTML to React component
  selectedType,
  onInstrumentChange,
}) => {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    selectedType
  );

  const handleInstrumentClick = (instrument: string) => { // Function for handling instrument changes 
    setSelectedInstrument(instrument);
    onInstrumentChange(instrument);
  };

  useEffect(() => {
    setSelectedInstrument(selectedType); // Update when selectedType changes
  }, [selectedType]);

  // Instrument options 
  const instruments = ["Guitar", "Piano", "Violin", "Drums"];

  return (
    <div className="toggle-row-container">
      <div className="row-label">
        <h4>Type</h4>
      </div>

      <div className="sequence-row-container">
        {
            // Creates the instrument selection display which handles 
            // instrument selection
        }
        {instruments.map((instrument) => (
          <Button
            key={instrument}
            label={instrument}
            isSelected={selectedInstrument === instrument}
            onClick={() => handleInstrumentClick(instrument)}
          />
        ))}
      </div>
    </div>
  );
};

export default InstrumentButtons;

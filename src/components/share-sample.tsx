import React from 'react';
import { ShareLocation } from '../types/location';

type ShareButtonProps = {
    location: ShareLocation;
    onToggle: (location: ShareLocation, status: 'Shared' | 'Not Shared') => void;
};

/**
 * Button for sharing a sample. Toggles between selected and unselected, and 
 * at the same time updates the label 
 * 
 * @param location - location object as defined in the custom type ShareLocation
 * @param onToggle - function to handle a location being clicked (toggled)
 */

export const ShareButton: React.FC<ShareButtonProps> = ({ location, onToggle }) => {
    return (
        <div className="sequence-row-container">
            
            <button
                className={location.sharing ? "toggle-selected" : "toggle"}
                onClick={() => onToggle(location, 'Shared')}
            >
                Shared
            </button>
            <button
                className={!location.sharing ? "toggle-selected" : "toggle"}
                onClick={() => onToggle(location, 'Not Shared')}
            >
                Not Shared
            </button>
        </div>
    );
};

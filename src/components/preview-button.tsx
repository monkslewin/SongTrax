import React, { useState } from 'react';
import * as Tone from 'tone';
import { playPolysynth, stopAllPlayingNotes } from '../instrument/play-instrument';

/**
 * A button which allows the user to toggle between playing music on the webpage
 * 
 * @param sampleType - string of the instrument being used
 * @param sampleData - recording data (object containing arrays of booleans)
 * 
 */
const PreviewButton: React.FC<{sampleType: string, sampleData: any}> = ({ sampleType, sampleData }) => {
    const [isPreviewing, setIsPreviewing] = useState(false);

    const handlePreview = async () => { // Handles the previewing of a sample
        await Tone.start();
        stopAllPlayingNotes();
        playPolysynth(sampleType, sampleData);
        setIsPreviewing(true);
    };

    const handleStopPreview = () => { // Utilised to stop a preview 
        stopAllPlayingNotes();
        setIsPreviewing(false);
    };
    
    // Utilises a conditional operator to determine what toggle is on the button
    return isPreviewing ? (
        <button type="button" className="bright-button" onClick={handleStopPreview}>
            Stop Preview
        </button>
    ) : (
        <button type="button" className="bright-button" onClick={handlePreview}>
            Preview
        </button>
    );
};

export default PreviewButton;

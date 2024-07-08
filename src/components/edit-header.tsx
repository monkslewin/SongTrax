import React, { useState } from 'react';
import '../style/starterstyles.css'

/**
 * 
 * Component for the edit sample form. At the top of the create-sample-page.tsx, there is a 
 * card which contains the name of the sample and a save button. This allows the user to 
 * change the title of their sample, which updates the state of the title and reflects the changes.
 * 
 */

const EditSampleForm: React.FC = () => { // Use of generative AI to convert HTML to React component
    const [title, setTitle] = useState("") // Initially sets state of title to blank 

    return (
        <div>
            <h2 className="title">Edit Sample:</h2>
            <form className="card edit-card">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} ></input>
                <div className="button-group-container">
                    <button type="button" className="bright-button">Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditSampleForm;
import React from 'react';
import '../style/starterstyles.css';
import { Link } from 'react-router-dom';

/**
 * This component is for the creating a sample card at the top of the homepage 
 * 
 */

export const CreateSampleCard: React.FC = () => {
    return (
        <div className="create-card">
            <Link to={`/create-sample/new`} className="full-button">Create Sample</Link>
        </div>
    )
}


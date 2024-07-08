import React from 'react';
import '../style/starterstyles.css'

/**
 * 
 * Component for the header of each page. To display the name of the application
 * as well as a short description of its usage. 
 */

const Header = () => {
    return (
        <header className="page-header">
            <div className="header-logo">
                <h2>
                    <a href="/" className="header-icon-link">SongTrax</a>
                </h2>
            </div>
            <div className="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
        </header>
    )
}

export default Header
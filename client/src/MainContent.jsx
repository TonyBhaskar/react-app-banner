import React from 'react';
import './MainContent.css';

const MainContent = () => {
    return (
        <div className="center-div">
            <div className="main-text">
                <h1 className="name">TONY BHASKAR</h1>
                <p className="text">Interested in Data Science and Software roles</p>
                <div className="image-links">
                    <a href="https://www.linkedin.com/in/tonybhaskar" target="_blank"><img src="./linkedin.svg" alt="linkedin" /></a>
                    <a href="https://github.com/tonybhaskar" target="_blank"><img src="./github.svg" alt="github" /></a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=tonybhaskar23@gmail.com" target="_blank"><img src="./envelope.svg" alt="email" /></a>
                </div>
            </div>
        </div>
    );
}

export default MainContent;

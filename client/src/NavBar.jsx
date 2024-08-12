import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav>
            <ul className="nav-bar">
                <h1 className="nav-items name">.TONY</h1>
                <li className="nav-items text"><Link to="/">Home</Link></li>
                <li className="nav-items text"><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;

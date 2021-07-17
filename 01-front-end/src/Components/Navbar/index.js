import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const Navbar = () => {
    const handleClick = () => {
        localStorage.removeItem('app-token');
    }

    return (
        <div class="navbar">
            <Link to="/dashboard">EDirectinsure TODO List</Link>
            <div class="dropdown">
                <button class="dropbtn">Dropdown 
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <Link href="/" onClick={handleClick}>Lougout</Link>
                </div>
            </div> 
        </div>  
    );
};

export default Navbar;
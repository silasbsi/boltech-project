import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io' ;
import './index.css';
import { useState } from 'react';

const Navbar = () => {
    const USER_NAME = localStorage.getItem('userName');
    const [arrowIcon, setArrowIcon] = useState(false);

    const handleLogoutClick = () => {
        localStorage.removeItem('app-token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    }

    const handleDropdownClick = () => {
        setArrowIcon(!arrowIcon);
    }

    return (
        <div class="navbar">
            <Link to="/dashboard">EDirectinsure TODO List</Link>
            <div class="dropdown" onMouseEnter={handleDropdownClick} onMouseLeave={handleDropdownClick}>
                <button class="dropdown-btn">
                    <span>{USER_NAME}</span>
                    {
                        arrowIcon ? (<IoMdArrowDropup />): (<IoMdArrowDropdown />) 
                    }
                    
                </button>
                <div class="dropdown-content">
                    <Link href="/" onClick={handleLogoutClick}>Lougout</Link>
                </div>
            </div> 
        </div>  
    );
};

export default Navbar;

import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <span className="logo">Ferrum Health</span>
            </Link>
        </div>
    );
};

export default Header;

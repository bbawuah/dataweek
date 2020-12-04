import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <nav>
            <NavLink to="/">Intro</NavLink>
            <NavLink to="/pagetwo">Data</NavLink>
            <NavLink to="/pagethree">Conclusie</NavLink>
        </nav>
    </header>
);

export default Header;
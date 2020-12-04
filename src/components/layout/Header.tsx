import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <nav>
            <NavLink to="/"
            exact
             activeStyle={{
                fontWeight: "bold",
                }}>Intro</NavLink>
            <NavLink to="/pagetwo"
            activeStyle={{
                fontWeight: "bold",
              }}
            >Data</NavLink>
            <NavLink to="/pagethree"
            activeStyle={{
                fontWeight: "bold",
              }}
            >Conclusie</NavLink>
        </nav>
    </header>
);

export default Header;
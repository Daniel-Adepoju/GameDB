import React from 'react';
import { NavLink } from 'react-router-dom';
function Header() {
    return (  
        <header>
           <div className="logo">
           <NavLink to='/'>
           <img src="/logo.svg" alt="logo" />
            </NavLink>
            </div>
            <div className="links">
                {/* <NavLink to='games'> Games</NavLink> */}
                <NavLink to='about'> About</NavLink>
            </div>
        </header>
    );
}

export default Header;
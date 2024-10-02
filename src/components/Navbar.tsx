import React from 'react';
import './Navbar.css'; 
import logo from '../../public/lock.svg'

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Tab Locker Room Icon" className="navbar-icon" />
      <span className="navbar-title">Tab Locker Room</span>
    </div>
  );
}

export default NavBar;

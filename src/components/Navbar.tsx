import React from 'react';
import './Navbar.css';
import logo from '../../public/lock.svg';
import gearIcon from '../../public/gear.svg';
import backArrow from '../../public/back-arrow.svg';

const NavBar: React.FC<{ isSettings: boolean; onBackClick: () => void; onSettingsClick: () => void }> = ({ isSettings, onBackClick, onSettingsClick }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        {isSettings && (
          <img src={backArrow} alt="Back" className="navbar-back" onClick={onBackClick} />
        )}
      </div>

      <div className="navbar-center">
        <img src={logo} alt="Tab Locker Room Icon" className="navbar-icon" />
        <span className="navbar-title">Tab Locker Room</span>
      </div>

      <div className="navbar-right">
        <img src={gearIcon} alt="Settings" className="navbar-gear" onClick={onSettingsClick} />
      </div>
    </div>
  );
};

export default NavBar;

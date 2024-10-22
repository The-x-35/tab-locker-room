import React, { useState } from 'react';
import './FirstPasswordSet.css';

const FirstPasswordSet: React.FC<{ onPasswordSet: () => void }> = ({ onPasswordSet }) => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePasswordSubmit = () => {
    if (inputPassword) {
      chrome.storage.local.set({ appPassword: inputPassword }, () => {
        onPasswordSet();
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="password-set-container">
      <h2 className="password-set-title">Enter Password to Set:</h2>
      <div className="password-input-container">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          className="password-input"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Enter a password"
        />
        <button className="eye-button" onClick={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <img src="https://img.icons8.com/material-outlined/24/ffffff/visible.png" alt="Hide" />
          ) : (
            <img src="https://img.icons8.com/material-outlined/24/ffffff/invisible.png" alt="Show" />
          )}
        </button>
      </div>
      <button className="submit-button" onClick={handlePasswordSubmit}>Set Password</button>
    </div>
  );
};

export default FirstPasswordSet;

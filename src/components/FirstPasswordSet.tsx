import React, { useState } from 'react';
import './FirstPasswordSet.css';

const FirstPasswordSet: React.FC<{ onPasswordSet: () => void }> = ({ onPasswordSet }) => {
  const [inputPassword, setInputPassword] = useState<string>('');

  const handlePasswordSubmit = () => {
    if (inputPassword) {
      chrome.storage.local.set({ appPassword: inputPassword }, () => {
        onPasswordSet();
      });
    }
  };

  return (
    <div className="password-set-container">
      <h2 className="password-set-title">Enter Password to Set:</h2>
      <input
        type="password"
        className="password-input"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        placeholder="Enter a password"
      />
      <button className="submit-button" onClick={handlePasswordSubmit}>Set Password</button>
    </div>
  );
};

export default FirstPasswordSet;

import React, { useEffect, useState } from 'react';
import NavBar from './components/Navbar';
import TabList from './components/TabList';
import FirstPasswordSet from './components/FirstPasswordSet';
import Settings from './components/Settings';
import './App.css';

const App: React.FC = () => {
  const [isPasswordSet, setIsPasswordSet] = useState<boolean | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>(''); // Store user input

  useEffect(() => {
    chrome.storage.local.get('appPassword', (data) => {
      if (data.appPassword) {
        setIsPasswordSet(true); // Password is set, require verification
      } else {
        setIsPasswordSet(false); // No password set, go to initial setup
      }
    });
  }, []);

  const handlePasswordSet = () => {
    setIsPasswordSet(true);
  };

  const handleSettingsClick = () => {
    setIsSettings(true);
  };

  const handleBackClick = () => {
    setIsSettings(false);
  };

  const verifyPassword = () => {
    chrome.storage.local.get('appPassword', (data) => {
      if (data.appPassword === inputPassword) {
        setIsPasswordVerified(true); // Password is correct, show content
      } else {
        alert('Incorrect password!');
        setIsPasswordVerified(false);
      }
    });
  };

  if (isPasswordSet === null) {
    return <div>Loading...</div>;
  }

  if (!isPasswordSet) {
    return <FirstPasswordSet onPasswordSet={handlePasswordSet} />;
  }

  if (!isPasswordVerified) {
    return (
      <div className="password-prompt">
        <h2>Please enter your password to continue</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Enter password"
          className="password-input-main"
        />
        <button onClick={verifyPassword} className="password-submit-button">
          Unlock
        </button>
      </div>
    );
  }

  return (
    <>
      <NavBar isSettings={isSettings} onBackClick={handleBackClick} onSettingsClick={handleSettingsClick} />
      <div className="App">
        {isSettings ? <Settings /> : <TabList />}
      </div>
    </>
  );
};

export default App;

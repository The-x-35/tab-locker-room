import React, { useEffect, useState } from 'react';
import NavBar from './components/Navbar';
import TabList from './components/TabList';
import FirstPasswordSet from './components/FirstPasswordSet';
import Settings from './components/Settings';
import './App.css';

const App: React.FC = () => {
  const [isPasswordSet, setIsPasswordSet] = useState<boolean | null>(null);
  const [isSettings, setIsSettings] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get('appPassword', (data) => {
      if (data.appPassword) {
        setIsPasswordSet(true);
      } else {
        setIsPasswordSet(false);
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

  if (isPasswordSet === null) {
    return <div>Loading...</div>;
  }

  if (!isPasswordSet) {
    return <FirstPasswordSet onPasswordSet={handlePasswordSet} />;
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

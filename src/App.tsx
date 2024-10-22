import React, { useEffect, useState } from 'react';
import NavBar from './components/Navbar';
import TabList from './components/TabList';
import FirstPasswordSet from './components/FirstPasswordSet'; // Import the new component
import './App.css';

const App: React.FC = () => {
  const [isPasswordSet, setIsPasswordSet] = useState<boolean | null>(null);

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

  if (isPasswordSet === null) {
    return <div>Loading...</div>;
  }

  if (!isPasswordSet) {
    return <FirstPasswordSet onPasswordSet={handlePasswordSet} />;
  }

  return (
    <>
      <NavBar />
      <div className="App">
        <TabList />
      </div>
    </>
  );
};

export default App;
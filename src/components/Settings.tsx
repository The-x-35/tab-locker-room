import React, { useState } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean }>({ text: '', isError: false });

  const eyeOffIcon = "https://img.icons8.com/material-outlined/24/ffffff/visible.png";
  const eyeIcon = "https://img.icons8.com/material-outlined/24/ffffff/invisible.png";
  const handleSaveNewPassword = () => {
    chrome.storage.local.get('appPassword', (data) => {
      const currentPassword = data.appPassword;

      if (oldPassword !== currentPassword) {
        setMessage({ text: 'Old password is incorrect.', isError: true });
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setMessage({ text: 'New password and confirm password do not match.', isError: true });
        return;
      }

      chrome.storage.local.set({ appPassword: newPassword }, () => {
        setMessage({ text: 'Password has been successfully updated.', isError: false });
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      });
    });
  };

  const handleStarOnGitHub = () => {
    window.open('https://github.com/The-x-35/tab-locker-room', '_blank');
  };

  return (
    <div className="settings-container">
      <h2>Change Password</h2>

      <div className="input-group">
        <label className="input-label">Old Password:</label>
        <div className="input-with-icon">
          <input
            type={showOldPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter your old password"
          />
          <img 
            src={showOldPassword ? eyeOffIcon : eyeIcon} 
            alt="Toggle Password Visibility" 
            className="eye-icon" 
            onClick={() => setShowOldPassword(!showOldPassword)} 
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">New Password:</label>
        <div className="input-with-icon">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
          />
          <img 
            src={showNewPassword ? eyeOffIcon : eyeIcon} 
            alt="Toggle Password Visibility" 
            className="eye-icon" 
            onClick={() => setShowNewPassword(!showNewPassword)} 
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Confirm New Password:</label>
        <div className="input-with-icon">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm your new password"
          />
          <img 
            src={showConfirmPassword ? eyeOffIcon : eyeIcon} 
            alt="Toggle Password Visibility" 
            className="eye-icon" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
          />
        </div>
      </div>

      <button className="save-button" onClick={handleSaveNewPassword}>
        Save New Password
      </button>

      {message.text && (
        <p className={message.isError ? 'error-message' : 'success-message'}>
          {message.text}
        </p>
      )}

      <button className="github-button" onClick={handleStarOnGitHub}>
        ⭐ Star on GitHub
      </button>
    </div>
  );
};

export default Settings;

# Tab Locker Room

A Chrome extension that allows users to lock tabs with a password, enhancing privacy and security while browsing. This is just a hobby side project.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Setup Instructions](#setup-instructions)
  - [Building the Project](#building-the-project)
  - [Loading the Unpacked Extension](#loading-the-unpacked-extension)
- [Commands for Password Management](#commands-for-password-management)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- Lock tabs with a password.
- Change the password with the settings page.
- User-friendly interface for managing locked tabs.

## Getting Started

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/The-x-35/tab-locker-room
   cd tab-locker-room```
2. **Install Dependencies**: Ensure you have Node.js installed. Then run:
   ```bash 
   npm install 
   ```
### Building the Project
To build the project for production, run the following command:
```bash
npm run build
```
This will generate the production-ready files in the ```dist``` directory.

### Loading the Unpacked Extension

For those who want to download from GitHub or GitHub releases:

1. **Download the latest release** or clone the repository.
2. **Open Chrome** and go to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the upper right corner.
4. Click on the **Load unpacked** button.
5. Select the folder where the `manifest.json` file is located (usually the root of the dist folder).
6. The extension should now appear in your Chrome extensions list.

## Commands for Password Management
To manage passwords from the service worker, you can use the following commands in the Chrome DevTools console(in your service worker):
- To view the stored password:
```bash 
chrome.storage.local.get('appPassword', (data) => {
  console.log('Stored Password:', data.appPassword);
});
```
- To remove the stored password:
```bash
chrome.storage.local.remove('appPassword', () => {
  console.log('Password removed successfully.');
});
```

## Screenshots
![App Screenshot](https://github.com/The-x-35/tab-locker-room/blob/master/public/1.png?raw=true)
![App Screenshot](https://github.com/The-x-35/tab-locker-room/blob/master/public/2.png?raw=true)
![App Screenshot](https://github.com/The-x-35/tab-locker-room/blob/master/public/3.png?raw=true)
![App Screenshot](https://github.com/The-x-35/tab-locker-room/blob/master/public/4.png?raw=true)

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request or raise an issue.


## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/The-x-35/tab-locker-room/blob/master/LICENSE) file for details.




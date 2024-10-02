import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);

rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.body.style.width = '300px';  
document.body.style.height = '400px'; 
document.body.style.backgroundColor = 'black';

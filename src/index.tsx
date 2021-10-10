import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY ?? '',
    authDomain: process.env.REACT_APP_AUTHDOMAIN ?? '',
    databaseURL: process.env.REACT_APP_DB ?? '',
    projectId: process.env.REACT_APP_PID ?? '',
    storageBucket: process.env.REACT_APP_SB ?? '',
    messagingSenderId: process.env.REACT_APP_SID ?? '',
    appId: process.env.REACT_APP_APPID ?? ''
    // measurementId:process.env.REACT_APP_MID ?? ''
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

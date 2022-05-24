import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'flowbite';
import { TransContextProvider } from './contexts/transContext';

ReactDOM.render(
  <React.StrictMode>
    <TransContextProvider>
      <App />
    </TransContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

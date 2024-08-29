import React from 'react';
import ReactDOM from 'react-dom'; // Use react-dom without /client
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

// ReactDOM.render instead of createRoot
ReactDOM.render(
  // <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>,
  // </React.StrictMode>
  document.getElementById('root')
);

reportWebVitals();

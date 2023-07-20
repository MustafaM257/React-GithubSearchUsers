import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
//mustafa-m257.us.auth0.com
//11ds3RsR9FCFOKEA18UMUlEffoIvh15C
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GithubProvider> 
    <App />
    </GithubProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

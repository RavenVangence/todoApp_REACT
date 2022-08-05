import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
//CSS
import './index.css';

const Main = () => {
  return <>
    <App/>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>)
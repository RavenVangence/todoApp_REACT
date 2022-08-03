import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const Main = () => {
  return <>
    <App/>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>)
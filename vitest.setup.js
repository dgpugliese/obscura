import React from 'react';
import ReactDOMClient from 'react-dom/client';

globalThis.React = React;
globalThis.ReactDOM = { createRoot: ReactDOMClient.createRoot };

// Create a mock root element so ReactDOM.createRoot doesn't fail
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

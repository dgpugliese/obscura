import React from 'react';
import ReactDOM from 'react-dom/client';

globalThis.React = React;
globalThis.ReactDOM = ReactDOM;

// Create root element for tests
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

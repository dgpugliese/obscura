import React from 'react';
import ReactDOM from 'react-dom/client';

global.React = React;
global.ReactDOM = ReactDOM;

// mock for the dom
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

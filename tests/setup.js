import React from 'react';
import ReactDOM from 'react-dom/client';
global.React = React;
global.ReactDOM = ReactDOM;
// Mock document.getElementById so it doesn't fail when ReactDOM.createRoot is called
const mockRoot = { render: () => {} };
global.document.getElementById = () => ({});
global.ReactDOM.createRoot = () => mockRoot;

import React from 'react';
global.React = React;

const rootMock = { render: () => {} };
global.ReactDOM = {
  createRoot: () => rootMock
};

document.body.innerHTML = '<div id="root"></div>';

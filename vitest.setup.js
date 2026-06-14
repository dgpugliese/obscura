import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOM from 'react-dom';

global.React = React;
global.ReactDOM = {
  ...ReactDOM,
  createRoot: (element) => {
    return {
      render: () => {},
      unmount: () => {}
    };
  }
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

globalThis.React = React;
globalThis.ReactDOM = {
  ...ReactDOMClient,
  createRoot: () => ({
    render: () => {}
  })
};

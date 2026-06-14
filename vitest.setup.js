import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';

global.React = React;
global.ReactDOM = { ...ReactDOM, ...ReactDOMClient };
global.document.getElementById = () => document.createElement('div');

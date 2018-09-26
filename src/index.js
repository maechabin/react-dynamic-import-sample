import React from 'react';
import ReactDOM from 'react-dom';
import ToDoAppContainer, { store } from './App';
import App from './App2';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
/*
ReactDOM.render(
  <Provider store={store}>
    <ToDoAppContainer />
  </Provider>,
  document.getElementById('root')
);
*/
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();

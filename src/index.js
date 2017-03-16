import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './configureStore';
import Root from './components/Root';
import { fetchTodos } from './api';
const store = configureStore();

fetchTodos('all').then(todos =>
  console.log(todos) // eslint-disable-line no-console
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);


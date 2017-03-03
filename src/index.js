import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'

const store = createStore(todoApp);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);



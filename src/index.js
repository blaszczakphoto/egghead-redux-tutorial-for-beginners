import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'

const persistedState = {
  todos: [{
    id: 1,
    title: 'Narysować cebule',
    completed: false,
  },
  {
    id: 2,
    title: 'Zjeść cebule',
    completed: false,
  }]
}

const store = createStore(todoApp, persistedState);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);



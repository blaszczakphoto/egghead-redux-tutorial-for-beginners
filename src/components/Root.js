import React from 'react'

import TodoApp from './TodoApp'
import { Provider } from 'react-redux'

const Root = ({ store }) => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

export default Root;

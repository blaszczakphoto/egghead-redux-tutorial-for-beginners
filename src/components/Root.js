import React from 'react'
import TodoApp from './TodoApp'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>  
      <Route path='/' component={TodoApp} />
    </Router>
  </Provider>
);

export default Root;

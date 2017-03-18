import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const configureStore = () => {
  const middlewares = [promise, createLogger()];
  return createStore(todoApp, applyMiddleware(...middlewares));
};


export default configureStore;

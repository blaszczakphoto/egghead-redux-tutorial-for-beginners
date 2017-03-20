import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk, createLogger()];
  return createStore(todoApp, applyMiddleware(...middlewares));
};


export default configureStore;

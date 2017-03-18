import { createStore } from 'redux';
import todoApp from './reducers';

const logger = (store) => (next) => (action) => {
  /* eslint-disable no-console */
  console.group(action.type);
  console.log('%c prev state', 'color: gray', store.getState());
  console.log('%c action', 'color: blue', action);
  const returnValue = next(action);
  console.log('%c next state', 'color: gray', store.getState());
  console.groupEnd(action.type);
  /* eslint-enable no-console */
  return returnValue;
};

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  );
};

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise, logger];
  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};


export default configureStore;

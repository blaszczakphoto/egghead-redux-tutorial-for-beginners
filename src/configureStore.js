import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  return (action) => {
    /* eslint-disable no-console */
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: gray', store.getState());
    console.groupEnd(action.type);
    /* eslint-enable no-console */
    return returnValue;
  };
};

const configureStore = () => {
  const store = createStore(todoApp);

  store.dispatch = addLoggingToDispatch(store);

  return store;
};


export default configureStore;

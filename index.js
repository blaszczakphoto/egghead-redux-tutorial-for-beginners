const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => {
    return state;
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  dispatch({})

  return { getState, dispatch, subscribe };
}

const store = createStore(counter);


store.dispatch({ type: 'INCREMENT' });



const render = () => {
  document.body.innerText = store.getState();
}

store.subscribe(() => {
  render();
})
render();

document.body.addEventListener('click', (event) => {
  store.dispatch({ type: 'INCREMENT' });
})


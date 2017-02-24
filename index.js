var expect = require('expect');
var Redux = require('redux');
var createStore = Redux.createStore;

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

const store = createStore(counter);

console.log(store.getState());

store.dispatch({ type: 'INCREMENT' });

console.log(store.getState());

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


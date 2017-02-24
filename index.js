var redux = require('redux');
var reactDOM = require('react-dom');
var React = require('react');

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

const createStore = redux.createStore;
const store = createStore(counter);

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onDecrementClick}>-</button>
        <button onClick={this.props.onIncrementClick}>+</button>
      </div>
    )
  }
}

store.dispatch({ type: 'INCREMENT' });



const render = () => {
  reactDOM.render(
    <Counter 
      value={store.getState()} 
      onDecrementClick={() => store.dispatch({type: 'DECREMENT'})}
      onIncrementClick={() => store.dispatch({type: 'INCREMENT'})}
    />,
    document.getElementById('root')
  );
}

store.subscribe(() => {
  render();
});

render();


import expect from 'expect'
import deepFreeze from 'deep-freeze'
import { createStore, combineReducers } from 'redux'
import React from 'react';
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        title: action.title,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

let store = createStore(todoApp);

class TodoApp extends React.Component {
  render() {
    const { addTodoSubmit, todos } = this.props;
    return (
      <div>
        <input type="text" placeholder="Type todo..." ref={node => {this.inputText = node}} />
        <button onClick={() => {
          addTodoSubmit(this.inputText.value);
          this.inputText.value = null;  
        }}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
});

let lastId = 3;
const mapDispatchToProps = (dispatch) => ({
  addTodoSubmit: (title) => {
    dispatch({
      type: 'ADD_TODO',
      id: ++lastId,
      title,
    })
  }
})

const TodoAppContainer = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

ReactDOM.render(
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('root')
);
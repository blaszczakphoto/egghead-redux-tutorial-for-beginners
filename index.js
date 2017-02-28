import { createStore, combineReducers } from 'redux'
import ReactDOM from 'react-dom'
import React from 'react'


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

let lastTodoId = 0;
class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input type="text" ref={(node) => {this.input = node;}} placeholder="todo title" />
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              title: this.input.value,
              id: lastTodoId++
            });
            this.input.value = '';
          }}
        >
          Add todo
        </button>
        <ul>
          {this.props.todos.map(todo => 
            <li key={todo.id}>
              {todo.title}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
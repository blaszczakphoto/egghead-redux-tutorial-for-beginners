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

const FilterLink = ({filter, currentFilter, children}) => {
  if (currentFilter == filter) {
    return <span>{children}</span>
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: filter
        })
      }}
    >
      {children}
    </a>
  )
}


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((todo) => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => !todo.completed);
  }
}

const TodoList = ({todos, onClickTodo}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        onClick={() => {
          onClickTodo(todo.id)
        }}
        {...todo}
      />
    )}
  </ul>
)

const Todo = ({title, completed, onClick}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: (completed) ? 'line-through' : 'none'
    }}
  >
    {title}
  </li>
)

let lastTodoId = 0;
class TodoApp extends React.Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div>
        <input type="text" ref={(node) => { this.input = node; }} placeholder="todo title" />
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
        <TodoList
          todos={visibleTodos}
          onClickTodo={(todoId) => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id: todoId
            })
          }}
        />
        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState() }
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
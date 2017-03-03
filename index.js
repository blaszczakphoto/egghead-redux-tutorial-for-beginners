import { createStore, combineReducers } from 'redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider, connect } from 'react-redux'



let lastTodoId = 0;
const addTodo = (title) => {
  return {
    type: 'ADD_TODO',
    title,
    id: lastTodoId++
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  }
}

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

const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        onClick={() => onClickTodo(todo.id)}
        {...todo}
      />
    )}
  </ul>
)

const Todo = ({ title, completed, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: (completed) ? 'line-through' : 'none'
    }}
  >
    {title}
  </li>
)

let AddTodo = ({dispatch}) => {
  let input;
  return (
    <div>
      <input type="text" ref={(node) => { input = node; }} placeholder="todo title" />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add todo
      </button>
    </div>
  )
}
AddTodo = connect(null, null)(AddTodo);

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  )
}

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}



const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
  </p>
)

const mapStateToTodoListProps = (state) => {
  return ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  })
}



const mapDispatchToTodoListProps = (dispatch) => {
  return ({
    onClickTodo: (todoId) => {
      dispatch(toggleTodo(todoId))
    }
  })
};

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)


const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);



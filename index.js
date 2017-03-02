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

store.dispatch({type: 'ADD_TODO', title: 'ABCD', id: 100})
store.dispatch({type: 'ADD_TODO', title: 'YUIIO', id: 101})
store.dispatch({type: 'ADD_TODO', title: 'GHHJ', id: 102})
store.dispatch({type: 'TOGGLE_TODO', id: 102})


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

const AddTodo = ({onAddTodoClick}) => {
  let input;
  return (
    <div>
      <input type="text" ref={(node) => { input = node; }} placeholder="todo title" />
      <button
        onClick={() => {
          onAddTodoClick(input)
        }}
      >
        Add todo
      </button>
    </div>
  )
}

const Link = ({active, children, onClick}) => {
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

class FilterLink extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => 
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

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

let lastTodoId = 0;
class TodoApp extends React.Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div>
        <AddTodo
          onAddTodoClick={(input) => {
            store.dispatch({
              type: 'ADD_TODO',
              title: input.value,
              id: lastTodoId++
            });
            input.value = '';
          }}
        />
        <TodoList
          todos={visibleTodos}
          onClickTodo={(todoId) => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id: todoId
            })
          }}
        />
        <Footer />
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
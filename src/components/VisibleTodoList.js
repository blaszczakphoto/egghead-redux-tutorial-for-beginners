import { connect } from 'react-redux'
import TodoList from './TodoList'
import { toggleTodo } from '../actions'

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

const mapStateTodoProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchTodoProps = (dispatch) => ({
  onClickTodo(todoId) {
    dispatch(toggleTodo(todoId))
  }
});

const VisibleTodoList = connect(
  mapStateTodoProps,
  mapDispatchTodoProps
)(TodoList);

export default VisibleTodoList;
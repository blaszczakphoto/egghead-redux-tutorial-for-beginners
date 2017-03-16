import { connect } from 'react-redux'
import TodoList from './TodoList'
import { toggleTodo } from '../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'active':
      return todos.filter((todo) => !todo.completed);
  }
}

const mapStateTodoProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter)
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
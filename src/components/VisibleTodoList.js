import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';
import { withRouter } from 'react-router';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'active':
      return todos.filter((todo) => !todo.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

const mapStateTodoProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state.todos,
    params.filter || 'all'
  ),
});

const VisibleTodoList = withRouter(connect(
  mapStateTodoProps,
  { onClickTodo: toggleTodo }
)(TodoList));

export default VisibleTodoList;

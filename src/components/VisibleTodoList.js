import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers'


const mapStateTodoProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state,
    params.filter || 'all'
  ),
});

const VisibleTodoList = withRouter(connect(
  mapStateTodoProps,
  { onClickTodo: toggleTodo }
)(TodoList));

export default VisibleTodoList;

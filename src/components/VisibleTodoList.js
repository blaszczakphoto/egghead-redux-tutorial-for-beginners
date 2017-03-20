import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos, getIsFetching } from '../reducers';


class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchdata();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchdata();
    }
  }

  fetchdata() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return (
      <TodoList
        todos={todos}
        onClickTodo={toggleTodo}
      />
    );
  }
}
VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateTodoProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(connect(
  mapStateTodoProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;

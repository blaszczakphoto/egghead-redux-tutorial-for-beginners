import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';


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
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
        onClickTodo={toggleTodo}
      />
    );
  }
}
VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const mapStateTodoProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(connect(
  mapStateTodoProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;

import React, { PropTypes } from 'react';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';
import AddTodo from './AddTodo';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

TodoApp.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string,
  }),
};
export default TodoApp;

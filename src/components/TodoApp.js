import React, { PropTypes } from 'react';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';
import AddTodo from './AddTodo';

const TodoApp = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all'} />
    <Footer />
  </div>
);

TodoApp.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string,
  }),
};
export default TodoApp;

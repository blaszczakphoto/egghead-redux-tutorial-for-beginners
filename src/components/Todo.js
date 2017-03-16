import React, { PropTypes } from 'react';

const Todo = ({ title, completed, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: (completed) ? 'line-through' : 'none',
    }}
  >
    {title}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Todo;

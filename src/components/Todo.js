import React from 'react'

const Todo = ({ title, completed, onClick }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: (completed) ? 'line-through' : 'none'
    }}
  >
    {title}
  </li>
)

export default Todo;
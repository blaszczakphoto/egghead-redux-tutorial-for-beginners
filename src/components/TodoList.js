import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        onClick={() => onClickTodo(todo.id)}
        {...todo}
      />
    )}
  </ul>
)

export default TodoList;
import React from 'react'
import Footer from './Footer'
import VisibleTodoList from './VisibleTodoList'
import AddTodo from './AddTodo'

const TodoApp = ({params}) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all'} />
    <Footer />
  </div>
);

export default TodoApp;
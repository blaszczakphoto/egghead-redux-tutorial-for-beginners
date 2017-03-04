import {v4 as generateUniqueId } from 'node-uuid'

let lastTodoId = 0;
export const addTodo = (title) => ({
  type: 'ADD_TODO',
  title,
  id: generateUniqueId()
})


export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
})


export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id: id
})
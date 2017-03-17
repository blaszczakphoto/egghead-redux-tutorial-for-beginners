import { v4 as generateUniqueId } from 'node-uuid';

export const addTodo = (title) => ({
  type: 'ADD_TODO',
  title,
  id: generateUniqueId(),
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

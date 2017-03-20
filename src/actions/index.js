import { v4 as generateUniqueId } from 'node-uuid';
import * as api from '../api';

export const addTodo = (title) => ({
  type: 'ADD_TODO',
  title,
  id: generateUniqueId(),
});

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};



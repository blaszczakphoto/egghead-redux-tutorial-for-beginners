let lastTodoId = 0;
export const addTodo = (title) => {
  return {
    type: 'ADD_TODO',
    title,
    id: lastTodoId++
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  }
}
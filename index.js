import expect from 'expect'
import deepFreeze from 'deep-freeze'

const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
}

const testToggleTodo = () => {
  const todoBefore = { completed: false }
  const todoAfter = { completed: true }
  deepFreeze(todoBefore);
  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
}

testToggleTodo();
console.log("test passed!");
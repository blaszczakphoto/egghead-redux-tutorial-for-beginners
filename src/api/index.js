import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [{
    id: v4(),
    title: 'hey',
    completed: true,
  }, {
    id: v4(),
    title: 'ho',
    completed: true,
  }, {
    id: v4(),
    title: 'let’s go',
    completed: false,
  }],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export const addTodo = (title) =>
  delay(500).then(() => {
    const todo = {
      title,
      id: v4(),
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = (id) =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    const index = fakeDatabase.todos.indexOf(todo);
    todo.completed = !todo.completed;
    fakeDatabase.todos[index] = todo;
    console.log(fakeDatabase);
    return todo;
  });

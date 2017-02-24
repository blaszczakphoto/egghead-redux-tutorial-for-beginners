import expect from 'expect'
import deepFreeze from 'deep-freeze'

const addTodo = (state = [], action) => {
  return [
    ...state,
    {
      id: action.id,
      title: action.title,
      completed: false
    }
  ]
}

const test = () => {
  const before = [];
  const after = [
    {
      id: 0,
      title: 'Learn Redux',
      completed: false
    }
  ];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    title: 'Learn Redux'
  };

  deepFreeze(before);
  deepFreeze(action);
  expect(addTodo(before, action)).toEqual(after);
}

test();
console.log("test passed!");
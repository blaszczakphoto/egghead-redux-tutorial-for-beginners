import expect from 'expect'
import deepFreeze from 'deep-freeze'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        title: action.title,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state;
  }
}

const testAddTodo = () => {
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
  expect(todos(before, action)).toEqual(after);
}

const testToggleTodo = () => {
  const before = [
    {
      id: 0,
      title: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      title: 'Go jogging',
      completed: false
    }
  ];
  const after = [
    {
      id: 0,
      title: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      title: 'Go jogging',
      completed: true
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };

  deepFreeze(before);
  deepFreeze(action);
  expect(todos(before, action)).toEqual(after);
}

testAddTodo();
testToggleTodo();
console.log("test passed!");
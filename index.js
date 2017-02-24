import expect from 'expect'
import deepFreeze from 'deep-freeze'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      })
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
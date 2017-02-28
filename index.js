import expect from 'expect'
import deepFreeze from 'deep-freeze'
import { createStore } from 'redux'



const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

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

const combineReducers = (reducers) => {
  return ((state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    )
  });
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

let store = createStore(todoApp);
console.log("current state");
console.log(store.getState());
console.log("--------------------");

console.log("dispatch add todo");
store.dispatch({ type: 'ADD_TODO', title: 'Learn redux!', id: 0 });
console.log("current state");
console.log(store.getState());
console.log("--------------------");

console.log("dispatch add todo");
store.dispatch({ type: 'ADD_TODO', title: 'Learn redux more!', id: 1 });
console.log("current state");
console.log(store.getState());
console.log("--------------------");

console.log("dispatch toggle todo");
store.dispatch({ type: 'TOGGLE_TODO', id: 1 });
console.log("current state");
console.log(store.getState());
console.log("--------------------");

console.log("dispatch SET_VISIBILITY_FILTER");
store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' });
console.log("current state");
console.log(store.getState());
console.log("--------------------");


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
export const loadState = () => {
  try {
    console.log("trying to load the state");
    const serializedState = localStorage.getItem('state');
    console.log("serializedState", serializedState);

    
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',  serializedState);
  } catch (err) {
    console.log("fail to write to localstorage", err);
  }
}
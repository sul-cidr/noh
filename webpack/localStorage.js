export const loadState = browserStorageKey => {
  // returning undefined will cause redux to use the default values
  try {
    const serializedState = localStorage.getItem(browserStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, browserStorageKey) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(browserStorageKey, serializedState);
  } catch (err) {
    // write error
  }
};

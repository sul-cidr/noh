export const loadState = storageKeys => {
  // returning undefined will cause redux to use the default values
  try {
    const deserializedState = []
      .concat(storageKeys)
      .reduce(
        (accumulator, storageKey) =>
          Object.assign(
            JSON.parse(localStorage.getItem(storageKey)) || {},
            accumulator
          ),
        {}
      );
    return deserializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, storageKey) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageKey, serializedState);
  } catch (err) {
    // write error
  }
};

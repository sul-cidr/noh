import reducers from '../reducers';

test('reducers', () => {
  const state = reducers(
    { currentTime: 0 },
    { type: 'SET_CURRENT_TIME', payload: 3 }
  );
  expect(state).toEqual({ currentTime: 3 });
});

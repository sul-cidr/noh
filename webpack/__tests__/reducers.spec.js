import reducers from "../reducers";

test("it sets currenTime", () => {
  const state = reducers(
    { currentTime: 0 },
    { type: "SET_CURRENT_TIME", payload: 3 }
  );
  expect(state).toEqual({ currentTime: 3 });
});

test("it sets isPlaying to true", () => {
  const state = reducers(
    { currentTime: 0, isPlaying: false },
    { type: "SET_IS_PLAYING", payload: true }
  );
  expect(state).toEqual({ currentTime: 0, isPlaying: true });
});

test("it sets isPlaying to false", () => {
  const state = reducers(
    { currentTime: 10.0, isPlaying: true },
    { type: "SET_IS_PLAYING", payload: false }
  );
  expect(state).toEqual({ currentTime: 10.0, isPlaying: false });
});

test("it sets startTime", () => {
  const state = reducers(
    { startTime: 0 },
    { type: "SET_START_TIME", payload: 3 }
  );
  expect(state).toEqual({ startTime: 3 });
});

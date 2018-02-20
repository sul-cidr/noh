import reducers from "../reducers";

test("it sets currentTime correctly", () => {
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

test("it sets currentPhraseID correctly", () => {
  const state = reducers(
    { currentTime: 2, isPlaying: true, currentPhraseID: "I/1" },
    { type: "SET_CURRENT_PHRASE_ID", payload: "II/1" }
  );
  expect(state).toEqual({
    currentTime: 2,
    isPlaying: true,
    currentPhraseID: "II/1"
  });
});

test("it sets toggles correctly", () => {
  const state = reducers(
    { toggles: { isTextOn: true } },
    { type: "SET_SCORE_TOGGLES", payload: { isTextOn: false, isBeatOn: false } }
  );
  expect(state).toEqual({
    toggles: {
      isTextOn: false,
      isBeatOn: false
    }
  });
});

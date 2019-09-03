import reducers, { DEFAULT_STATE } from "../reducers";

test("it sets default state correctly", () => {
  const state = reducers(undefined, { type: null, payload: null });
  expect(state).toEqual(DEFAULT_STATE);
});

test("it sets currentTime correctly", () => {
  const state = reducers(
    { currentTime: 0 },
    { type: "SET_CURRENT_TIME", payload: 3 }
  );
  expect(state).toEqual({ currentTime: 3 });
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

test("it sets narrativeTab correctly", () => {
  const state = reducers(
    { narrativeTab: 1 },
    { type: "SET_NARRATIVE_TAB", payload: 1 }
  );
  expect(state).toEqual({ narrativeTab: 1 });
});

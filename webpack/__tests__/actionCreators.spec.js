import {
  setCurrentTime,
  setIsPlaying,
  setStartTime,
  setCurrentPhraseID
} from "../actionCreators";

test("setIsPlaying creates the correct payload", () => {
  expect(setIsPlaying(true)).toMatchSnapshot();
});

test("setCurrentTime creates the correct payload", () => {
  expect(setCurrentTime(30)).toMatchSnapshot();
});

test("setStartTime creates the correct payload", () => {
  expect(setStartTime(30)).toMatchSnapshot();
});

test("setCurrentPhraseID creates the correct payload", () => {
  expect(setCurrentPhraseID("II/1")).toMatchSnapshot();
});

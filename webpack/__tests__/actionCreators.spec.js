import {
  setCurrentTime,
  setStartTime,
  setCurrentPhraseID,
  setScoreToggles,
  setNarrativeTab
} from "../actionCreators";

test("setCurrentTime creates the correct payload", () => {
  expect(setCurrentTime(30)).toMatchSnapshot();
});

test("setStartTime creates the correct payload", () => {
  expect(setStartTime(30)).toMatchSnapshot();
});

test("setCurrentPhraseID creates the correct payload", () => {
  expect(setCurrentPhraseID("II/1")).toMatchSnapshot();
});

test("setScoreToggles creates the correct payload", () => {
  expect(
    setScoreToggles({ isTextOn: false, isBeatOn: false })
  ).toMatchSnapshot();
});

test("setNarrativeTab creates the correct payload", () => {
  expect(setNarrativeTab(1)).toMatchSnapshot();
});

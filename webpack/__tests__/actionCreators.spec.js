import { setCurrentTime, setStartTime, setIsPlaying } from "../actionCreators";

test("setIsPlaying creates the correct payload", () => {
  expect(setIsPlaying(true)).toMatchSnapshot();
});

test("setCurrentTime creates the correct payload", () => {
  expect(setCurrentTime(30)).toMatchSnapshot();
});

test("setStartTime creates the correct payload", () => {
  expect(setStartTime(30)).toMatchSnapshot();
});

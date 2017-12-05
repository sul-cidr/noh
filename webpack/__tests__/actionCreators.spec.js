import { setCurrentTime } from "../actionCreators";

test("setCurrentTime creates the correct payload", () => {
  expect(setCurrentTime(30)).toMatchSnapshot();
});

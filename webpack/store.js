/* eslint-disable no-underscore-dangle */
import { createStore } from "redux";
import reducer, { DEFAULT_STATE } from "./reducers";
import { reduxDevTools } from "./utils";
import { loadState } from "./localStorage";

const store = createStore(
  reducer,
  Object.assign({}, DEFAULT_STATE, loadState()),
  reduxDevTools()
);

export default store;

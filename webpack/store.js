/* eslint-disable no-underscore-dangle */
import { createStore } from "redux";
import reducer, { DEFAULT_STATE } from "./reducers";
import { reduxDevTools } from "./utils";
import { loadState as loadStateFromLocalStorage } from "./localStorage";
import { loadState as loadStateFromSessionStorage } from "./sessionStorage";

const store = createStore(
  reducer,
  Object.assign(
    {},
    DEFAULT_STATE,
    loadStateFromLocalStorage(),
    loadStateFromSessionStorage()
  ),
  reduxDevTools()
);

export default store;

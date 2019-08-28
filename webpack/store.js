import { createStore } from "redux";
import reducer, { DEFAULT_STATE } from "./reducers";
import { reduxDevTools } from "./utils";
import { loadState as loadStateFromLocalStorage } from "./localStorage";
import { loadState as loadStateFromSessionStorage } from "./sessionStorage";

const initializeStore = browserStorageKey =>
  createStore(
    reducer,
    Object.assign(
      {},
      DEFAULT_STATE,
      loadStateFromLocalStorage(browserStorageKey),
      loadStateFromSessionStorage(browserStorageKey)
    ),
    reduxDevTools()
  );

export default initializeStore;

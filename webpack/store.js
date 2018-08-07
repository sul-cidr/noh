/* eslint-disable no-underscore-dangle */
import { createStore } from "redux";
import reducer from "./reducers";
import { reduxDevTools } from "./utils";

const store = createStore(reducer, reduxDevTools());

export default store;

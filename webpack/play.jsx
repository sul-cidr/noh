import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MasterVideo from "./components/MasterVideo";
import Dance from "./components/Dance";
import Timeline from "./components/Timeline";
import Narrative from "./components/Narrative";
import store from "./store";
import contents from "./contents";

const App = props => (
  <Provider store={store}>
    <div className="app">
      <Narrative narrative={props.narrative} />
      <MasterVideo videoUrl={props.videoUrl} />
      <Dance />
      <Timeline />
    </div>
  </Provider>
);

App.propTypes = {
  narrative: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired
}

const play = window.location.pathname.trim().split("/")[1];

contents.play(play, props => {
  render(<App {...props} />, document.getElementById("play"));
});

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MasterVideo from "./components/MasterVideo";
import Dance from "./components/Dance";
import Timeline from "./components/Timeline";
import Narrative from "./components/Narrative";
import store from "./store";

const analysis =
  "<div title='section one with many words in title' class='tabbed-narrative'><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div><br><div title='section two'><p>Different stuff</p></div>";

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Narrative narrative={analysis} />
      <MasterVideo videoUrl="https://www.dropbox.com/s/r1kcgknu22b6iao/hashitomi-kiri-dance-part1.mov?dl=1" />
      <Dance />
      <Timeline />
    </div>
  </Provider>
);

render(<App />, document.getElementById("play"));

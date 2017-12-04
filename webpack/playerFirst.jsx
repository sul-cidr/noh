import React from "react";
import { render } from "react-dom";
import ShodanTimeline from "./components/ShodanTimeline";
import TimeMarks from "./components/TimeMarks";

const App = () => (
  <div>
    <TimeMarks />
    <ShodanTimeline />
  </div>
);

render(<App />, document.getElementById("playerFirst"));

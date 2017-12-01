import React from "react";
import { render } from "react-dom";
import ShodanTimeline from "./components/ShodanTimeline";

const App = () => (
  <div>
    <ShodanTimeline />
  </div>
);

render(<App />, document.getElementById("playerFirst"));

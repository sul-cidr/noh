import React from "react";
import { render } from "react-dom";
import IntermediaTable from "./components/IntermediaTable";
import ShodanTimeline from "./components/ShodanTimeline";
import TimeMarks from "./components/TimeMarks";

const App = () => (
  <div>
    <TimeMarks />
    <ShodanTimeline />
    <IntermediaTable />
  </div>
);

render(<App />, document.getElementById("playerFirst"));

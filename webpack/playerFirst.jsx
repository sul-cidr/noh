import React from "react";
import { render } from "react-dom";
import TimeMarks from "./components/TimeMarks"

const App = () => (
  <div>
    <TimeMarks />
  </div>
);

render(<App />, document.getElementById("playerFirst"));

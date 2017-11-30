import React from "react";
import { render } from "react-dom";
import IntermediaTable from "./components/IntermediaTable";

const App = () => (
  <div>
    <IntermediaTable />
  </div>
);

render(<App />, document.getElementById("playerFirst"));

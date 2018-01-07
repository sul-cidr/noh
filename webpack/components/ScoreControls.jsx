import React from "react";

const ScoreControls = () => (
  <div className="score-controls">
    <ul className="channel-toggles">
      <li>
        <label>
          <input type="checkbox" />
          <span>Beat</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>Text</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>Percussion</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>Nohkan</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>Dance</span>
        </label>
      </li>
    </ul>
    <ul className="measure-toggles">
      <li>
        <label>
          <input type="checkbox" />
          <span>Prev Measure</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>Next Measure</span>
        </label>
      </li>
    </ul>
  </div>
);

export default ScoreControls;

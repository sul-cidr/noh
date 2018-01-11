import React from "react";
import MeasureLabelContainer from "./MeasureLabelContainer";
import CellBeat from "./CellBeat";

const Score = () => {
  const prevBeatNums = [
    "",
    "1",
    "",
    "2",
    "",
    "3",
    "4",
    "",
    "5",
    "6",
    "",
    "7",
    "",
    "8"
  ];
  const currentBeatNums = [
    "",
    "1",
    "",
    "2",
    "",
    "3",
    "",
    "4",
    "",
    "5",
    "",
    "6",
    "",
    "7",
    "",
    "8"
  ];
  const nextBeatNums = [
    "",
    "1",
    "",
    "2",
    "",
    "3",
    "4",
    "",
    "5",
    "6",
    "",
    "7",
    "",
    "8"
  ];
  const prevBeats = prevBeatNums.map((num, idx) => (
    <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
  ));
  const currentBeats = currentBeatNums.map((num, idx) => (
    <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
  ));
  const nextBeats = nextBeatNums.map((num, idx) => (
    <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
  ));
  return (
    <div className="score">
      <div className="measure measure--prev">
        <MeasureLabelContainer previous />
        <div className="measure__grid-container">
          <div className="measure__channel">{prevBeats}</div>
          <div className="measure__channel measure__channel--large">
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text">ke</div>
            <div className="cell cell--1 cell--text">i</div>
            <div className="cell cell--1 cell--text">ko</div>
            <div className="cell cell--1 cell--text">o</div>
            <div className="cell cell--1 cell--text">te</div>
            <div className="cell cell--1 cell--text">n</div>
            <div className="cell cell--1 cell--text">no</div>
            <div className="cell cell--1 cell--text">o</div>
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
          </div>
          <div className="measure__channel">
            <div className="cell cell--14">Tsuzuke</div>
          </div>
          <div className="measure__channel">
            <div className="cell cell--2 cell--dance" />
            <div className="cell cell--9 cell--dance">grid</div>
            <div className="cell cell--3 cell--dance" />
          </div>
          <div className="measure__channel">
            <div className="cell cell--3" />
            <div className="cell cell--6 cell--dance">
              Sits back on his knee (9)
            </div>
            <div className="cell cell--5" />
          </div>
        </div>
      </div>
      <div className="measure measure--current">
        <MeasureLabelContainer />
        <div className="measure__grid-container">
          <div className="measure__channel">{currentBeats}</div>
          <div className="measure__channel measure__channel--large">
            <div className="cell cell--2 cell--text" />
            <div className="cell cell--5 cell--text">
              Tachibana no michinari to wa,
              <span className="cell__character cell__character--begin cell__character--jiutai" />
              <span className="cell__range--low" />
            </div>
            <div className="cell cell--1 cell--text">
              waga
              <span className="cell__character cell__character--end cell__character--jiutai" />
              <span className="cell__range--medium" />
            </div>
            <div className="cell cell--2 cell--text">
              koto nari.
              <span className="cell__character cell__character--begin cell__character--end cell__character--shite" />
              <span className="cell__range--high" />
            </div>
            <div className="cell cell--6 cell--text" />
          </div>
          <div className="measure__channel">
            <div className="cell cell--2" />
            <div className="cell cell--12">Tsuzuke</div>
            <div className="cell cell--2" />
          </div>
          <div className="measure__channel">
            <div className="cell cell--2 cell--nohkan">grid</div>
            <div className="cell cell--8 cell--nohkan">grid</div>
            <div className="cell cell--6 cell--nohkan">grid</div>
          </div>
          <div className="measure__channel">
            <div className="cell cell--3" />
            <div className="cell cell--6 cell--dance">
              Sits back on his knee (9)
            </div>
            <div className="cell cell--7" />
          </div>
        </div>
      </div>
      <div className="measure measure--next">
        <MeasureLabelContainer next />
        <div className="measure__grid-container">
          <div className="measure__channel">{nextBeats}</div>
          <div className="measure__channel measure__channel--large">
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text">ke</div>
            <div className="cell cell--1 cell--text">i</div>
            <div className="cell cell--1 cell--text">ko</div>
            <div className="cell cell--1 cell--text">o</div>
            <div className="cell cell--1 cell--text">te</div>
            <div className="cell cell--1 cell--text">n</div>
            <div className="cell cell--1 cell--text">no</div>
            <div className="cell cell--1 cell--text">o</div>
            <div className="cell cell--1 cell--text" />
            <div className="cell cell--1 cell--text" />
          </div>
          <div className="measure__channel">
            <div className="cell cell--14">Tsuzuke</div>
          </div>
          <div className="measure__channel">
            <div className="cell cell--2 cell--dance" />
            <div className="cell cell--9 cell--dance">grid</div>
            <div className="cell cell--3 cell--dance" />
          </div>
          <div className="measure__channel">
            <div className="cell cell--3" />
            <div className="cell cell--6 cell--dance">
              Sits back on his knee (9)
            </div>
            <div className="cell cell--5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MasterVideo from './components/MasterVideo';
import Dance from './components/Dance';
import Timeline from './components/Timeline';
import store from './store';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <MasterVideo videoUrl="https://www.dropbox.com/s/r1kcgknu22b6iao/hashitomi-kiri-dance-part1.mov?dl=1" />
      <Dance />
      <Timeline />
    </div>
  </Provider>
);

render(<App />, document.getElementById('hello'));

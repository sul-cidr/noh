import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Unwrapped as UnwrappedTimelineIndicator } from '../components/TimelineIndicator';

describe('<TimelineIndicator>', () => {

  it('renders as expected with no interval, currentTime, and no isPlaying', () => {
    const component = shallow(
      <UnwrappedTimelineIndicator
        duration={100}
        currentTime={10}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders as expected with no interval, currentTime, and isPlaying', () => {
    const component = shallow(
      <UnwrappedTimelineIndicator
        duration={100}
        currentTime={10}
        isPlaying
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders as expected with interval, currentTime, and no isPlaying', () => {
    const component = shallow(
      <UnwrappedTimelineIndicator
        duration={100}
        interval={10}
        currentTime={10}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders as expected with interval, currentTime, and isPlaying', () => {
    const component = shallow(
      <UnwrappedTimelineIndicator
        duration={100}
        interval={10}
        currentTime={10}
        isPlaying
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('unmounts correctly the component', () => {
    const container = document.createElement('div');
    mount(
      <UnwrappedTimelineIndicator
        duration={100}
        currentTime={0}
      />, { attachTo: container }
    );
    ReactDOM.unmountComponentAtNode(container);
  });

  it('sets and run the inner timer', () => {
    jest.useFakeTimers();
    expect(setInterval.mock.calls.length).toBe(0);
    mount(
      <UnwrappedTimelineIndicator
        duration={100}
        interval={10}
        currentTime={10}
        isPlaying
      />
    );
    expect(setInterval.mock.calls.length).toBe(1);
  });

  it('clears the timer after video is played', () => {
    const component = mount(
      <UnwrappedTimelineIndicator
        duration={100}
        interval={10}
        currentTime={101}
        isPlaying
      />
    );
    component.instance().tick()
    expect(component.instance().calculateRemainingTime()).toBeLessThanOrEqual(0)
  });
});

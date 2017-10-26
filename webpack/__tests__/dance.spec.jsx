import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedDance } from '../components/Dance';

describe('<Dance>', () => {
  it('renders as expected', () => {
    const component = shallow(<UnwrappedDance />);
    expect(component).toMatchSnapshot();
  });

  it('correctly calculates current dance name', () => {
    const component = shallow(<UnwrappedDance currentTime={30} />);
    const name = component.instance().currentDance();
    expect(name).toBe('Ageha');
  });

  it('correctly calculates dance videourl from dance name', () => {
    const component = shallow(<UnwrappedDance currentTime={30} />);
    const url = component.instance().danceVideoUrl();
    expect(url).toBe('./videos/ageha_Front.mov');
  });
});

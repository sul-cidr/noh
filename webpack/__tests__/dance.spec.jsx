import React from 'react';
import { shallow } from 'enzyme';
import { Unwrapped as UnwrappedDance } from '../components/Dance';

describe('<Dance>', () => {
  it('renders as expected with no currentTime', () => {
    const component = shallow(<UnwrappedDance />);
    expect(component).toMatchSnapshot();
  });

  it('renders as expected with currentTime', () => {
    const component = shallow(<UnwrappedDance currentTime={30} />);
    expect(component).toMatchSnapshot();
  });
});

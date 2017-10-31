import React from 'react';
import { shallow } from 'enzyme';
import SimpleVideo from '../components/SimpleVideo';

describe('<SimpleVideo>', () => {
  it('renders as expected', () => {
    const component = shallow(<SimpleVideo />);
    expect(component).toMatchSnapshot();
  });
});

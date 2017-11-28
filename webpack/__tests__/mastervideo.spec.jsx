import React from 'react';
import { mount } from 'enzyme';
import { Unwrapped as UnwrappedMasterVideo } from '../components/MasterVideo';

describe('<MasterVideo>', () => {
  it('renders as expected', () => {
    const container = document.createElement('div');
    const component = mount(<UnwrappedMasterVideo />, {
      attachTo: container
    });
    expect(component).toMatchSnapshot();
  });
});

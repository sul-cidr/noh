import React from 'react';
import { mount } from 'enzyme';
import { Unwrapped as UnwrappedMasterVideo } from '../components/MasterVideo';

describe('<MasterVideo>', () => {
  it('renders as expected', () => {
    // We have to attach directly to document.body for component to have access to document for now, despite a generated warning
    const component = mount(<UnwrappedMasterVideo />, {
      attachTo: document.body
    });
    expect(component).toMatchSnapshot();
  });
});

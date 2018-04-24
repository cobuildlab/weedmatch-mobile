import 'react-native';
import React from 'react';
import Authentication from '../src/components/Authentication';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const hello = renderer.create (
    <Authentication/>
  );
});
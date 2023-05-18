import React from 'react';
import { render, screen } from '@testing-library/react';
import Mainpage from './mainPage'

test('renders learn react link', () => {
  render(<Mainpage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./components/orb/orb.jsx', () => ({
  default: () => null,
}));

test('renders home page store call to action', () => {
  render(React.createElement(App));
  expect(screen.getByText(/Shop NOW!/i)).toBeInTheDocument();
});

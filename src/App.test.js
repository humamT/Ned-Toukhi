import { render, screen } from '@testing-library/react';
import App from './App';

test('renders footer with site name', () => {
  render(<App />);
  expect(screen.getByText(/Ned Toukhi/i)).toBeInTheDocument();
});

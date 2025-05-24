import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../Header';

describe('Header', () => {
  it('renders logo and navigation links', () => {
    render(<Header />);
    expect(screen.getByText('LITTLE LEMON')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /home/i })[0]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reservations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('shows mobile menu when button is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open mobile menu/i });
    fireEvent.click(button);
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});

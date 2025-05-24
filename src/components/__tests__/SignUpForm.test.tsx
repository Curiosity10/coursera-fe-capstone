import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from '../SignUpForm';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sign up form with all fields', () => {
    renderWithRouter(<SignUpForm />);
    
    // Check for form elements
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up$/i })).toBeInTheDocument();
    
    // Check for social sign up buttons
    expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up with apple/i })).toBeInTheDocument();
  });

  it('validates empty form fields', async () => {
    renderWithRouter(<SignUpForm />);
    
    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /sign up$/i }));

    // Check for validation messages
    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderWithRouter(<SignUpForm />);
    
    // Enter invalid email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign up$/i }));

    // Check for email validation message
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it('validates password matching', async () => {
    renderWithRouter(<SignUpForm />);
    
    // Enter different passwords
    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/repeat password/i), {
      target: { value: 'password456' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign up$/i }));

    // Check for password match validation message
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderWithRouter(<SignUpForm />);
    
    // Fill in valid form data
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/repeat password/i), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign up$/i }));

    // Check if form data was logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        repeatPassword: 'password123',
      });
    });
  });

  it('handles social sign up clicks', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderWithRouter(<SignUpForm />);
    
    // Click social sign up buttons
    fireEvent.click(screen.getByRole('button', { name: /sign up with google/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Sign up with Google');

    fireEvent.click(screen.getByRole('button', { name: /sign up with apple/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Sign up with Apple');
  });
});

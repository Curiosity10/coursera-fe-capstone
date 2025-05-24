import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../BookingForm';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BookingForm', () => {
  beforeEach(() => {
    // Mock current date to ensure consistent date validation
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-05-24'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial form with all required fields', () => {
    renderWithRouter(<BookingForm />);
    
    // Check form heading
    expect(screen.getByRole('heading', { name: /book a table/i })).toBeInTheDocument();
    
    // Check form inputs
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    
    // Check submit button
    expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
  });

  it('allows selecting different seating options', () => {
    renderWithRouter(<BookingForm />);
    
    const indoorRadio = screen.getByLabelText(/indoor/i);
    const outdoorRadio = screen.getByLabelText(/outdoor/i);
    
    expect(indoorRadio).toBeChecked();
    expect(outdoorRadio).not.toBeChecked();
    
    fireEvent.click(outdoorRadio);
    expect(outdoorRadio).toBeChecked();
    expect(indoorRadio).not.toBeChecked();
  });

  it('enforces minimum date selection to be today', () => {
    renderWithRouter(<BookingForm />);
    
    const dateInput = screen.getByLabelText(/date/i);
    expect(dateInput).toHaveAttribute('min', '2025-05-24');
  });

  it('progresses through form steps correctly', async () => {
    renderWithRouter(<BookingForm />);
    
    // Fill out the form
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2025-05-25' } });
    
    const timeSelect = screen.getByLabelText(/time/i);
    fireEvent.change(timeSelect, { target: { value: '7:00 PM' } });
    
    const guestsSelect = screen.getByLabelText(/guests/i);
    fireEvent.change(guestsSelect, { target: { value: '4' } });
    
    // Submit form to go to review step
    const submitButton = screen.getByRole('button', { name: /reserve a table/i });
    fireEvent.click(submitButton);
    
    // Check review page
    expect(screen.getByText(/review and confirm/i)).toBeInTheDocument();
    expect(screen.getByText('2025-05-25')).toBeInTheDocument();
    expect(screen.getByText('7:00 PM')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    
    // Confirm reservation
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);
    
    // Check confirmation page
    expect(screen.getByText(/your reservation has been confirmed/i)).toBeInTheDocument();
  });

  it('allows editing from review step', () => {
    renderWithRouter(<BookingForm />);
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-05-25' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '7:00 PM' } });
    fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));
    
    // Click edit button on review page
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Verify we're back on the form
    expect(screen.getByRole('heading', { name: /book a table/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toHaveValue('2025-05-25');
  });

  it('updates special requests field correctly', () => {
    renderWithRouter(<BookingForm />);
    
    const specialRequestsInput = screen.getByLabelText(/special requests/i);
    fireEvent.change(specialRequestsInput, { target: { value: 'Allergic to nuts' } });
    
    expect(specialRequestsInput).toHaveValue('Allergic to nuts');
  });
});

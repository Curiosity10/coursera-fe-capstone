import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReservationData {
  seating: 'indoor' | 'outdoor';
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');
  const [reservationData, setReservationData] = useState<ReservationData>({
    seating: 'indoor',
    date: '',
    time: '',
    guests: 1,
    specialRequests: ''
  });

  const handleInputChange = (field: keyof ReservationData, value: string | number) => {
    setReservationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') setStep('review');
    else if (step === 'review') setStep('confirmed');
  };

  const handleBackToHome = () => navigate('/');

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen citrus-bg flex items-center justify-center p-4" aria-labelledby="reservation-confirmed-heading">
        <section className="w-full max-w-md text-center" role="status" aria-live="polite">
          <button onClick={handleBackToHome} className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8" aria-label="Back to home">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </button>
          <div className="glass-morphism p-8 mb-8">
            <h1 id="reservation-confirmed-heading" className="text-4xl font-bold text-yellow-400 mb-6">Your reservation has been confirmed!</h1>
            <p className="text-white text-xl mb-8">We look forward to welcoming you.</p>
            <p className="text-white">Feel free to review your reservation details in the profile section.</p>
          </div>
        </section>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="min-h-screen citrus-bg flex items-center justify-center p-4" aria-labelledby="review-confirm-heading">
        <section className="w-full max-w-md" aria-label="Review and Confirm Reservation">
          <button onClick={() => setStep('form')} className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8" aria-label="Back to form">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="glass-morphism p-8">
            <h1 id="review-confirm-heading" className="text-3xl font-bold text-white mb-8 text-center">Review and Confirm</h1>
            <dl className="space-y-4 text-white mb-8">
              <div className="flex justify-between"><dt>Date:</dt><dd>{reservationData.date}</dd></div>
              <div className="flex justify-between"><dt>Time:</dt><dd>{reservationData.time}</dd></div>
              <div className="flex justify-between"><dt>Guests:</dt><dd>{reservationData.guests}</dd></div>
              <div className="flex justify-between"><dt>Seating:</dt><dd className="capitalize">{reservationData.seating}</dd></div>
              {reservationData.specialRequests && (
                <div><dt>Special requests:</dt><dd>{reservationData.specialRequests}</dd></div>
              )}
            </dl>
            <div className="flex gap-4">
              <button onClick={() => setStep('form')} className="btn-primary flex-1 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" aria-label="Edit reservation">Edit</button>
              <button onClick={handleSubmit} className="btn-primary flex-1" aria-label="Confirm reservation">Confirm</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen citrus-bg flex items-center justify-center p-4" aria-labelledby="book-table-heading">
      <section className="w-full max-w-md" aria-label="Book a table">
        <button onClick={handleBackToHome} className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8" aria-label="Back to home">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="glass-morphism p-8">
          <h1 id="book-table-heading" className="text-3xl font-bold text-white mb-8 text-center">Book a table</h1>
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Reservation form">
            <fieldset>
              <legend className="block text-white text-sm font-medium mb-4">Seating:</legend>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="seating" value="indoor" checked={reservationData.seating === 'indoor'} onChange={e => handleInputChange('seating', e.target.value as 'indoor' | 'outdoor')} className="mr-2 text-yellow-400" aria-checked={reservationData.seating === 'indoor'} />
                  <span className="text-white">Indoor</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="seating" value="outdoor" checked={reservationData.seating === 'outdoor'} onChange={e => handleInputChange('seating', e.target.value as 'indoor' | 'outdoor')} className="mr-2 text-yellow-400" aria-checked={reservationData.seating === 'outdoor'} />
                  <span className="text-white">Outdoor</span>
                </label>
              </div>
            </fieldset>
            <div>
              <label htmlFor="date" className="block text-white text-sm font-medium mb-2">Date:</label>
              <input
                type="date"
                id="date"
                value={reservationData.date}
                onChange={e => handleInputChange('date', e.target.value)}
                className="form-input pr-12"
                required
                aria-required="true"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-white text-sm font-medium mb-2">Time:</label>
                <select
                id="time"
                value={reservationData.time}
                onChange={e => handleInputChange('time', e.target.value)}
                className="form-input pr-12 appearance-none text-white bg-citrus-bg"
                required
                aria-required="true"
                style={{ backgroundColor: 'var(--lemon-dark, #495E57)' }}
                >
                <option value="">Select time</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                </select>
            </div>
            <div>
              <label htmlFor="guests" className="block text-white text-sm font-medium mb-2">Guests:</label>
              <select id="guests" value={reservationData.guests} onChange={e => handleInputChange('guests', parseInt(e.target.value))} className="form-input pr-12 appearance-none" required aria-required="true" style={{ backgroundColor: 'var(--lemon-dark, #495E57)' }}>
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="specialRequests" className="block text-white text-sm font-medium mb-2">Special requests:</label>
              <textarea id="specialRequests" value={reservationData.specialRequests} onChange={e => handleInputChange('specialRequests', e.target.value)} placeholder="Type your message..." rows={4} className="form-input resize-none" aria-multiline="true" />
            </div>
            <button type="submit" className="btn-primary w-full" aria-label="Reserve a table">Reserve a table</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingForm;

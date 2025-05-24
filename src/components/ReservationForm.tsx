import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReservationData {
  seating: 'indoor' | 'outdoor';
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

const ReservationForm: React.FC = () => {
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
    setReservationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') {
      setStep('review');
    } else if (step === 'review') {
      setStep('confirmed');
    }
  };

  const handleEdit = () => {
    setStep('form');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (step === 'confirmed') {
    return (
      <section className="min-h-screen citrus-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <button
            onClick={handleBackToHome}
            className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </button>

          <div className="glass-morphism p-8 mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-6">
              Your reservation has been confirmed!
            </h1>
            <p className="text-white text-xl mb-8">
              We look forward to welcoming you.
            </p>
            <p className="text-white">
              Feel free to review your reservation details in the profile section.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (step === 'review') {
    return (
      <section className="min-h-screen citrus-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => setStep('form')}
            className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="glass-morphism p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              Review and Confirm
            </h1>

            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-white">Reservation Details</h2>
              
              <div className="space-y-4 text-white">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>23 / 12 / 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>8pm - 9pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{reservationData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seating:</span>
                  <span className="capitalize">{reservationData.seating}</span>
                </div>
              </div>

              {reservationData.specialRequests && (
                <div>
                  <h3 className="text-white font-medium mb-2">Special requests:</h3>
                  <div className="glass-morphism p-4">
                    <p className="text-white text-sm">
                      {reservationData.specialRequests}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="btn-primary flex-1 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen citrus-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={handleBackToHome}
          className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="glass-morphism p-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Book a table
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seating */}
            <div>
              <label className="block text-white text-sm font-medium mb-4">
                Seating:
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="seating"
                    value="indoor"
                    checked={reservationData.seating === 'indoor'}
                    onChange={(e) => handleInputChange('seating', e.target.value as 'indoor' | 'outdoor')}
                    className="mr-2 text-yellow-400"
                  />
                  <span className="text-white">Indoor</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="seating"
                    value="outdoor"
                    checked={reservationData.seating === 'outdoor'}
                    onChange={(e) => handleInputChange('seating', e.target.value as 'indoor' | 'outdoor')}
                    className="mr-2 text-yellow-400"
                  />
                  <span className="text-white">Outdoor</span>
                </label>
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-white text-sm font-medium mb-2">
                Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  value={reservationData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="form-input pr-12"
                  required
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-white text-sm font-medium mb-2">
                Time:
              </label>
              <div className="relative">
                <select
                  id="time"
                  value={reservationData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="form-input pr-12 appearance-none"
                  required
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
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="block text-white text-sm font-medium mb-2">
                Guests:
              </label>
              <div className="relative">
                <select
                  id="guests"
                  value={reservationData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className="form-input pr-12 appearance-none"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-white text-sm font-medium mb-2">
                Special requests:
              </label>
              <textarea
                id="specialRequests"
                value={reservationData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="form-input resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Reserve a table
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;

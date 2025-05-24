import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle successful form submission
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Handle social sign up
  };

  return (
    <section className="min-h-screen citrus-bg flex items-center justify-center p-4" aria-label="Sign up page">
      <div className="w-full max-w-md" aria-labelledby="signup-header">
        {/* Logo */}
        <header className="text-center mb-8" role="banner">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center" aria-hidden="true">
              <span className="text-2xl" role="img" aria-label="Lemon">🍋</span>
            </div>
            <span className="text-white text-xl font-semibold" id="logo-text">LITTLE LEMON</span>
          </div>
        </header>

        {/* Sign Up Form */}
        <section className="glass-morphism p-8 mb-6" aria-label="Sign up form">
          <h1 id="signup-header" className="text-3xl font-bold text-white mb-8 text-center">Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-describedby="form-desc" aria-live="polite">
            <p id="form-desc" className="sr-only">All fields are required. Password must be at least 8 characters.</p>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                Full name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name..."
                className="form-input"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                autoComplete="name"
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-red-300 text-sm mt-1" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email..."
                className="form-input"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <p id="email-error" className="text-red-300 text-sm mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password..."
                className="form-input"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                autoComplete="new-password"
              />
              {errors.password && (
                <p id="password-error" className="text-red-300 text-sm mt-1" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Repeat Password */}
            <div>
              <label htmlFor="repeatPassword" className="block text-white text-sm font-medium mb-2">
                Repeat password:
              </label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                placeholder="Repeat your password..."
                className="form-input"
                aria-required="true"
                aria-invalid={!!errors.repeatPassword}
                aria-describedby={errors.repeatPassword ? "repeatPassword-error" : undefined}
                autoComplete="new-password"
              />
              {errors.repeatPassword && (
                <p id="repeatPassword-error" className="text-red-300 text-sm mt-1" role="alert">
                  {errors.repeatPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full" aria-label="Sign up">
              Sign Up
            </button>
          </form>

          {/* Social Sign Up */}
          <nav className="mt-8 space-y-4" aria-label="Social sign up options">
            <button
              onClick={() => handleSocialSignUp('Google')}
              className="btn-secondary w-full flex items-center justify-center space-x-3"
              type="button"
              aria-label="Sign up with Google"
            >
              <span className="text-lg" aria-hidden="true">G</span>
              <span>Sign up with Google</span>
            </button>
            
            <button
              onClick={() => handleSocialSignUp('Apple')}
              className="btn-secondary w-full flex items-center justify-center space-x-3"
              type="button"
              aria-label="Sign up with Apple"
            >
              <span className="text-lg" aria-hidden="true">🍎</span>
              <span>Sign up with Apple</span>
            </button>
          </nav>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-white">
              Already have an account?{' '}
              <a href="/signin" className="text-yellow-400 hover:text-yellow-300 font-medium underline" aria-label="Go to sign in page">
                Sign in
              </a>
            </p>
          </div>
        </section>

        {/* Back Button */}
        <nav className="text-center" aria-label="Back navigation">
          <button 
            onClick={() => navigate('/')} 
            className="text-white hover:text-yellow-400 transition-colors flex items-center justify-center space-x-2 mx-auto"
            type="button"
            aria-label="Back to homepage"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default SignUpForm;

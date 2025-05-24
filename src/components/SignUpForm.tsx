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
    <section className="min-h-screen citrus-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍋</span>
            </div>
            <span className="text-white text-xl font-semibold">LITTLE LEMON</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="glass-morphism p-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
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
                aria-describedby={errors.email ? "email-error" : undefined}
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
                aria-describedby={errors.password ? "password-error" : undefined}
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
                aria-describedby={errors.repeatPassword ? "repeatPassword-error" : undefined}
              />
              {errors.repeatPassword && (
                <p id="repeatPassword-error" className="text-red-300 text-sm mt-1" role="alert">
                  {errors.repeatPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Sign Up
            </button>
          </form>

          {/* Social Sign Up */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleSocialSignUp('Google')}
              className="btn-secondary w-full flex items-center justify-center space-x-3"
            >
              <span className="text-lg">G</span>
              <span>Sign up with Google</span>
            </button>
            
            <button
              onClick={() => handleSocialSignUp('Apple')}
              className="btn-secondary w-full flex items-center justify-center space-x-3"
            >
              <span className="text-lg">🍎</span>
              <span>Sign up with Apple</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-white">
              Already have an account?{' '}
              <a href="/signin" className="text-yellow-400 hover:text-yellow-300 font-medium underline">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-yellow-400 transition-colors flex items-center justify-center space-x-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;

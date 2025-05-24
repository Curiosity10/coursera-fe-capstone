
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xl">🍋</span>
            </div>
            <span className="text-white text-lg font-semibold">LITTLE LEMON</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <a href="/" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Home
            </a>
            <a href="/reservations" className="text-white hover:text-yellow-400 transition-colors font-medium">
              Reservations
            </a>
            <a href="/about" className="text-white hover:text-yellow-400 transition-colors font-medium">
              About
            </a>
          </nav>

          {/* Cart Icon */}
          <div className="hidden md:flex items-center">
            <button 
              className="text-white hover:text-yellow-400 transition-colors p-2"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                +
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 bg-black bg-opacity-90 rounded-lg mt-2" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4 px-4">
              <a href="/" className="text-white hover:text-yellow-400 transition-colors font-medium py-2">
                Home
              </a>
              <a href="/reservations" className="text-white hover:text-yellow-400 transition-colors font-medium py-2">
                Reservations
              </a>
              <a href="/about" className="text-white hover:text-yellow-400 transition-colors font-medium py-2">
                About
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
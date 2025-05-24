import React, { useState } from 'react';
import { navigationLinks } from '@/constants/navigation';
import { NavLink } from './NavLink';

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
          <a href="/" className="flex items-center space-x-2" aria-label="Little Lemon homepage">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center" role="img" aria-label="Lemon logo">
              <span className="text-xl" aria-hidden="true">🍋</span>
            </div>
            <span className="text-white text-lg font-semibold">LITTLE LEMON</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center space-x-8 m-0 p-0 list-none">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <nav id="mobile-menu" className="md:hidden py-4 bg-black bg-opacity-90 rounded-lg mt-2" role="navigation" aria-label="Mobile navigation">
            <ul className="flex flex-col space-y-4 px-4 m-0 p-0 list-none">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} {...link} className="py-2" />
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
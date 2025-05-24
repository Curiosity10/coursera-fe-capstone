import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import HomePage from '../Homepage';
import { categories, menuItems } from '@/constants/menu';

describe('HomePage Component', () => {
  afterEach(cleanup);

  it('renders the hero section correctly', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /Little Lemon\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Chicago/i })).toBeInTheDocument();
    expect(screen.getByText(/We are a family owned Mediterranean restaurant/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reserve a table/i })).toHaveAttribute('href', '/reservations');
    
    const heroImage = screen.getByRole('img', { name: 'Grilled Mediterranean dishes on a dark slate board' });
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
  });

  it('renders the menu section with initial category', () => {
    render(<HomePage />);
    
    expect(screen.getByRole('heading', { name: /ORDER FOR DELIVERY!/i })).toBeInTheDocument();
    
    // Check if all category buttons are rendered
    categories.forEach(category => {
      expect(screen.getByRole('tab', { name: category })).toBeInTheDocument();
    });

    // First category should be selected by default
    expect(screen.getByRole('tab', { name: categories[0] })).toHaveAttribute('aria-selected', 'true');
  });

  it('filters menu items when changing category', () => {
    render(<HomePage />);
    
    // Click on a different category
    const secondCategory = categories[1];
    fireEvent.click(screen.getByRole('tab', { name: secondCategory }));

    // Check if the category is selected
    expect(screen.getByRole('tab', { name: secondCategory })).toHaveAttribute('aria-selected', 'true');
    
    // Verify only items from selected category are shown
    const filteredItems = menuItems.filter(item => item.category === secondCategory);
    filteredItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('renders menu cards with correct information', () => {
    render(<HomePage />);
    
    const firstCategoryItems = menuItems.filter(item => item.category === categories[0]);
    const firstItem = firstCategoryItems[0];
    
    // Check if menu card components are rendered with correct data
    expect(screen.getByText(firstItem.name)).toBeInTheDocument();
    expect(screen.getByText(firstItem.description)).toBeInTheDocument();
    expect(screen.getByAltText(firstItem.name)).toHaveAttribute('src', firstItem.image);
  });
});

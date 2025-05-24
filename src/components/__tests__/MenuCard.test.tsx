import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MenuCard from '../MenuCard';

describe('MenuCard', () => {
  const mockProps = {
    id: '1',
    image: 'test-image.jpg',
    name: 'Test Dish',
    price: '$10.99',
    description: 'A delicious test dish',
    category: 'Test Category'
  };

  it('renders all menu item information correctly', () => {
    render(<MenuCard {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockProps.category)).toBeInTheDocument();
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.image);
    expect(image).toHaveAttribute('alt', mockProps.name);
  });

  it('has correct accessibility attributes', () => {
    render(<MenuCard {...mockProps} />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', `menu-item-${mockProps.id}`);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('id', `menu-item-${mockProps.id}`);

    const orderButton = screen.getByRole('button');
    expect(orderButton).toHaveAttribute('aria-label', `Order a delivery of ${mockProps.name}`);
  });

  it('applies correct styling classes', () => {
    render(<MenuCard {...mockProps} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('menu-card');

    const image = screen.getByRole('img');
    expect(image).toHaveClass('w-full', 'h-48', 'object-cover');

    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-xl', 'font-semibold', 'text-black');

    const price = screen.getByText(mockProps.price);
    expect(price).toHaveClass('text-lg', 'font-bold', 'text-orange-500');

    const category = screen.getByText(mockProps.category);
    expect(category).toHaveClass('inline-block', 'bg-gray-100', 'text-gray-700', 'text-xs', 'font-semibold', 'px-2', 'py-1', 'rounded-full', 'mb-2');

    const description = screen.getByText(mockProps.description);
    expect(description).toHaveClass('text-gray-600', 'text-sm', 'leading-relaxed', 'mb-4');

    const orderButton = screen.getByRole('button');
    expect(orderButton).toHaveClass('text-black', 'font-medium', 'hover:text-orange-500', 'transition-colors');
  });
});

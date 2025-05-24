import React, { useState } from 'react';
import { categories, menuItems } from '@/constants/menu'; 
import MenuCard from './MenuCard'; 

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const filteredMenuItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="citrus-bg min-h-screen flex items-center justify-center relative" aria-label="Hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <header className="text-white space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">Little Lemon.</h1>
              <h2 className="text-2xl lg:text-3xl font-light">Chicago</h2>
              <p className="text-lg lg:text-xl leading-relaxed max-w-md">
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </p>
              <div>
          <a
            href="/reservations"
            className="btn-primary mt-6 block w-full sm:w-auto text-center"
            role="button"
          >
            Reserve a table
          </a>
              </div>
            </header>
            {/* Hero Image */}
            <img
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
              alt="Grilled Mediterranean dishes on a dark slate board"
              className="rounded-2xl shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-white" aria-labelledby="menu-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="menu-heading" className="text-3xl lg:text-4xl font-bold text-black mb-8">ORDER FOR DELIVERY!</h2>
          {/* Category Tabs */}
          <nav className="flex flex-wrap gap-4 mb-8" role="tablist" aria-label="Menu categories">
            {categories.map((category, index) => (
              <button
                key={category}
                role="tab"
                aria-selected={selectedCategory === category}
                tabIndex={selectedCategory === category ? 0 : -1}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${selectedCategory === category ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                aria-controls={`panel-${category}`}
                id={`tab-${category}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>
          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Menu items">
            {filteredMenuItems.map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
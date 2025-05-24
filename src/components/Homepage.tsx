
import React from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const HomePage: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Greek Salad",
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago...",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      category: "Lunch"
    },
    {
      id: 2,
      name: "Brushetta",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic...",
      price: "$7.99",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop",
      category: "Lunch"
    },
    {
      id: 3,
      name: "Grilled Fish",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
      price: "$20.00",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "Mains"
    }
  ];

  const categories = ["Lunch", "Mains", "Desserts", "A La Carte", "Specials"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="citrus-bg min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Little Lemon.
              </h1>
              <h2 className="text-2xl lg:text-3xl font-light">Chicago</h2>
              <p className="text-lg lg:text-xl leading-relaxed max-w-md">
                We are a family owned Mediterranean restaurant, focused on traditional 
                recipes served with a modern twist.
              </p>
              <button className="btn-primary">
                Reserve a table
              </button>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
                  alt="Grilled Mediterranean dishes on a dark slate board"
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Order for Delivery Header */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-8">
              ORDER FOR DELIVERY!
            </h2>
            
            {/* Category Tabs */}
            <nav className="flex flex-wrap gap-4 mb-8" role="tablist" aria-label="Menu categories">
              {categories.map((category, index) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={index === 0}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    index === 0
                      ? 'bg-gray-200 text-black'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <article key={item.id} className="menu-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                    <span className="text-lg font-bold text-orange-500">{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <button className="text-black font-medium hover:text-orange-500 transition-colors">
                    Order a delivery
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
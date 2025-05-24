import React from 'react';

interface MenuCardProps {
  id: string | number;
  image: string;
  name: string;
  price: string;
  description: string;
  category: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ id, image, name, price, description, category }) => (
  <article key={id} className="menu-card" aria-labelledby={`menu-item-${id}`}> 
    <img
      src={image}
      alt={name}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 id={`menu-item-${id}`} className="text-xl font-semibold text-black">{name}</h3>
        <span className="text-lg font-bold text-orange-500">{price}</span>
      </div>
      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">{category}</span>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      <button className="text-black font-medium hover:text-orange-500 transition-colors" aria-label={`Order a delivery of ${name}`}>
        Order a delivery
      </button>
    </div>
  </article>
);

export default MenuCard;

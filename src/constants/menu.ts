  
  interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
  }
  
  export const menuItems: MenuItem[] = [
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
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      category: "Mains"
    }
    ];

  export const categories: string[] = ["Lunch", "Mains", "Desserts", "A La Carte", "Specials"];
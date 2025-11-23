import { Item } from '@/types';
import productSneakers from '@/assets/product-sneakers.jpg';
import productHeadphones from '@/assets/product-headphones.jpg';
import productWatch from '@/assets/product-watch.jpg';
import productLaptop from '@/assets/product-laptop.jpg';
import productBackpack from '@/assets/product-backpack.jpg';
import productSunglasses from '@/assets/product-sunglasses.jpg';

const CATALOG: Item[] = [
  {
    id: 1,
    name: 'Premium High-Top Sneakers',
    price: 129.99,
    originalPrice: 179.99,
    description: 'Stylish high-top sneakers with premium leather finish and comfortable cushioning',
    image: productSneakers,
    category: 'Footwear',
    rating: 4.5,
    reviews: 234,
    badge: 'Sale',
    inStock: true,
    brand: 'UrbanStep',
  },
  {
    id: 2,
    name: 'Wireless Over-Ear Headphones',
    price: 199.99,
    description: 'Professional wireless headphones with active noise cancellation and premium sound',
    image: productHeadphones,
    category: 'Electronics',
    rating: 4.8,
    reviews: 456,
    badge: 'Hot',
    inStock: true,
    brand: 'SoundMax',
  },
  {
    id: 3,
    name: 'Luxury Sport Watch',
    price: 349.99,
    description: 'Premium sport watch with stainless steel band and sapphire crystal display',
    image: productWatch,
    category: 'Accessories',
    rating: 4.7,
    reviews: 189,
    badge: 'New',
    inStock: true,
    brand: 'TimeLuxe',
  },
  {
    id: 4,
    name: 'Ultra-Slim Laptop Pro',
    price: 1299.99,
    originalPrice: 1599.99,
    description: 'High-performance laptop with aluminum unibody design and retina display',
    image: productLaptop,
    category: 'Electronics',
    rating: 4.9,
    reviews: 678,
    badge: 'Limited',
    inStock: true,
    brand: 'TechPro',
  },
  {
    id: 5,
    name: 'Designer Leather Backpack',
    price: 89.99,
    description: 'Minimalist leather backpack with padded laptop compartment and organization pockets',
    image: productBackpack,
    category: 'Bags',
    rating: 4.3,
    reviews: 145,
    inStock: true,
    brand: 'UrbanCraft',
  },
  {
    id: 6,
    name: 'Classic Aviator Sunglasses',
    price: 149.99,
    originalPrice: 199.99,
    description: 'Premium aviator sunglasses with polarized lenses and metal frame',
    image: productSunglasses,
    category: 'Accessories',
    rating: 4.6,
    reviews: 312,
    badge: 'Sale',
    inStock: true,
    brand: 'VisionStyle',
  },
  {
    id: 7,
    name: 'Urban Sport Sneakers',
    price: 99.99,
    description: 'Lightweight running sneakers with breathable mesh and responsive cushioning',
    image: productSneakers,
    category: 'Footwear',
    rating: 4.4,
    reviews: 267,
    inStock: true,
    brand: 'UrbanStep',
  },
  {
    id: 8,
    name: 'Professional Studio Headphones',
    price: 299.99,
    description: 'Studio-grade headphones with precision audio and comfortable ear cups',
    image: productHeadphones,
    category: 'Electronics',
    rating: 4.8,
    reviews: 423,
    badge: 'Hot',
    inStock: true,
    brand: 'SoundMax',
  },
];

export const productService = {
  getAllProducts: () => CATALOG,
  
  getProductById: (id: number) => CATALOG.find(p => p.id === id),
  
  searchProducts: (query: string) => {
    const searchTerm = query.toLowerCase();
    return CATALOG.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand?.toLowerCase().includes(searchTerm)
    );
  },
  
  getProductsByCategory: (category: string) => {
    if (category === 'All') return CATALOG;
    return CATALOG.filter(p => p.category === category);
  },
  
  filterProducts: (query: string, category: string, sortBy?: string) => {
    let filtered = CATALOG;
    
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  },
  
  getFeaturedProducts: () => CATALOG.filter(p => p.badge === 'Hot' || p.badge === 'New').slice(0, 4),
  
  getCategories: () => {
    const categories = new Set(CATALOG.map(p => p.category));
    return ['All', ...Array.from(categories)];
  },
};

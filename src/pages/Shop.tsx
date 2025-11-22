import { useState, useMemo } from 'react';
import { TopBar } from '@/components/shop/TopBar';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { productService } from '@/services/productService';
import { CategoryType } from '@/config/constants';
import heroBanner from '@/assets/hero-banner.jpg';

export const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const filteredProducts = useMemo(() => {
    return productService.filterProducts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={heroBanner}
          alt="Shop banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 flex items-center justify-center">
          <div className="text-center text-primary-foreground space-y-3 px-4">
            <h1 className="text-4xl md:text-6xl font-bold">Discover Amazing Products</h1>
            <p className="text-lg md:text-xl opacity-90">Shop the latest trends with exclusive deals</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>

        <ProductGrid products={filteredProducts} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Shop;

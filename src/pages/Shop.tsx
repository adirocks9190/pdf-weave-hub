import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroBanner from '@/assets/hero-banner.jpg';

const categories = ['All', 'Electronics', 'Footwear', 'Accessories', 'Bags'];

export const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchChange={setSearchQuery} />

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
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-base"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

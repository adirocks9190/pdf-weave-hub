import { useState, useMemo } from 'react';
import { TopBar } from '@/components/shop/TopBar';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { productService } from '@/services/productService';
import { CategoryType } from '@/config/constants';
import { Footer } from '@/components/Footer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { Item } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroBanner from '@/assets/hero-banner.jpg';

export const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [sortBy, setSortBy] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Item | null>(null);

  const filteredProducts = useMemo(() => {
    return productService.filterProducts(searchQuery, selectedCategory, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

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

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProductGrid 
          products={filteredProducts} 
          selectedCategory={selectedCategory}
          onQuickView={setQuickViewProduct}
        />
      </div>

      <Footer />
      
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Shop;

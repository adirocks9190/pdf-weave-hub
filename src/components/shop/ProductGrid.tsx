import { Item } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';

interface ProductGridProps {
  products: Item[];
  selectedCategory: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, selectedCategory }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h2>
        <Badge variant="secondary" className="text-sm">
          {products.length} {products.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

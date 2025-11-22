import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Item;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden border-0 shadow-elegant hover:shadow-xl transition-base">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-base"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-base"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Badge className="absolute top-3 left-3">{product.category}</Badge>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

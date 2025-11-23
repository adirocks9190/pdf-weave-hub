import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types';
import { useAppStore } from '@/store/AppStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Item;
  onQuickView?: (product: Item) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { cart, wishlist } = useAppStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const isWishlisted = wishlist.isInWishlist(product.id);

  return (
    <Card className="group overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-smooth cursor-pointer">
      <div 
        className="relative aspect-square overflow-hidden bg-muted"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-base" />
        
        {product.badge && (
          <Badge 
            className="absolute top-3 left-3 font-semibold"
            variant={product.badge === 'Sale' ? 'destructive' : 'default'}
          >
            {product.badge}
          </Badge>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-base">
          <Button
            variant="secondary"
            size="sm"
            className="h-9 w-9 p-0 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              if (isWishlisted) {
                wishlist.removeItem(product.id);
              } else {
                wishlist.addItem(product);
              }
            }}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-destructive' : ''}`} />
          </Button>
          {onQuickView && (
            <Button
              variant="secondary"
              size="sm"
              className="h-9 w-9 p-0 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>

        {product.originalPrice && (
          <Badge className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground font-bold">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        {product.rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-accent text-accent'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        )}
        
        <h3 className="font-semibold text-base line-clamp-1 hover:text-primary transition-base">
          {product.name}
        </h3>
        
        {product.brand && (
          <p className="text-xs text-muted-foreground">{product.brand}</p>
        )}
        
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          className="flex-1 shadow-md hover:shadow-lg" 
          onClick={(e) => {
            e.stopPropagation();
            cart.addItem(product);
          }}
          disabled={product.inStock === false}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

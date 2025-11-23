import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types';
import { ShoppingCart, Heart, Star, X } from 'lucide-react';
import { useAppStore } from '@/store/AppStore';

interface QuickViewModalProps {
  product: Item | null;
  open: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, open, onClose }) => {
  const { cart, wishlist } = useAppStore();

  if (!product) return null;

  const isWishlisted = wishlist.isInWishlist(product.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Quick View</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4" variant={product.badge === 'Sale' ? 'destructive' : 'default'}>
                {product.badge}
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              {product.brand && (
                <p className="text-sm text-muted-foreground mt-1">by {product.brand}</p>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {product.inStock !== false ? (
              <div className="text-sm text-success font-medium">In Stock</div>
            ) : (
              <div className="text-sm text-destructive font-medium">Out of Stock</div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1"
                size="lg"
                onClick={() => {
                  cart.addItem(product);
                  onClose();
                }}
                disabled={product.inStock === false}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant={isWishlisted ? 'default' : 'outline'}
                size="lg"
                className="px-6"
                onClick={() => {
                  if (isWishlisted) {
                    wishlist.removeItem(product.id);
                  } else {
                    wishlist.addItem(product);
                  }
                }}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

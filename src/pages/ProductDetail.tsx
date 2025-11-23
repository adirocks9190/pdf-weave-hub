import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { productService } from '@/services/productService';
import { useAppStore } from '@/store/AppStore';
import { ShoppingCart, Heart, Star, ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, wishlist } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  
  const product = productService.getProductById(Number(id));
  const relatedProducts = product 
    ? productService.getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-xl overflow-hidden shadow-elegant">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge 
                  className="absolute top-6 left-6 text-base px-4 py-1"
                  variant={product.badge === 'Sale' ? 'destructive' : 'default'}
                >
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              {product.brand && (
                <p className="text-muted-foreground">by {product.brand}</p>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            )}

            <Separator />

            <div>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl font-bold gradient-hero bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="text-base">
                      Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              {product.inStock !== false ? (
                <p className="text-success font-semibold text-lg">✓ In Stock</p>
              ) : (
                <p className="text-destructive font-semibold text-lg">✗ Out of Stock</p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4"
                >
                  -
                </Button>
                <span className="px-6 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 text-lg h-14 shadow-lg hover:shadow-xl"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    cart.addItem(product);
                  }
                }}
                disabled={product.inStock === false}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant={isWishlisted ? 'default' : 'outline'}
                size="lg"
                className="px-6 h-14"
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

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="h-5 w-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <RefreshCw className="h-5 w-5" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Shield className="h-5 w-5" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

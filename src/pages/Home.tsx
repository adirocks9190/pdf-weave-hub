import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { ArrowRight, ShoppingBag, Heart, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '@/services/productService';
import { useState } from 'react';
import { Item } from '@/types';
import heroBanner from '@/assets/hero-banner.jpg';
import { useAppStore } from '@/store/AppStore';

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAppStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Item | null>(null);
  const featuredProducts = productService.getFeaturedProducts();
  const categories = productService.getCategories().filter(c => c !== 'All');

  const handleShopNow = () => {
    if (auth.isLoggedIn) {
      navigate('/shop');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Hero banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground space-y-6 animate-fade-in">
            <Badge className="bg-background/20 text-primary-foreground backdrop-blur-sm border-primary-foreground/20">
              New Arrivals
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover Your Style
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Shop premium products with exclusive deals and fast shipping
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" variant="secondary" onClick={handleShopNow} className="shadow-xl hover:shadow-2xl">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto">
                  <Zap className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
                <p className="text-muted-foreground">Get your orders delivered within 24-48 hours</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto">
                  <Shield className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Secure Payment</h3>
                <p className="text-muted-foreground">100% secure and encrypted transactions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto">
                  <Heart className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Quality Products</h3>
                <p className="text-muted-foreground">Curated selection of premium items</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Explore our wide range of products</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category}
                className="group cursor-pointer border-0 shadow-elegant hover:shadow-glow transition-smooth overflow-hidden"
                onClick={handleShopNow}
              >
                <CardContent className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-accent mx-auto flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <ShoppingBag className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Featured</Badge>
            <h2 className="text-4xl font-bold mb-4">Trending Products</h2>
            <p className="text-muted-foreground text-lg">Check out our most popular items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={handleShopNow} className="shadow-lg">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Home;

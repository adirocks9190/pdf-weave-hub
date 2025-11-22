import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { CartSheet } from './CartSheet';

interface NavbarProps {
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            ShopHub
          </h1>
          <div className="hidden md:flex relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline text-sm font-medium">{user?.username}</span>
          </div>
          <CartSheet />
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
      
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

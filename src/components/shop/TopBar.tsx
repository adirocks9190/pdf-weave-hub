import { ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from './SearchBar';
import { CartSheet } from '../CartSheet';
import { useAppStore } from '@/store/AppStore';
import { APP_CONFIG } from '@/config/constants';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ searchQuery, onSearchChange }) => {
  const { auth, cart, wishlist } = useAppStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            {APP_CONFIG.name}
          </h1>
          <div className="hidden md:flex relative w-96">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline text-sm font-medium">{auth.user?.username}</span>
          </div>
          <Button variant="outline" size="sm" className="relative">
            <Heart className="h-4 w-4" />
            {wishlist.count > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {wishlist.count}
              </Badge>
            )}
          </Button>
          <CartSheet />
          <Button variant="outline" size="sm" onClick={auth.signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
      
      <div className="md:hidden px-4 pb-3">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </nav>
  );
};

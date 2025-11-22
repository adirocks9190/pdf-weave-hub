import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call to POST /orders
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
      
      // Redirect to shop after 3 seconds
      setTimeout(() => {
        navigate('/shop');
      }, 3000);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-elegant">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-24 w-24 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Order Placed!</h2>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">Redirecting to shop...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-elegant">
          <CardContent className="pt-12 pb-8 space-y-6">
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Button onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{cartItem.item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {cartItem.quantity}
                      </p>
                      <p className="text-lg font-bold gradient-hero bg-clip-text text-transparent">
                        ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Shipping details will be collected during order processing
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-elegant sticky top-4">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                    ${(cartTotal * 1.1).toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

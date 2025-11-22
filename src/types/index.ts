export interface User {
  id: number;
  username: string;
  token: string;
  cart_id?: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  item: Item;
  quantity: number;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  status: string;
}

export interface Order {
  id: number;
  cart_id: number;
  user_id: number;
  items: CartItem[];
  total: number;
  status: string;
  created_at: string;
}

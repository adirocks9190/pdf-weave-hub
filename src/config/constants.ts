export const APP_CONFIG = {
  name: 'ShopHub',
  version: '1.0.0',
  api: {
    baseUrl: '/api',
    timeout: 5000,
  },
  storage: {
    userKey: 'shophub_user_data',
    cartPrefix: 'shophub_cart_',
  },
  ui: {
    productsPerPage: 12,
    maxCartItems: 50,
    toastDuration: 3000,
  },
} as const;

export const PRODUCT_CATEGORIES = [
  'All',
  'Electronics',
  'Footwear',
  'Accessories',
  'Bags',
] as const;

export type CategoryType = typeof PRODUCT_CATEGORIES[number];

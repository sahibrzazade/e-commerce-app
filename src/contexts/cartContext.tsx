import { createContext, useContext, useEffect, useState } from 'react';
import { cartService } from '../services/cartService';
import { CartContextType, CartItem, CartProduct } from '../types';
import { useAuthUser } from '../hooks/useAuthUser';
import { productService } from '../services/productService';
import { Product } from '../types/shop';
import { WithChildren } from '../types';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: WithChildren) => {
  const user = useAuthUser();

  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [products, setProducts] = useState<Record<string, Product | null>>({});
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return;
    setFetchLoading(true);
    try {
      const cartData = await cartService.getCart(user.uid);
      setCart(cartData);
    } finally {
      setFetchLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) return;
    setAddLoading(true);
    try {
      const currentQuantity = cart[productId]?.quantity || 0;
      const newQuantity = currentQuantity + quantity;
      await cartService.addToCart(user.uid, productId, newQuantity);
      showSuccessMessage('Added to cart!');
      await fetchCart();
    } finally {
      setAddLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    setRemoveLoading(true);
    try {
      await cartService.removeFromCart(user.uid, productId);
      showErrorMessage('Product removed from cart!');
      await fetchCart();
    } finally {
      setRemoveLoading(false);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!user) return;
    setUpdateLoading(true);
    try {
      await cartService.updateCartItem(user.uid, productId, quantity);
      showSuccessMessage('Cart updated');
      await fetchCart();
    } finally {
      setUpdateLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    setClearLoading(true);
    try {
      await cartService.clearCart(user.uid);
      await fetchCart();
    } finally {
      setClearLoading(false);
    }
  };

  const total = Object.entries(cart).reduce((sum, [id, item]) => {
    const product = products[id];
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  const cartProducts: CartProduct[] = Object.entries(cart).map(([id, item]) => ({
    id,
    quantity: item.quantity,
    product: products[id] || null,
  }));

  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = Object.keys(cart);
      if (productIds.length === 0) {
        setProducts({});
        return;
      }
      const productFetches = productIds.map(id => productService.getProductById(id));
      const productResults = await Promise.all(productFetches);
      const productMap: Record<string, Product | null> = {};
      productIds.forEach((id, idx) => {
        productMap[id] = productResults[idx];
      });
      setProducts(productMap);
    };
    fetchProducts();
  }, [cart]);

  useEffect(() => {
    if (user) fetchCart();
    else setCart({});
  }, [user]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      count: Object.values(cart).reduce((sum, item) => sum + item.quantity, 0),
      total,
      cartProducts,
      addLoading,
      removeLoading,
      updateLoading,
      clearLoading,
      fetchLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}; 
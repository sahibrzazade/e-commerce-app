import { createContext, useContext } from 'react';
import { cartService } from '../services/cartService';
import { CartContextType, CartItem, CartProduct } from '../types';
import { useAuthUser } from '../hooks/useAuthUser';
import { productService } from '../services/productService';
import { Product } from '../types/shop';
import { WithChildren } from '../types';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: WithChildren) => {
  const { user } = useAuthUser();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    data: cart = {},
    isLoading: fetchLoading,
  } = useQuery<Record<string, CartItem>>({
    queryKey: ['cart', user?.uid],
    queryFn: () => user ? cartService.getCart(user.uid) : Promise.resolve({}),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const productIds = Object.keys(cart);
  const productQueries = useQueries({
    queries: productIds.map(id => ({
      queryKey: ['product', id],
      queryFn: () => productService.getProductById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    }))
  });
  const products: Record<string, Product | null> = {};
  productIds.forEach((id, idx) => {
    products[id] = productQueries[idx]?.data ?? null;
  });

  const addMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string, quantity: number }) => {
      if (!user) throw new Error(t('auth.user-not-found'));
      const currentQuantity = cart[productId]?.quantity || 0;
      const newQuantity = currentQuantity + quantity;
      await cartService.addToCart(user.uid, productId, newQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
      showSuccessMessage(t('shop.added-to-cart'));
    },
    onError: (error) => {
      showErrorMessage(error instanceof Error ? error.message : t('shop.add-to-cart-failed'));
    }
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error(t('auth.user-not-found'));
      await cartService.removeFromCart(user.uid, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
      showErrorMessage(t('shop.product-removed-from-cart'));
    },
    onError: (error) => {
      showErrorMessage(error instanceof Error ? error.message : t('shop.update-wishlist-failed'));
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string, quantity: number }) => {
      if (!user) throw new Error(t('auth.user-not-found'));
      await cartService.updateCartItem(user.uid, productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
      showSuccessMessage(t('shop.cart-updated'));
    },
    onError: (error) => {
      showErrorMessage(error instanceof Error ? error.message : t('shop.update-wishlist-failed'));
    }
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('auth.user-not-found'));
      await cartService.clearCart(user.uid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.uid] });
    },
    onError: (error) => {
      showErrorMessage(error instanceof Error ? error.message : t('shop.update-wishlist-failed'));
    }
  });

  const addToCart = async (productId: string, quantity = 1): Promise<void> => {
    return new Promise((resolve, reject) => {
      addMutation.mutate(
        { productId, quantity },
        {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        }
      );
    });
  };
  const removeFromCart = async (productId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      removeMutation.mutate(productId, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };
  const updateCartItem = async (productId: string, quantity: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      updateMutation.mutate(
        { productId, quantity },
        {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        }
      );
    });
  };
  const clearCart = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      clearMutation.mutate(undefined, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
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
      addLoading: addMutation.isPending,
      removeLoading: removeMutation.isPending,
      updateLoading: updateMutation.isPending,
      clearLoading: clearMutation.isPending,
      fetchLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}; 
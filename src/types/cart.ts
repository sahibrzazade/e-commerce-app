import { Timestamp } from "firebase/firestore";
import { Product } from "./shop";

export interface CartItem {
    quantity: number;
    addedAt: Timestamp;
}

export interface CartProduct {
    id: string;
    quantity: number;
    product: Product | null;
}

export interface CartContextType {
  cart: Record<string, CartItem>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  count: number;
  total: number;
  cartProducts: CartProduct[];
  addLoading: boolean;
  removeLoading: boolean;
  updateLoading: boolean;
  clearLoading: boolean;
  fetchLoading: boolean;
}

export interface CartTableProps {
  dataSource: CartProduct[];
  textSx?: object;
  backgroundSx?: object;
  updateLoading?: boolean;
  removeLoading?: boolean;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}
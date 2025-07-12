import { Timestamp } from 'firebase/firestore';
import { Product } from './shop';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id?: string;
  orderNumber?: string;
  userId: string;
  items: OrderItem[];
  total: number;
  discount?: number;
  discountedTotal?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateOrderData {
  userId: string;
  items: OrderItem[];
  total: number;
  discount?: number;
  discountedTotal?: number;
} 
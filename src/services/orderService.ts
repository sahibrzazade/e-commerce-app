import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  runTransaction
} from 'firebase/firestore';
import { db } from '../configs/firebase';
import { Order, CreateOrderData } from '../types';
import { productService } from './productService';

const ordersCollection = collection(db, 'orders');

const generateOrderNumber = async (): Promise<string> => {
  const counterRef = doc(db, 'counters', 'orders');
  
  const result = await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    const currentCount = counterDoc.data()?.count || 0;
    const newCount = currentCount + 1;
    
    transaction.set(counterRef, { count: newCount });
    return newCount;
  });
  
  return `ORD-${result.toString().padStart(6, '0')}`;
};

export const orderService = {
  async createOrder(orderData: CreateOrderData): Promise<string> {
    const orderNumber = await generateOrderNumber();
    const orderDoc = await addDoc(ordersCollection, {
      ...orderData,
      orderNumber,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return orderDoc.id;
  },

  async getOrder(orderId: string): Promise<Order | null> {
    const orderRef = doc(ordersCollection, orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      const orderData = {
        id: orderSnap.id,
        ...orderSnap.data()
      } as Order;

      const itemsWithProducts = await Promise.all(
        orderData.items.map(async (item) => {
          const product = await productService.getProductById(item.productId);
          return {
            ...item,
            product: product || undefined
          };
        })
      );

      return {
        ...orderData,
        items: itemsWithProducts
      };
    }
    return null;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const q = query(
      ordersCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const itemsWithProducts = await Promise.all(
          order.items.map(async (item) => {
            const product = await productService.getProductById(item.productId);
            return {
              ...item,
              product: product || undefined
            };
          })
        );

        return {
          ...order,
          items: itemsWithProducts
        };
      })
    );

    return ordersWithProducts;
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderRef = doc(ordersCollection, orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now()
    });
  }
}; 
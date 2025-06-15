import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../configs/firebase';
import { CartItem } from '../types';

export const cartService = {
  async addToCart(userId: string, productId: string, quantity: number): Promise<void> {
    const cartRef = doc(db, 'users', userId, 'cart', productId);
    await setDoc(cartRef, {
      quantity,
      addedAt: Timestamp.now()
    });
  },

  async updateCartItem(userId: string, productId: string, quantity: number): Promise<void> {
    const cartRef = doc(db, 'users', userId, 'cart', productId);
    await updateDoc(cartRef, { quantity });
  },

  async removeFromCart(userId: string, productId: string): Promise<void> {
    const cartRef = doc(db, 'users', userId, 'cart', productId);
    await deleteDoc(cartRef);
  },

  async getCart(userId: string): Promise<Record<string, CartItem>> {
    const cartRef = collection(db, 'users', userId, 'cart');
    const cartSnap = await getDocs(cartRef);
    const cart: Record<string, CartItem> = {};
    cartSnap.docs.forEach(doc => {
      cart[doc.id] = doc.data() as CartItem;
    });
    return cart;
  },

  async clearCart(userId: string): Promise<void> {
    const cartRef = collection(db, 'users', userId, 'cart');
    const cartSnap = await getDocs(cartRef);
    const deletePromises = cartSnap.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }
}; 
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../configs/firebase';

export const wishlistService = {
  async addToWishlist(userId: string, productId: string): Promise<void> {
    const wishlistRef = doc(db, 'users', userId, 'wishlist', productId);
    await setDoc(wishlistRef, { addedAt: Timestamp.now() });
  },

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const wishlistRef = doc(db, 'users', userId, 'wishlist', productId);
    await deleteDoc(wishlistRef);
  },

  async getWishlist(userId: string): Promise<string[]> {
    const wishlistRef = collection(db, 'users', userId, 'wishlist');
    const wishlistSnap = await getDocs(wishlistRef);
    return wishlistSnap.docs.map(doc => doc.id);
  },

  async isWishlist(userId: string, productId: string): Promise<boolean> {
    const wishlistRef = collection(db, 'users', userId, 'wishlist');
    const wishlistSnap = await getDocs(wishlistRef);
    return wishlistSnap.docs.some(doc => doc.id === productId);
  },

  async clearWishlist(userId: string): Promise<void> {
    const wishlistRef = collection(db, 'users', userId, 'wishlist');
    const wishlistSnap = await getDocs(wishlistRef);
    const deletePromises = wishlistSnap.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }
}; 
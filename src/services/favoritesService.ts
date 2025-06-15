import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../configs/firebase';

export const favoritesService = {
  async addToFavorites(userId: string, productId: string): Promise<void> {
    const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
    await setDoc(favoriteRef, { addedAt: Timestamp.now() });
  },

  async removeFromFavorites(userId: string, productId: string): Promise<void> {
    const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
    await deleteDoc(favoriteRef);
  },

  async getFavorites(userId: string): Promise<string[]> {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const favoritesSnap = await getDocs(favoritesRef);
    return favoritesSnap.docs.map(doc => doc.id);
  },

  async isFavorite(userId: string, productId: string): Promise<boolean> {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const favoritesSnap = await getDocs(favoritesRef);
    return favoritesSnap.docs.some(doc => doc.id === productId);
  },

  async clearFavorites(userId: string): Promise<void> {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const favoritesSnap = await getDocs(favoritesRef);
    const deletePromises = favoritesSnap.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }
}; 
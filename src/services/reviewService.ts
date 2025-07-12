import { db } from '../configs/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  increment,
  deleteDoc,
} from 'firebase/firestore';
import { Review } from '../types';

const reviewsCollection = collection(db, 'reviews');

const calculateAverageStars = async (productId: string): Promise<number> => {
  try {
    const q = query(
      reviewsCollection,
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
    
    if (reviews.length === 0) return 0;
    
    const totalStars = reviews.reduce((sum, review) => sum + (review.stars || 0), 0);
    return Math.round((totalStars / reviews.length) * 10) / 10; 
  } catch (error) {
    return 0;
  }
};

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
  await addDoc(reviewsCollection, {
    ...review,
    createdAt: Timestamp.now(),
  });
  
  const productRef = doc(db, 'products', review.productId);
  const averageStars = await calculateAverageStars(review.productId);
  
  await updateDoc(productRef, { 
    reviewsCount: increment(1),
    stars: averageStars
  });
};

export const getReviewsByProductId = async (productId: string) => {
  const q = query(
    reviewsCollection,
    where('productId', '==', productId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
};

export const getReviewsByUserId = async (userId: string) => {
  const q = query(
    reviewsCollection,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
};

export const deleteReview = async (productId: string, reviewId: string) => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await deleteDoc(reviewRef);
    
    const productRef = doc(db, 'products', productId);
    
    await updateDoc(productRef, { 
      reviewsCount: increment(-1)
    });
    
    const averageStars = await calculateAverageStars(productId);
    await updateDoc(productRef, { 
      stars: averageStars
    });
  } catch (error) {
    throw error;
  }
}; 
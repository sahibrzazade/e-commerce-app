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

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
  await addDoc(reviewsCollection, {
    ...review,
    createdAt: Timestamp.now(),
  });
  const productRef = doc(db, 'products', review.productId);
  await updateDoc(productRef, { reviewsCount: increment(1) });
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
  const reviewRef = doc(db, 'reviews', reviewId);
  await deleteDoc(reviewRef);
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, { reviewsCount: increment(-1) });
}; 
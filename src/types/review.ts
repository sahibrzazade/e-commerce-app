import { Timestamp } from 'firebase/firestore';

export interface Review {
  id?: string;
  productId: string;
  userId: string;
  userName: string;
  text: string;
  stars: number;
  userAvatar?: string;
  createdAt?: Timestamp;
} 
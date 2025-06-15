import { Timestamp } from "firebase/firestore";

export interface Review {
  productId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}

export interface ProductReview extends Review {
  userId: string;
}
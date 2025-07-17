import { Timestamp } from 'firebase/firestore';

export type BlogPost = {
  id: string;
  author:string;
  content: string;
  createdAt: Timestamp;
  imageUrl: string;
  isPublished: boolean;
  slug:string;
  tags:string[];
  title: string;
  updatedAt:Timestamp;
}; 
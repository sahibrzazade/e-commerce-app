import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { Product } from '../types/index';

export const fetchProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCol);
  const productList: Product[] = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, 'id'>),
  }));
  return productList;
};

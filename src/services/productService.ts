import { collection, doc, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { Product } from '../types/index';

export const productService = {
  async getProducts(): Promise<Product[]> {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('isAvailable', 'desc'));
    const productsSnapshot = await getDocs(q);
    const productList: Product[] = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    }));
    return productList;
  },
  async getProductById(productId: string): Promise<Product | null> {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...(productSnapshot.data() as Omit<Product, 'id'>),
      };
    }
    return null;
  }
};
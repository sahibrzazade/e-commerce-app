import { collection, doc, getDoc, getDocs, query, orderBy, where, QueryConstraint } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { Product } from '../types/index';
import { FilterOptions } from '../types';

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

  async getFilteredProducts(filters: FilterOptions): Promise<Product[]> {
    const productsRef = collection(db, 'products');
    const constraints: QueryConstraint[] = [];

    if (filters.priceRange[0] > 0) {
      constraints.push(where('price', '>=', filters.priceRange[0]));
    }
    if (filters.priceRange[1] < 1000) {
      constraints.push(where('price', '<=', filters.priceRange[1]));
    }

    if (filters.categories.length > 0) {
      constraints.push(where('category', 'in', filters.categories));
    }

    if (filters.brands.length > 0) {
      constraints.push(where('brand', 'in', filters.brands));
    }

    if (filters.rating > 0) {
      constraints.push(where('stars', '>=', filters.rating));
    }

    if (filters.inStock) {
      constraints.push(where('isAvailable', '==', true));
    }

    constraints.push(orderBy('isAvailable', 'desc'));

    const q = query(productsRef, ...constraints);
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
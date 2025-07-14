import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { Brand, Category } from '../types/filter';

export const brandCategoryService = {
  async getBrands(): Promise<Brand[]> {
    const brandsRef = collection(db, 'brands');
    const brandsSnapshot = await getDocs(brandsRef);
    return brandsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Brand, 'id'>),
    }));
  },

  async getCategories(): Promise<Category[]> {
    const categoriesRef = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesRef);
    return categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Category, 'id'>),
    }));
  },
}; 
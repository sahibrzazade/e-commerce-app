import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { wishlistService } from '../services/wishlistService';
import { useAuthUser } from './useAuthUser';
import { Product } from '../types/shop';
import { FilterOptions } from '../types/filter';
import { showErrorMessage } from '../utils/toastUtils';

interface ProductWithWishlist extends Product {
  isWishlisted: boolean;
}

export function useAllProductsWithWishlistStatus(filters?: FilterOptions) {
  const user = useAuthUser();

  const [products, setProducts] = useState<ProductWithWishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchData = async (showLoading: boolean = true) => {
    if (showLoading) setLoading(true);
    try {
      let backendFilters: FilterOptions = {
        priceRange: [0, 1000],
        categories: [],
        brands: [],
        rating: 0,
        inStock: false,
      };
      if (filters) {
        backendFilters = {
          priceRange: filters.priceRange,
          categories: filters.categories,
          brands: filters.brands,
          rating: 0,
          inStock: false,
        };
      }
      const products = await productService.getFilteredProducts(backendFilters);
      let wishlistIds: string[] = [];
      if (user) {
        wishlistIds = await wishlistService.getWishlist(user.uid);
      }
      let filtered = products;
      if (filters) {
        if (filters.rating > 0) {
          filtered = filtered.filter(product => (product.stars || 0) >= filters.rating);
        }
        if (filters.inStock) {
          filtered = filtered.filter(product => product.isAvailable);
        }
      }
      const productsWithWishlist = filtered.map(product => ({
        ...product,
        isWishlisted: wishlistIds.includes(product.id),
      }));
      setProducts(productsWithWishlist);
    } catch (err) {
      showErrorMessage();
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setInitialLoading(true);
      await fetchData(true);
      setInitialLoading(false);
    };
    load();
  }, [user, filters ? JSON.stringify(filters) : '']);

  return { products, loading, initialLoading, fetchData };
}

export function useProductWithWishlistById(productId: string | undefined) {
  const user = useAuthUser();

  const [product, setProduct] = useState<ProductWithWishlist | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const prod = await productService.getProductById(productId);
      if (!prod) {
        setProduct(null);
        setLoading(false);
        return;
      }
      let isWishlisted = false;
      if (user) {
        const wishlistIds = await wishlistService.getWishlist(user.uid);
        isWishlisted = wishlistIds.includes(prod.id);
      }
      setProduct({ ...prod, isWishlisted });
    } catch (err) {
      showErrorMessage();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, productId]);

  return { product, loading, fetchData };
} 
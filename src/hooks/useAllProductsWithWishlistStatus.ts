import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { wishlistService } from '../services/wishlistService';
import { useAuthUser } from './useAuthUser';
import { Product } from '../types/shop';
import { FilterOptions } from '../types/filter';
import { showErrorMessage } from '../utils/toastUtils';

interface ProductWithWishlist extends Product {
  isWishlisted: boolean;
}

async function fetchProductsWithWishlistStatus(
  filters: FilterOptions | undefined,
  userId: string | undefined
): Promise<ProductWithWishlist[]> {
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
  if (userId) {
    wishlistIds = await wishlistService.getWishlist(userId);
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
  return filtered.map(product => ({
    ...product,
    isWishlisted: wishlistIds.includes(product.id),
  }));
}

export function useAllProductsWithWishlistStatus(filters?: FilterOptions) {
  const user = useAuthUser();

  const {
    data: products = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<ProductWithWishlist[], Error>({
    queryKey: [
      'products-with-wishlist',
      user?.uid ?? null,
      filters ? JSON.stringify(filters) : null,
    ],
    queryFn: async () => {
      try {
        return await fetchProductsWithWishlistStatus(filters, user?.uid);
      } catch (e) {
        showErrorMessage();
        throw e;
      }
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

  return {
    products,
    loading: isLoading || isFetching,
    error,
    refetch,
  };
}

export function useProductWithWishlistById(productId: string | undefined) {
  const user = useAuthUser();

  const {
    data: product,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<ProductWithWishlist | null, Error>({
    queryKey: [
      'product-with-wishlist',
      user?.uid ?? null,
      productId ?? null,
    ],
    queryFn: async () => {
      try {
        if (!productId) return null;
        const prod = await productService.getProductById(productId);
        if (!prod) return null;
        let isWishlisted = false;
        if (user) {
          const wishlistIds = await wishlistService.getWishlist(user.uid);
          isWishlisted = wishlistIds.includes(prod.id);
        }
        return { ...prod, isWishlisted };
      } catch (e) {
        showErrorMessage();
        throw e;
      }
    },
    enabled: !!user && !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    product,
    loading: isLoading || isFetching,
    error,
    refetch,
  };
} 
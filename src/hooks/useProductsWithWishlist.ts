import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { wishlistService } from '../services/wishlistService';
import { useAuthUser } from './useAuthUser';
import { Product } from '../types/shop';

interface ProductWithWishlist extends Product {
  isWishlisted: boolean;
}

export function useProductsWithWishlist() {
  const user = useAuthUser();
  const [products, setProducts] = useState<ProductWithWishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await productService.getProducts();
      let wishlistIds: string[] = [];
      if (user) {
        wishlistIds = await wishlistService.getWishlist(user.uid);
      }
      const productsWithWishlist = products.map(product => ({
        ...product,
        isWishlisted: wishlistIds.includes(product.id),
      }));
      setProducts(productsWithWishlist);
    } catch (err) {
      setError('Failed to fetch products or wishlists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return { products, loading, error, refetch: fetchData };
}

export function useProductWithWishlistById(productId: string | undefined) {
  const user = useAuthUser();
  const [product, setProduct] = useState<ProductWithWishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
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
      setError('Failed to fetch product or wishlists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, productId]);

  return { product, loading, error, refetch: fetchData };
} 
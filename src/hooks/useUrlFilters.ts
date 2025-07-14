import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FilterOptions } from '../types';

function filtersToQuery(filters: FilterOptions) {
  const params = new URLSearchParams();
  if (filters.categories.length) params.set('categories', filters.categories.join(','));
  if (filters.brands.length) params.set('brands', filters.brands.join(','));
  if (filters.priceRange[0] > 0) params.set('minPrice', filters.priceRange[0].toString());
  if (filters.priceRange[1] < 1000) params.set('maxPrice', filters.priceRange[1].toString());
  if (filters.rating > 0) params.set('rating', filters.rating.toString());
  if (filters.inStock) params.set('inStock', '1');
  return params;
}

function queryToFilters(params: URLSearchParams): FilterOptions {
  return {
    categories: params.get('categories')?.split(',').filter(Boolean) || [],
    brands: params.get('brands')?.split(',').filter(Boolean) || [],
    priceRange: [
      Number(params.get('minPrice')) || 0,
      Number(params.get('maxPrice')) || 1000,
    ],
    rating: Number(params.get('rating')) || 0,
    inStock: params.get('inStock') === '1',
  };
}

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>(() => queryToFilters(searchParams));

  useEffect(() => {
    setFilters(queryToFilters(searchParams));
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setSearchParams(filtersToQuery(newFilters));
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 1000],
      categories: [],
      brands: [],
      rating: 0,
      inStock: false,
    };
    updateFilters(defaultFilters);
  }, [updateFilters]);

  return { filters, setFilters: updateFilters, resetFilters };
} 
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

export function useUrlSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortByState] = useState(() => searchParams.get('sortBy') || '');

  useEffect(() => {
    setSortByState(searchParams.get('sortBy') || '');
  }, [searchParams]);

  const setSortBy = useCallback((value: string) => {
    setSortByState(value);
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set('sortBy', value);
    } else {
      params.delete('sortBy');
    }
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  return [sortBy, setSortBy] as const;
} 
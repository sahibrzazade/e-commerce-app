import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

export function useUrlSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearchState] = useState(() => searchParams.get('search') || '');

    useEffect(() => {
        setSearchState(searchParams.get('search') || '');
    }, [searchParams]);

    const setSearch = useCallback((value: string) => {
        setSearchState(value);
        const params = new URLSearchParams(searchParams);
        if (value.trim()) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        setSearchParams(params);
    }, [searchParams, setSearchParams]);

    return [search, setSearch] as const;
} 
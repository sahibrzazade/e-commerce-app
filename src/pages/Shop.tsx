import { SearchFilterInput } from "../components/shop/SearchFilterInput";
import AppLayout from "../layouts/AppLayout";
import { SortOptions } from "../components/shop/SortOptions";
import { ProductFilter } from "../components/shop/ProductFilter";
import { ProductCard } from "../components/shop/ProductCard";
import { FilterOptions } from "../types";
import { FilterSummary } from "../components/shop/FilterSummary";
import { useAllProductsWithWishlistStatus } from "../hooks/useAllProductsWithWishlistStatus";
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useMemo, useEffect, useState } from 'react';
import { useUrlSearch } from '../hooks/useUrlSearch';
import { useUrlSort } from '../hooks/useUrlSort';
import { useTranslation } from "react-i18next";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";
import { reverseThemedBackground, reverseThemedText } from "../styles/themeClassNames";

export const Shop = () => {
    const { filters: activeFilters, setFilters: setActiveFilters, resetFilters } = useUrlFilters();
    const { products, loading } = useAllProductsWithWishlistStatus(activeFilters);
    const [search, setSearch] = useUrlSearch();
    const [sortBy] = useUrlSort();
    const { t } = useTranslation();

    const [showSkeleton, setShowSkeleton] = useState(false);

    const filteredProducts = useMemo(() => {
        let result = products;
        if (search.trim()) {
            const searchLower = search.trim().toLowerCase();
            result = result.filter(product =>
                (product.name && product.name.toLowerCase().includes(searchLower)) ||
                (product.description && product.description.toLowerCase().includes(searchLower))
            );
        }

        if (sortBy) {
            result = [...result];
            switch (sortBy) {
                case 'name_asc':
                    result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                    break;
                case 'name_desc':
                    result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
                    break;
                case 'price_asc':
                    result.sort((a, b) => (a.price || 0) - (b.price || 0));
                    break;
                case 'price_desc':
                    result.sort((a, b) => (b.price || 0) - (a.price || 0));
                    break;
                case 'stars_asc':
                    result.sort((a, b) => (a.stars || 0) - (b.stars || 0));
                    break;
                case 'stars_desc':
                    result.sort((a, b) => (b.stars || 0) - (a.stars || 0));
                    break;
                default:
                    break;
            }
        }
        return result;
    }, [products, search, sortBy]);

    const handleFiltersChange = (filters: FilterOptions) => {
        setActiveFilters(filters);
    };

    const handleClearFilter = (filterType: keyof FilterOptions | 'clearAll', value?: any) => {
        if (filterType === 'clearAll') {
            resetFilters();
            return;
        }
        let newFilters = { ...activeFilters };
        switch (filterType) {
            case 'priceRange':
                newFilters.priceRange = [0, 1000];
                break;
            case 'categories':
                newFilters.categories = activeFilters.categories.filter(cat => cat !== value);
                break;
            case 'brands':
                newFilters.brands = activeFilters.brands.filter(brand => brand !== value);
                break;
            case 'rating':
                newFilters.rating = 0;
                break;
            case 'inStock':
                newFilters.inStock = false;
                break;
        }
        setActiveFilters(newFilters);
    };

    useEffect(() => {
        if (loading) {
            setShowSkeleton(true);
        } else {
            const timeout = setTimeout(() => setShowSkeleton(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    return (
        <AppLayout>
            <>
                <div className={`${reverseThemedBackground} ${reverseThemedText} w-full h-[500px] flex justify-center items-center`}>
                    <h1 className="text-5xl font-bold tracking-wide uppercase">{t("common:shop")}</h1>
                </div>
                <div className="flex flex-col gap-y-4 md:gap-y-0 items-center md:flex-row justify-around my-8">
                    <ProductFilter onFiltersChange={handleFiltersChange} activeFilters={activeFilters} />
                    <SearchFilterInput value={search} onChange={setSearch} />
                    <SortOptions />
                </div>
                <FilterSummary filters={activeFilters} onClearFilter={handleClearFilter} />
                <div className="flex flex-wrap justify-center items-center gap-12 my-8">
                    {showSkeleton ? (
                        Array.from({ length: 8 }).map((_, idx) => (
                            <ProductCardSkeleton key={idx} />
                        ))
                    ) :
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
            </>
        </AppLayout>
    );
}

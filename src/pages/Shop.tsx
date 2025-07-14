import { SearchFilterInput } from "../components/shop/SearchFilterInput";
import AppLayout from "../layouts/AppLayout";
import { SortOptions } from "../components/shop/SortOptions";
import { ProductFilter } from "../components/shop/ProductFilter";
import { ProductCard } from "../components/shop/ProductCard";
import { FilterOptions } from "../types";
import { FilterSummary } from "../components/shop/FilterSummary";
import { useAllProductsWithWishlistStatus } from "../hooks/useAllProductsWithWishlistStatus";
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useMemo } from 'react';
import { useUrlSearch } from '../hooks/useUrlSearch';

export const Shop = () => {
    const { filters: activeFilters, setFilters: setActiveFilters, resetFilters } = useUrlFilters();
    const { products, loading } = useAllProductsWithWishlistStatus(activeFilters);

    const [search, setSearch] = useUrlSearch();

    const filteredProducts = useMemo(() => {
        if (!search.trim()) return products;
        const searchLower = search.trim().toLowerCase();
        return products.filter(product =>
            (product.name && product.name.toLowerCase().includes(searchLower)) ||
            (product.description && product.description.toLowerCase().includes(searchLower))
        );
    }, [products, search]);

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

    return (
        <AppLayout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) :
                <>
                    <div className="w-full h-[500px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('https://dunker.qodeinteractive.com/wp-content/uploads/2023/01/inner-img-6.jpg')" }}>
                        <h1 className="text-5xl font-bold tracking-wide uppercase">Shop</h1>
                    </div>
                    <div className="flex flex-col gap-y-4 md:gap-y-0 items-center md:flex-row justify-around my-8">
                        <ProductFilter onFiltersChange={handleFiltersChange} activeFilters={activeFilters} />
                        <SearchFilterInput value={search} onChange={setSearch} />
                        <SortOptions />
                    </div>
                    <FilterSummary filters={activeFilters} onClearFilter={handleClearFilter} />
                    <div className="flex flex-wrap justify-center items-center gap-12 my-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            }
        </AppLayout>
    );
}

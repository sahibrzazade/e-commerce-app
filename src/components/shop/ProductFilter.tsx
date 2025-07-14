import { OutlinedButton } from "../OutlinedButton"
import { FilterOutlined } from "@ant-design/icons"
import { useState } from "react"
import { FilterOffcanvas } from "./FilterOffcanvas"
import { FilterOptions } from "../../types"

interface ProductFilterProps {
  onFiltersChange?: (filters: FilterOptions) => void;
  activeFilters?: FilterOptions;
}

export const ProductFilter = ({ onFiltersChange, activeFilters }: ProductFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    onFiltersChange?.(filters);
  };

  const hasActiveFilters = activeFilters && (
    activeFilters.categories.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.rating > 0 ||
    activeFilters.inStock ||
    activeFilters.priceRange[0] > 0 ||
    activeFilters.priceRange[1] < 1000
  );

  return (
    <div className="relative">
      <OutlinedButton 
        content={<FilterOutlined />} 
        height={40} 
        width={40} 
        fontWeight={"normal"} 
        onClick={handleFilterClick}
      />
      {hasActiveFilters && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      )}
      <FilterOffcanvas 
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilters={handleApplyFilters}
        currentFilters={activeFilters || {
          priceRange: [0, 1000],
          categories: [],
          brands: [],
          rating: 0,
          inStock: false,
        }}
      />
    </div>
  )
}

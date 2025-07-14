import { FilterOptions } from "../../types";
import { CloseOutlined } from "@ant-design/icons";

interface FilterSummaryProps {
  filters: FilterOptions;
  onClearFilter: (filterType: keyof FilterOptions | 'clearAll', value?: any) => void;
}

export const FilterSummary = ({ filters, onClearFilter }: FilterSummaryProps) => {
  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.rating > 0 ||
    filters.inStock ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-3">
      <span className="text-sm font-medium text-gray-400">Active filters:</span>
      
      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all duration-200 ease-in-out">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
          <button
            onClick={() => onClearFilter('priceRange')}
            className="ml-1 hover:text-blue-600 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out"
          >
            <CloseOutlined className="text-xs" />
          </button>
        </span>
      )}

      {filters.categories.map((category) => (
        <span key={category} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 hover:bg-green-200 transition-all duration-200 ease-in-out">
          {category}
          <button
            onClick={() => onClearFilter('categories', category)}
            className="ml-1 hover:text-green-600 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out"
          >
            <CloseOutlined className="text-xs" />
          </button>
        </span>
      ))}

      {filters.brands.map((brand) => (
        <span key={brand} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 hover:bg-purple-200 transition-all duration-200 ease-in-out">
          {brand}
          <button
            onClick={() => onClearFilter('brands', brand)}
            className="ml-1 hover:text-purple-600 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out"
          >
            <CloseOutlined className="text-xs" />
          </button>
        </span>
      ))}

      {filters.rating > 0 && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all duration-200 ease-in-out">
          {filters.rating}+ stars
          <button
            onClick={() => onClearFilter('rating')}
            className="ml-1 hover:text-yellow-600 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out"
          >
            <CloseOutlined className="text-xs" />
          </button>
        </span>
      )}

      {filters.inStock && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 hover:bg-red-200 transition-all duration-200 ease-in-out">
          In Stock Only
          <button
            onClick={() => onClearFilter('inStock')}
            className="ml-1 hover:text-red-600 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out"
          >
            <CloseOutlined className="text-xs" />
          </button>
        </span>
      )}

      <button
        onClick={() => onClearFilter('clearAll')}
        className="text-xs text-gray-400 hover:text-white active:scale-95 underline cursor-pointer transition-all duration-200 ease-in-out"
      >
        Clear all
      </button>
    </div>
  );
}; 
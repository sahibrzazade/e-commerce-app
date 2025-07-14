export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  rating: number;
  inStock: boolean;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface FilterOffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  handleClearFilter?: (filterType: keyof FilterOptions | 'clearAll', value?: any) => void;
} 

export interface SearchFilterInputProps {
  value: string;
  onChange: (value: string) => void;
} 
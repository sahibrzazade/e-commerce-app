import { CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Slider, Box } from "@mui/material";
import Rating from '@mui/material/Rating';
import { FilterOptions, FilterOffcanvasProps, Brand, Category } from "../../types";
import { brandCategoryService } from '../../services/brandCategoryService';
import { getFilterOffcanvasSliderSx } from "../../styles/filterOffcanvas";
import { themedBorder, themedBackground } from "../../styles/themeClassNames";
import { useTheme } from "../../contexts/themeContext";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const FilterOffcanvas = ({ isOpen, onClose, onApplyFilters, currentFilters }: FilterOffcanvasProps) => {
  const { theme } = useTheme();

  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: newValue as [number, number]
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      rating
    }));
  };

  const handleStockChange = (inStock: boolean) => {
    setFilters(prev => ({
      ...prev,
      inStock
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      categories: [],
      brands: [],
      rating: 0,
      inStock: false,
    });
  };

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    Promise.all([
      brandCategoryService.getCategories(),
      brandCategoryService.getBrands()
    ]).then(([cats, brs]) => {
      setCategories(cats);
      setBrands(brs);
    })
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      <div className={`${themedBackground} fixed left-0 top-0 h-full w-80 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800 cursor-pointer rounded-full transition-colors"
            >
              <CloseOutlined className="text-lg" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Price Range</h3>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={filters.priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  sx={getFilterOffcanvasSliderSx(theme)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <span>
                    ${filters.priceRange[0]}
                  </span>

                  <span>
                    ${filters.priceRange[1]}
                  </span>
                </Box>
              </Box>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand.name)}
                      onChange={() => handleBrandChange(brand.name)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Minimum Rating</h3>
              <div className="flex items-center space-x-2">
                <Rating
                  name="filter-rating"
                  value={filters.rating}
                  onChange={(_event, newValue) => handleRatingChange(newValue || 0)}
                  precision={1}
                  size="large"
                  icon={<StarIcon sx={{ color: 'gold' }} />}
                  emptyIcon={<StarBorderIcon sx={{ color: 'gray' }} />}
                />
                <span className="text-gray-600 ml-2">({filters.rating}+ stars)</span>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleStockChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={handleApplyFilters}
              className={`${themedBorder} ${themedBackground} w-full py-3 px-4 hover:bg-gray-200 hover:dark:bg-gray-800 cursor-pointer transition-colors font-medium`}
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 hover:bg-gray-300 cursor-pointer transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}; 
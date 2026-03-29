'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { PRODUCT_CATEGORIES, PRODUCT_CONDITIONS } from '@/config/constants';

interface ProductFilterProps {
  brands: string[];
  categories: string[];
}

export default function ProductFilter({ brands, categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [minLumens, setMinLumens] = useState(searchParams.get('minLumens') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedBrand) params.set('brand', selectedBrand);
    if (selectedCondition) params.set('condition', selectedCondition);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minLumens) params.set('minLumens', minLumens);

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedCondition('');
    setMinPrice('');
    setMaxPrice('');
    setMinLumens('');
    router.push('/products');
  };

  const hasActiveFilters = selectedCategory || selectedBrand || selectedCondition || minPrice || maxPrice || minLumens;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="space-y-2">
            {Object.entries(PRODUCT_CATEGORIES).map(([key, label]) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={key}
                  checked={selectedCategory === key}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">All Categories</span>
            </label>
          </div>
        </div>

        {/* Brand Filter */}
        {brands.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Brand
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrand === brand}
                    onChange={(e) => setSelectedBrand(e.target.checked ? brand : '')}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Condition Filter */}
        <div className="pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Condition
          </label>
          <div className="space-y-2">
            {Object.entries(PRODUCT_CONDITIONS).map(([key, label]) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCondition === key}
                  onChange={(e) => setSelectedCondition(e.target.checked ? key : '')}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Lumens Filter */}
        <div className="pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Minimum Brightness
          </label>
          <select
            value={minLumens}
            onChange={(e) => setMinLumens(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Any Lumens</option>
            <option value="2000">2000+ Lumens</option>
            <option value="3000">3000+ Lumens</option>
            <option value="4000">4000+ Lumens</option>
            <option value="5000">5000+ Lumens</option>
          </select>
        </div>

        {/* Apply Button */}
        <div className="pt-6">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

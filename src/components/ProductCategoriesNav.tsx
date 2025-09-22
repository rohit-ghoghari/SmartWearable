import { useState } from 'react';

interface ProductCategoriesNavProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

const categories = [
  { name: 'All Products', value: null },
  { name: 'Smart Glasses', value: 'Smart Glasses' },
  { name: 'Smart Rings', value: 'Smart Rings' },
  { name: 'Smart Watches', value: 'Smartwatches' },
  { name: 'Fitness Trackers', value: 'Fitness Trackers' },
  { name: 'Health Monitors', value: 'Health Monitors' }
];

export function ProductCategoriesNav({ onCategorySelect, selectedCategory }: ProductCategoriesNavProps) {
  return (
    <div 
      className="border-b sticky top-20 z-40 bg-white"
      style={{ borderColor: 'var(--borders)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide py-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.value)}
              className={`whitespace-nowrap pb-2 border-b-2 transition-colors duration-300 font-medium ${
                selectedCategory === category.value
                  ? 'border-current'
                  : 'border-transparent hover:border-current'
              }`}
              style={{
                color: selectedCategory === category.value 
                  ? 'var(--primary-accent)' 
                  : 'var(--secondary-text)',
                borderColor: selectedCategory === category.value 
                  ? 'var(--primary-accent)' 
                  : 'transparent'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
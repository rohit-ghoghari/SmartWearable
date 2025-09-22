import { useState, useEffect, useRef } from "react";
import { Search, Clock, Zap } from "lucide-react";
import { Product } from "./ProductCard";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  products,
  onProductSelect,
}: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [recentSearches] = useState<string[]>([
    "Smart Glasses",
    "Fitness Tracker",
    "SmartWatch",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered.slice(0, 6));
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4"
        style={{
          border: `1px solid var(--borders)`,
          boxShadow: '0 8px 32px var(--shadow)'
        }}
      >
        {/* Search Input */}
        <div 
          className="p-4"
          style={{ borderBottom: `1px solid var(--borders)` }}
        >
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--secondary-text)' }}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search smart tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--secondary-accent)',
                border: `1px solid var(--borders)`,
                color: 'var(--primary-text)',
                focusRingColor: 'var(--primary-accent)'
              }}
            />
            <div 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm"
              style={{ color: 'var(--secondary-text)' }}
            >
              ESC
            </div>
          </div>
        </div>

        {/* Search Content */}
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.trim() === "" ? (
            /* Recent Searches */
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock 
                  className="w-4 h-4"
                  style={{ color: 'var(--secondary-text)' }}
                />
                <span 
                  className="text-sm"
                  style={{ color: 'var(--secondary-text)' }}
                >
                  Recent searches
                </span>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="block w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-gray-100"
                    style={{ color: 'var(--primary-text)' }}
                  >
                    {search}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap 
                    className="w-4 h-4"
                    style={{ color: 'var(--primary-accent)' }}
                  />
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    Quick search
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Smartwatches",
                    "Fitness Trackers", 
                    "Smart Glasses",
                    "Health Monitors",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSearchQuery(category)}
                      className="px-3 py-1 text-sm rounded-full transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: 'var(--secondary-accent)',
                        color: 'var(--primary-text)'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="p-4">
              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <div 
                    className="text-sm mb-3"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""} found
                  </div>
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 text-left">
                        <div 
                          className="font-bold"
                          style={{ color: 'var(--primary-text)' }}
                        >
                          {product.name}
                        </div>
                        <div 
                          className="text-sm"
                          style={{ color: 'var(--secondary-text)' }}
                        >
                          {product.category}
                        </div>
                      </div>
                      <div 
                        className="font-bold"
                        style={{ color: 'var(--primary-accent)' }}
                      >
                        ${product.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div 
                    className="text-lg"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    No products found
                  </div>
                  <div 
                    className="text-sm mt-1"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    Try searching for "smartwatch" or "fitness tracker"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
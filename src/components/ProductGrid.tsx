import { useState, useEffect } from "react";
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Search,
} from "lucide-react";
import { ProductCard, Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlistedItems: Set<number>;
  onToggleWishlist: (productId: number) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function ProductGrid({
  products,
  onAddToCart,
  onViewDetails,
  wishlistedItems,
  onToggleWishlist,
  selectedCategory: propSelectedCategory = "All",
  onCategoryChange,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    propSelectedCategory,
  );
  const [sortBy, setSortBy] = useState("Recommended");

  // Update local state when prop changes
  useEffect(() => {
    setSelectedCategory(propSelectedCategory);
  }, [propSelectedCategory]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "grid",
  );

  const categories = [
    "All",
    "Smart Glasses",
    "Smart Rings",
    "Smart Watches",
    "Fitness Trackers",
    "Health Monitors",
  ];
  const sortOptions = [
    "Recommended",
    "Top sellers",
    "New arrivals",
    "Price low to high",
    "Price high to low",
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] &&
        product.price <= priceRange[1];
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Price low to high":
          return a.price - b.price;
        case "Price high to low":
          return b.price - a.price;
        case "New arrivals":
          return b.id - a.id;
        case "Top sellers":
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white min-h-screen py-4 md:py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Filter/Sort */}
          <div className="lg:w-80 space-y-4 lg:space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3
                className="text-lg mb-4 text-black"
                style={{
                  fontFamily:
                    "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500,
                }}
              >
                Search
              </h3>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  style={{
                    fontFamily:
                      "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    backgroundColor: "white",
                  }}
                />
              </div>
            </div>

            {/* Categories - Hidden on mobile since available in navigation */}
            <div className="hidden md:block bg-white rounded-lg border border-gray-200 p-4">
              <h3
                className="text-lg mb-4 text-black"
                style={{
                  fontFamily:
                    "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500,
                }}
              >
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      if (onCategoryChange) {
                        onCategoryChange(category);
                      }
                    }}
                    className={`block w-full text-left py-2 px-3 rounded transition-colors duration-200 ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === category
                          ? "#0A73BE"
                          : "transparent",
                      fontFamily:
                        "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3
                className="text-lg mb-4 text-black"
                style={{
                  fontFamily:
                    "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500,
                }}
              >
                Sort By
              </h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`block w-full text-left py-2 px-3 rounded transition-colors duration-200 ${
                      sortBy === option
                        ? "text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor:
                        sortBy === option
                          ? "#0A73BE"
                          : "transparent",
                      fontFamily:
                        "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3
                className="text-lg mb-4 text-black"
                style={{
                  fontFamily:
                    "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500,
                }}
              >
                Price Range
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number(e.target.value),
                    ])
                  }
                  className="w-full"
                  style={{ accentColor: "#0A73BE" }}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <div
                className="text-gray-600"
                style={{
                  fontFamily:
                    "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {filteredProducts.length} products found
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === "grid"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === "list"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-4 md:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  isWishlisted={wishlistedItems.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3
                  className="text-xl text-gray-600 mb-2"
                  style={{
                    fontFamily:
                      "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  No products found
                </h3>
                <p
                  className="text-gray-500"
                  style={{
                    fontFamily:
                      "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
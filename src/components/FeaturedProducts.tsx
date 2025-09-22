import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from './ProductCard';
import { useEffect, useRef, useState } from 'react';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlistedItems: Set<number>;
  onToggleWishlist: (productId: number) => void;
  onViewAllProducts?: () => void;
}

export function FeaturedProducts({ 
  products, 
  onAddToCart, 
  onViewDetails, 
  wishlistedItems, 
  onToggleWishlist,
  onViewAllProducts
}: FeaturedProductsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [visibleHeader, setVisibleHeader] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Header animation observer with reduced threshold for better performance
    if (headerRef.current) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleHeader(true);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      headerObserver.observe(headerRef.current);
      observers.push(headerObserver);
    }

    // Optimized card observers with CSS animation classes
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Use CSS classes instead of setTimeout for better performance
                setVisibleCards(prev => new Set([...prev, index]));
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
          }
        );

        observer.observe(cardRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [products]);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 md:mb-12 ${
            visibleHeader ? 'animate-fade-in-right' : 'animate-hidden'
          }`}
        >
          <h2 
            className="text-3xl md:text-4xl text-black mb-4 md:mb-6"
            style={{ 
              fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}
          >
            Featured Products
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Discover our most popular wearables, crafted with precision and designed for the modern lifestyle.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              ref={(el) => cardRefs.current[index] = el}
              className={`bg-white rounded-lg overflow-hidden cursor-pointer group hover-lift ${
                visibleCards.has(index) 
                  ? `animate-fade-in-right stagger-${Math.min(index + 1, 5)}` 
                  : 'animate-hidden'
              }`}
              style={{ 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                border: '1px solid #F0F0F0'
              }}
              onClick={() => onViewDetails(product)}
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover-scale"
                  style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                >
                  <Heart 
                    size={16} 
                    className={wishlistedItems.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'} 
                  />
                </button>

                {/* No dark overlay - clean hover effect only */}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 
                    className="text-lg font-medium text-black mb-2"
                    style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {product.name}
                  </h3>
                  <p 
                    className="text-sm text-gray-600 mb-2"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {product.brand} • {product.category}
                  </p>
                  <p 
                    className="text-xl font-bold"
                    style={{ 
                      color: '#0A73BE',
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    £{product.price.toFixed(2)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(product);
                    }}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-[#E1F5FA] hover:border-[#0A73BE] hover:text-[#0A73BE] transition-all duration-200"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-2 text-white rounded hover-scale"
                    style={{ backgroundColor: '#0A73BE' }}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={onViewAllProducts || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-[#E1F5FA] hover:border-[#0A73BE] hover:text-[#0A73BE] hover-button"
            style={{ 
              fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  isWishlisted: boolean;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, onAddToCart, onViewDetails, onToggleWishlist, isWishlisted, viewMode = 'grid' }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-lg overflow-hidden group cursor-pointer flex hover-lift"
        style={{
          border: '1px solid #F0F0F0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)'
        }}
        onClick={() => onViewDetails(product)}
      >
        <div className="w-48 aspect-square flex-shrink-0">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-6 flex justify-between items-center">
          <div>
            <h3 
              className="text-lg text-black mb-2"
              style={{ 
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              {product.name}
            </h3>
            <p 
              className="text-sm text-gray-600 mb-2"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              {product.brand}
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
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
            >
              <Heart size={20} className={isWishlisted ? 'text-red-500 fill-current' : ''} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="px-6 py-2 text-white rounded hover:bg-[#085a9a] transition-colors duration-200"
              style={{ 
                backgroundColor: '#0A73BE',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden group cursor-pointer hover-lift"
      style={{
        border: '1px solid #F0F0F0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)'
      }}
      onClick={() => onViewDetails(product)}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden relative">
        <ImageWithFallback
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
            className={isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'} 
          />
        </button>

        {/* No dark overlay - clean hover effect only */}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 
            className="text-lg text-black mb-2"
            style={{ 
              fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}
          >
            {product.name}
          </h3>
          <p 
            className="text-sm text-gray-600 mb-3"
            style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            {product.brand}
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
            className="px-4 py-2 text-white rounded hover:bg-[#085a9a] hover-scale"
            style={{ 
              backgroundColor: '#0A73BE',
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
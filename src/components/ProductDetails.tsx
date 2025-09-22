import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Shield, Gift, RotateCcw } from 'lucide-react';
import { Product } from './ProductCard';
import { PaymentMethods } from './PaymentMethods';
import { ReviewsSection } from './ReviewsSection';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
  onToggleWishlist: (productId: number) => void;
  isWishlisted: boolean;
}

export function ProductDetails({ 
  product, 
  onAddToCart, 
  onBack, 
  onToggleWishlist, 
  isWishlisted 
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('Standard');

  // Mock additional images for gallery
  const images = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const styles = ['Standard', 'Pro', 'Pro Max', 'Elite'];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 mb-8"
          style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <span 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    (127 reviews)
                  </span>
                </div>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  <Heart size={24} className={isWishlisted ? 'text-red-500 fill-current' : ''} />
                </button>
              </div>

              <h1 
                className="text-3xl text-black mb-2"
                style={{ 
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500
                }}
              >
                {product.name}
              </h1>
              
              <p 
                className="text-lg text-gray-600 mb-4"
                style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {product.brand}
              </p>

              <div className="flex items-center space-x-4 mb-6">
                <p 
                  className="text-3xl font-bold"
                  style={{ 
                    color: '#0A73BE',
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  £{product.price.toFixed(2)}
                </p>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium animate-pulse"
                  style={{ 
                    backgroundColor: '#3CAEE1',
                    color: 'white',
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  20 Visitors viewing
                </div>
              </div>

              {/* Sale Banner */}
              <div 
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-pulse"
                style={{ borderColor: '#3CAEE1', backgroundColor: '#E1F5FA' }}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="font-medium"
                    style={{ 
                      color: '#0A73BE',
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    Hurry! Sale Ends in:
                  </span>
                  <div 
                    className="font-bold"
                    style={{ 
                      color: '#0A73BE',
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    23:59:45
                  </div>
                </div>
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <h3 
                className="text-lg mb-4 text-black"
                style={{ 
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500
                }}
              >
                Style
              </h3>
              <div className="flex flex-wrap gap-3">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                      selectedStyle === style 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    style={{ 
                      borderColor: selectedStyle === style ? '#3CAEE1' : '#d1d5db',
                      backgroundColor: selectedStyle === style ? '#E1F5FA' : 'white',
                      color: selectedStyle === style ? '#0A73BE' : '#374151',
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div>
                <h3 
                  className="text-lg mb-4 text-black"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500
                  }}
                >
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span 
                      className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center"
                      style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <span 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Sold 274 pieces
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="w-full">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full flex items-center justify-center space-x-3 py-4 px-8 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#0A73BE',
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                    fontSize: '18px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#085a9a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(10, 115, 190, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0A73BE';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <ShoppingCart size={22} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Payment Methods - Closer placement to buttons */}
            <div className="pt-2 pb-0">
              <PaymentMethods />
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield 
                    size={24} 
                    className="mx-auto mb-2" 
                    style={{ color: '#0A73BE' }} 
                  />
                  <div 
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    2 Year Warranty
                  </div>
                </div>
                <div className="text-center">
                  <Gift 
                    size={24} 
                    className="mx-auto mb-2" 
                    style={{ color: '#0A73BE' }} 
                  />
                  <div 
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Make it a gift
                  </div>
                </div>
                <div className="text-center">
                  <RotateCcw 
                    size={24} 
                    className="mx-auto mb-2" 
                    style={{ color: '#0A73BE' }} 
                  />
                  <div 
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    30-Day Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description and Specs */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 
              className="text-2xl mb-6 text-black"
              style={{ 
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              Description
            </h2>
            <div 
              className="text-gray-600 leading-relaxed space-y-4"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <p>{product.description}</p>
              <p>
                Our smart wearables represent the pinnacle of modern technology, designed to seamlessly integrate into your daily routine while providing unprecedented insight into your health and productivity.
              </p>
              <p>
                Each device is meticulously crafted with premium materials and undergoes rigorous testing to ensure durability and performance that exceeds expectations.
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h2 
              className="text-2xl mb-6 text-black"
              style={{ 
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              Specifications
            </h2>
            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div 
                  key={key} 
                  className="flex justify-between items-center py-3 border-b border-gray-100"
                >
                  <span 
                    className="text-gray-600"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {key}
                  </span>
                  <span 
                    className="font-medium text-gray-900"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection 
          productName={product.name} 
          productCategory={product.category} 
        />
      </div>
    </div>
  );
}
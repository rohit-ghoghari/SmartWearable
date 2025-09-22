import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  cartItemCount: number;
  onSearchClick: () => void;
  onCategorySelect: (category: string) => void;
}

export function Navigation({ currentPage, onPageChange, cartItemCount, onSearchClick, onCategorySelect }: NavigationProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const productCategories = [
    'Smart Glasses',
    'Smart Rings', 
    'Smartwatches',
    'Fitness Trackers',
    'Health Monitors'
  ];

  // Check if we're on mobile/tablet
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnterDropdown = () => {
    if (isMobile) return; // Disable hover on mobile
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    if (isMobile) return; // Disable hover on mobile
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleMobileNavClick = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between py-3">
            {/* Logo - Left corner */}
            <button
              onClick={() => onPageChange('home')}
              className="text-2xl font-bold text-black hover:text-gray-700 transition-colors duration-200"
              style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              SmartWearable
            </button>

            {/* Navigation Links - Center */}
            <div className="flex items-center space-x-10">
              {/* All Products with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnterDropdown}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => onPageChange('shop')}
                  className={`text-base transition-colors duration-200 ${
                    currentPage === 'shop' 
                      ? 'text-black font-medium' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                  style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  All Products
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg py-2 min-w-[200px]"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    {productCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                        style={{ 
                          fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E1F5FA';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => onPageChange('info')}
                className={`text-base transition-colors duration-200 ${
                  currentPage === 'info' 
                    ? 'text-black font-medium' 
                    : 'text-gray-600 hover:text-black'
                }`}
                style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                About Us
              </button>

              <button
                onClick={() => onPageChange('contact')}
                className={`text-base transition-colors duration-200 ${
                  currentPage === 'contact' 
                    ? 'text-black font-medium' 
                    : 'text-gray-600 hover:text-black'
                }`}
                style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Contact Us
              </button>
            </div>

            {/* Action Icons - Right side */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onSearchClick}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => onPageChange('account')}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <User size={20} />
              </button>

              <button
                onClick={() => onPageChange('cart')}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200 relative"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: '#0A73BE' }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between py-3">
            {/* Hamburger Menu - Left corner on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Center on mobile */}
            <button
              onClick={() => handleMobileNavClick('home')}
              className="text-xl font-bold text-black hover:text-gray-700 transition-colors duration-200 absolute left-1/2 transform -translate-x-1/2"
              style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              SmartWearable
            </button>

            {/* Action Icons - Right side on mobile */}
            <div className="flex items-center space-x-1">
              <button
                onClick={onSearchClick}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
                style={{ marginRight: '10px' }}
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => handleMobileNavClick('cart')}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200 relative"
                style={{ marginLeft: '-20px' }}
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: '#0A73BE' }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 
                className="text-lg font-bold text-black"
                style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Menu
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="py-4">
              {/* Navigation Items */}
              <div className="px-4 space-y-1">
                <button
                  onClick={() => handleMobileNavClick('shop')}
                  className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
                    currentPage === 'shop' ? 'text-black font-medium' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  ALL PRODUCTS
                </button>
                
                {/* Product Categories - displayed as main menu items on mobile */}
                {productCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="block w-full text-left py-3 text-gray-600 hover:text-black transition-colors duration-200"
                    style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {category}
                  </button>
                ))}
                
                <div className="border-t border-gray-100 my-4"></div>
                <button
                  onClick={() => handleMobileNavClick('info')}
                  className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
                    currentPage === 'info' ? 'text-black font-medium' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  ABOUT US
                </button>

                <button
                  onClick={() => handleMobileNavClick('contact')}
                  className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
                    currentPage === 'contact' ? 'text-black font-medium' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  CONTACT US
                </button>

                <button
                  onClick={() => handleMobileNavClick('account')}
                  className={`block w-full text-left py-3 text-lg transition-colors duration-200 ${
                    currentPage === 'account' ? 'text-black font-medium' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  MY ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
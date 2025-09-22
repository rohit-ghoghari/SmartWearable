import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CertificationRibbon } from './components/CertificationRibbon';
import { ChatWidget } from './components/ChatWidget';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetails } from './components/ProductDetails';
import { Cart, CartItem } from './components/Cart';
import { Footer } from './components/Footer';
import { InfoPage } from './components/InfoPage';
import { ContactPage } from './components/ContactPage';
import { SearchOverlay } from './components/SearchOverlay';
import { AccountPage } from './components/AccountPage';
import { Product } from './components/ProductCard';
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Smart Glasses Pro",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1707167144717-683f1714939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjB0ZWNobm9sb2d5JTIwd2VhcmFibGV8ZW58MXx8fHwxNzU3MzI3MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Smart Glasses",
    brand: "TechVision",
    description: "Experience the future with our Smart Glasses Pro featuring AR display, voice commands, and all-day battery life. Perfect for professionals and tech enthusiasts who want to stay connected while on the move.",
    specs: {
      "Battery Life": "12 hours",
      "Display": "HD AR overlay",
      "Connectivity": "Bluetooth 5.0, WiFi",
      "Weight": "45g",
      "Water Resistance": "IPX4",
      "Voice Assistant": "Built-in AI"
    }
  },
  {
    id: 2,
    name: "Fitness Tracker Elite",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhY2tlciUyMHdlYXJhYmxlfGVufDF8fHx8MTc1NzMyNzM3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Fitness Trackers",
    brand: "FitTech",
    description: "Track every step, monitor your heart rate, and analyze your sleep patterns with our most advanced fitness tracker. Built for athletes and fitness enthusiasts who demand precision.",
    specs: {
      "Battery Life": "7 days",
      "Heart Rate": "24/7 monitoring",
      "GPS": "Built-in GPS",
      "Water Resistance": "50m waterproof",
      "Sensors": "Multi-sport tracking",
      "Display": "AMOLED color screen"
    }
  },
  {
    id: 3,
    name: "SmartWatch Ultra",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzMyNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Smartwatches",
    brand: "WearOS",
    description: "The ultimate smartwatch combining style and functionality. Make calls, send messages, track health metrics, and control your smart home devices right from your wrist.",
    specs: {
      "Battery Life": "2 days",
      "Display": "1.4\" OLED touchscreen",
      "Storage": "32GB internal",
      "Connectivity": "4G LTE, WiFi, Bluetooth",
      "Health Features": "ECG, SpO2, sleep tracking",
      "Operating System": "WearOS 4.0"
    }
  },
  {
    id: 4,
    name: "Smart Ring Gen 3",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1548098527-c4a916dcd948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHJpbmclMjB3ZWFyYWJsZSUyMGRldmljZXxlbnwxfHx8fDE3NTczMjczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Smart Rings",
    brand: "RingTech",
    description: "Discreet health monitoring in an elegant titanium ring. Track sleep, activity, heart rate, and body temperature with unparalleled accuracy and up to a week of battery life.",
    specs: {
      "Battery Life": "7 days",
      "Material": "Titanium",
      "Sensors": "Heart rate, temperature, accelerometer",
      "Water Resistance": "100m waterproof",
      "Sizes": "6-13 available",
      "Charging": "Wireless charging case"
    }
  },
  {
    id: 5,
    name: "Smart Glasses Lite",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1707167144717-683f1714939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjB0ZWNobm9sb2d5JTIwd2VhcmFibGV8ZW58MXx8fHwxNzU3MzI3MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Smart Glasses",
    brand: "TechVision",
    description: "Entry-level smart glasses with essential features including notifications, music control, and hands-free calling. Perfect for everyday use with a sleek, lightweight design.",
    specs: {
      "Battery Life": "8 hours",
      "Audio": "Open-ear speakers",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "35g",
      "Compatibility": "iOS & Android",
      "Charging": "USB-C fast charging"
    }
  },
  {
    id: 6,
    name: "Health Monitor Pro",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhY2tlciUyMHdlYXJhYmxlfGVufDF8fHx8MTc1NzMyNzM3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Health Monitors",
    brand: "MedTech",
    description: "Professional-grade health monitoring device with medical-grade sensors. Continuous monitoring of vital signs with integration to healthcare systems and emergency alerts.",
    specs: {
      "Battery Life": "10 days",
      "Sensors": "ECG, SpO2, blood pressure",
      "Accuracy": "Medical-grade precision",
      "Alerts": "Emergency contact system",
      "Data": "HIPAA compliant storage",
      "Connectivity": "4G LTE, WiFi"
    }
  },
  {
    id: 7,
    name: "AirPods Elite",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1596088869451-491e167efabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGVhcmJ1ZHMlMjB3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU3NTEyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Audio Wearables",
    brand: "SoundTech",
    description: "Premium wireless earbuds with active noise cancellation, spatial audio, and adaptive transparency. Designed for audiophiles who demand crystal-clear sound quality and all-day comfort.",
    specs: {
      "Battery Life": "6 hours + 24h case",
      "Audio": "Spatial audio, ANC",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4 sweat resistant",
      "Charging": "Wireless & USB-C",
      "Controls": "Touch & voice control"
    }
  },
  {
    id: 8,
    name: "Vital Band Pro",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595909315417-2edd382a56dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGJhbmQlMjBmaXRuZXNzJTIwd2VhcmFibGV8ZW58MXx8fHwxNzU3NTEyNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Fitness Trackers",
    brand: "VitalTech",
    description: "Sleek fitness band with comprehensive health monitoring including stress tracking, sleep analysis, and workout detection. Perfect for users who want essential health insights in a minimalist design.",
    specs: {
      "Battery Life": "14 days",
      "Health Tracking": "Heart rate, stress, sleep",
      "Display": "OLED touch screen",
      "Water Resistance": "5ATM waterproof",
      "Compatibility": "iOS & Android",
      "Sensors": "Accelerometer, gyroscope"
    }
  },
  {
    id: 9,
    name: "Smart Pendant Air",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1680068098781-da3b35935e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHBlbmRhbnQlMjBuZWNrbGFjZSUyMHdlYXJhYmxlfGVufDF8fHx8MTc1NzUxMjQ3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Smart Jewelry",
    brand: "LuxeTech",
    description: "Elegant smart pendant that monitors air quality, UV exposure, and sends discreet notifications. Combines fashion with function for users who prefer subtle, jewelry-style wearables.",
    specs: {
      "Battery Life": "5 days",
      "Sensors": "Air quality, UV, temperature",
      "Material": "Stainless steel & sapphire",
      "Notifications": "Vibration alerts",
      "Charging": "Magnetic wireless",
      "Style": "Available in 3 finishes"
    }
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set());
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Close search overlay when pressing '/' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !showSearch) {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast.success('Removed from wishlist');
      } else {
        newSet.add(productId);
        toast.success('Added to wishlist');
      }
      return newSet;
    });
  };

  const handleLearnMore = () => {
    setCurrentPage('info');
  };

  const handleExploreCollection = () => {
    setCurrentPage('shop');
  };

  const handleSearchProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('shop');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            <HeroSection 
              onLearnMore={handleLearnMore}
              onExploreCollection={handleExploreCollection}
            />
            {/* Reduced spacer for tighter visual flow */}
            <div className="py-4"></div>
            <FeaturedProducts
              products={mockProducts.slice(0, 3)}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewProductDetails}
              wishlistedItems={wishlistedItems}
              onToggleWishlist={handleToggleWishlist}
              onViewAllProducts={handleExploreCollection}
            />
            {/* Luxurious spacer for seamless transition */}

            <CertificationRibbon />
          </div>
        );
      case 'shop':
        return (
          <div>
            {/* Spacer for better visual hierarchy and breathing room */}
            <div className="py-8"></div>
            <ProductGrid
              products={mockProducts}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewProductDetails}
              wishlistedItems={wishlistedItems}
              onToggleWishlist={handleToggleWishlist}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        );
      case 'product-details':
        return selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentPage('shop')}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistedItems.has(selectedProduct.id)}
          />
        ) : null;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onBack={() => setCurrentPage('shop')}
          />
        );
      case 'info':
        return <InfoPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return (
          <AccountPage
            wishlistedItems={wishlistedItems}
            products={mockProducts}
            onViewProduct={handleViewProductDetails}
            onAddToCart={handleAddToCart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        cartItemCount={cartItemCount}
        onSearchClick={() => setShowSearch(true)}
        onCategorySelect={handleCategorySelect}
      />
      
      <SearchOverlay
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        products={mockProducts}
        onProductSelect={handleSearchProduct}
      />
      
      <main>
        {renderCurrentPage()}
      </main>
      
      {currentPage !== 'account' && currentPage !== 'cart' && <Footer />}
      
      <ChatWidget />
      
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0A73BE',
            color: 'white',
            border: 'none'
          }
        }}
      />
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { User, Package, Heart, MapPin, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Product } from './ProductCard';

interface AccountPageProps {
  wishlistedItems: Set<number>;
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  total: number;
  items: { product: Product; quantity: number }[];
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export function AccountPage({ wishlistedItems, products, onViewProduct, onAddToCart }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Mock data
  const mockOrders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 399.99,
      items: [
        { product: products[0], quantity: 1 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Processing',
      total: 199.99,
      items: [
        { product: products[1], quantity: 1 }
      ]
    }
  ];

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      isDefault: false
    }
  ]);

  const wishlistedProducts = products.filter(product => wishlistedItems.has(product.id));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab('orders');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoggedIn(true);
    setActiveTab('orders');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'Shipped': return 'bg-blue-500';
      case 'Processing': return 'bg-yellow-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-md mx-auto px-6">
          <Card 
            className="bg-white"
            style={{ border: `1px solid var(--borders)` }}
          >
            <CardHeader className="text-center">
              <CardTitle 
                className="text-2xl"
                style={{ color: 'var(--primary-text)' }}
              >
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
                <TabsList 
                  className="grid w-full grid-cols-2"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:text-white transition-all duration-200"
                    style={{ 
                      color: authMode === 'login' ? 'white' : 'var(--primary-accent)',
                      backgroundColor: authMode === 'login' ? 'var(--primary-accent)' : 'transparent',
                      border: authMode === 'login' ? 'none' : `1px solid var(--primary-accent)`,
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 'bold'
                    }}
                  >
                    Log In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="data-[state=active]:text-white transition-all duration-200"
                    style={{ 
                      color: authMode === 'register' ? 'white' : 'var(--primary-accent)',
                      backgroundColor: authMode === 'register' ? 'var(--primary-accent)' : 'transparent',
                      border: authMode === 'register' ? 'none' : `1px solid var(--primary-accent)`,
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 'bold'
                    }}
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full text-white font-bold"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    >
                      Log In
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full text-white font-bold"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    >
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card 
              className=""
              style={{
                backgroundColor: 'var(--secondary-accent)',
                border: `1px solid var(--borders)`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--primary-accent)' }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div 
                      className="font-bold"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      Ana Morosanu
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: 'var(--secondary-text)' }}
                    >
                      ana.morosanu@email.com
                    </div>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'orders' 
                        ? 'text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: activeTab === 'orders' ? 'var(--primary-accent)' : 'transparent',
                      color: activeTab === 'orders' ? 'white' : 'var(--primary-text)'
                    }}
                  >
                    <Package className="w-4 h-4" />
                    Order History
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'wishlist' 
                        ? 'text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: activeTab === 'wishlist' ? 'var(--primary-accent)' : 'transparent',
                      color: activeTab === 'wishlist' ? 'white' : 'var(--primary-text)'
                    }}
                  >
                    <Heart className="w-4 h-4" />
                    Saved Items
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'addresses' 
                        ? 'text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: activeTab === 'addresses' ? 'var(--primary-accent)' : 'transparent',
                      color: activeTab === 'addresses' ? 'white' : 'var(--primary-text)'
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Address Book
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <Card 
                className="bg-white"
                style={{ border: `1px solid var(--borders)` }}
              >
                <CardHeader>
                  <CardTitle style={{ color: 'var(--primary-text)' }}>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div 
                        key={order.id} 
                        className="rounded-lg p-4"
                        style={{ border: `1px solid var(--borders)` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div 
                              className="font-bold"
                              style={{ color: 'var(--primary-text)' }}
                            >
                              Order #{order.id}
                            </div>
                            <div 
                              className="text-sm"
                              style={{ color: 'var(--secondary-text)' }}
                            >
                              {order.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {order.status}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              style={{ 
                                color: 'var(--primary-accent)', 
                                borderColor: 'var(--primary-accent)' 
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <img
                            src={order.items[0].product.image}
                            alt={order.items[0].product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <div style={{ color: 'var(--primary-text)' }}>
                              {order.items[0].product.name}
                            </div>
                            <div 
                              className="text-sm"
                              style={{ color: 'var(--secondary-text)' }}
                            >
                              Quantity: {order.items[0].quantity}
                            </div>
                          </div>
                          <div 
                            className="font-bold"
                            style={{ color: 'var(--primary-accent)' }}
                          >
                            £{order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'wishlist' && (
              <Card 
                className="bg-white"
                style={{ border: `1px solid var(--borders)` }}
              >
                <CardHeader>
                  <CardTitle style={{ color: 'var(--primary-text)' }}>Saved Items</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistedProducts.map((product) => (
                        <div 
                          key={product.id} 
                          className="rounded-lg p-4"
                          style={{ border: `1px solid var(--borders)` }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-md mb-3 cursor-pointer"
                            onClick={() => onViewProduct(product)}
                          />
                          <div 
                            className="font-bold mb-1"
                            style={{ color: 'var(--primary-text)' }}
                          >
                            {product.name}
                          </div>
                          <div 
                            className="font-bold mb-3"
                            style={{ color: 'var(--primary-accent)' }}
                          >
                            £{product.price.toFixed(2)}
                          </div>
                          <Button
                            onClick={() => onAddToCart(product)}
                            className="w-full text-white font-bold"
                            style={{ backgroundColor: 'var(--primary-accent)' }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart 
                        className="w-16 h-16 mx-auto mb-4"
                        style={{ color: 'var(--secondary-text)' }}
                      />
                      <div 
                        className="text-lg"
                        style={{ color: 'var(--secondary-text)' }}
                      >
                        No saved items yet
                      </div>
                      <div 
                        className="text-sm mt-1"
                        style={{ color: 'var(--secondary-text)' }}
                      >
                        Browse products and save your favorites
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'addresses' && (
              <Card 
                className="bg-white"
                style={{ border: `1px solid var(--borders)` }}
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle style={{ color: 'var(--primary-text)' }}>Address Book</CardTitle>
                  <Button 
                    className="text-white font-bold"
                    style={{ backgroundColor: 'var(--primary-accent)' }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Address
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div 
                        key={address.id} 
                        className="rounded-lg p-4"
                        style={{ border: `1px solid var(--borders)` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="font-bold"
                                style={{ color: 'var(--primary-text)' }}
                              >
                                {address.name}
                              </div>
                              {address.isDefault && (
                                <Badge 
                                  className="text-white text-xs"
                                  style={{ backgroundColor: 'var(--primary-accent)' }}
                                >
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div 
                              className="text-sm"
                              style={{ color: 'var(--secondary-text)' }}
                            >
                              {address.street}<br />
                              {address.city}, {address.state} {address.zip}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              style={{ 
                                color: 'var(--primary-accent)', 
                                borderColor: 'var(--primary-accent)' 
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 border-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
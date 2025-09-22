import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Minus,
  Plus,
  X,
  CreditCard,
  Shield,
  ShoppingCart,
} from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onBack: () => void;
}

export function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
}: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    amount: number;
    percentage: number;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  // Default shipping is £10.00, becomes free when discount is applied
  const shipping = appliedDiscount ? 0 : 10.00;
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const total = subtotal + shipping - discountAmount;

  const handleQuantityChange = (productId: number, delta: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully! (This is a demo)");
    setShowCheckout(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }));
  };

  // Mock discount codes for demo
  const validDiscountCodes = {
    "SAVE10": { percentage: 10, description: "10% off your order" },
    "WELCOME20": { percentage: 20, description: "20% off for new customers" },
    "CYBERCY15": { percentage: 15, description: "15% off Cybercy special" },
    "TECH25": { percentage: 25, description: "25% off tech items" },
  };

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    setDiscountError("");

    if (!code) {
      setDiscountError("Please enter a discount code");
      return;
    }

    if (validDiscountCodes[code]) {
      const discountPercentage = validDiscountCodes[code].percentage;
      const discountAmount = (subtotal * discountPercentage) / 100;
      
      setAppliedDiscount({
        code: code,
        amount: discountAmount,
        percentage: discountPercentage,
      });
      setDiscountError("");
      setDiscountCode("");
    } else {
      setDiscountError("Invalid discount code");
      setAppliedDiscount(null);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setDiscountError("");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div 
            className="rounded-lg p-12"
            style={{
              backgroundColor: 'var(--secondary-accent)',
              border: `1px solid var(--borders)`
            }}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'var(--borders)' }}
            >
              <ShoppingCart 
                className="w-12 h-12"
                style={{ color: 'var(--secondary-text)' }}
              />
            </div>
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--primary-text)' }}
            >
              Your cart is empty
            </h2>
            <p 
              className="mb-8 max-w-md mx-auto"
              style={{ color: 'var(--secondary-text)' }}
            >
              Browse our latest smart tech to get started.
            </p>
            <Button
              onClick={onBack}
              className="text-white px-8 py-3 text-lg font-bold"
              style={{ backgroundColor: 'var(--primary-accent)' }}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h2 
            className="text-2xl font-bold mb-8"
            style={{ color: 'var(--primary-text)' }}
          >
            Checkout
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div 
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: 'var(--secondary-accent)',
                    border: `1px solid var(--borders)`
                  }}
                >
                  <h3 
                    className="text-lg font-bold mb-4"
                    style={{ color: 'var(--primary-text)' }}
                  >
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label 
                        htmlFor="name"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={checkoutData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="email"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={checkoutData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label 
                        htmlFor="address"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={checkoutData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="city"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        City
                      </Label>
                      <Input
                        id="city"
                        value={checkoutData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="zipCode"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        value={checkoutData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div 
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: 'var(--secondary-accent)',
                    border: `1px solid var(--borders)`
                  }}
                >
                  <h3 
                    className="text-lg font-bold mb-4"
                    style={{ color: 'var(--primary-text)' }}
                  >
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label 
                        htmlFor="cardNumber"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={checkoutData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="expiryDate"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={checkoutData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="cvv"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={checkoutData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        required
                        className="bg-white"
                        style={{
                          border: `1px solid var(--borders)`,
                          color: 'var(--primary-text)'
                        }}
                      />
                    </div>
                  </div>

                  <div 
                    className="flex items-center justify-center space-x-4 mt-6"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    <CreditCard className="w-8 h-8" />
                    <CreditCard className="w-8 h-8" />
                    <Shield className="w-8 h-8" />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 font-bold"
                    style={{ 
                      borderColor: 'var(--primary-accent)', 
                      color: 'var(--primary-accent)'
                    }}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 text-white font-bold transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--primary-accent)',
                      boxShadow: '0 4px 10px var(--shadow)'
                    }}
                  >
                    Place Order
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div 
              className="p-6 rounded-lg h-fit"
              style={{
                backgroundColor: 'var(--secondary-accent)',
                border: `1px solid var(--borders)`
              }}
            >
              <h3 
                className="text-lg font-bold mb-4"
                style={{ color: 'var(--primary-text)' }}
              >
                Order Summary
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p 
                        className="text-sm font-bold"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        {item.product.name}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--secondary-text)' }}
                      >
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p 
                      className="text-sm font-bold"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div 
                className="mt-4 pt-4 space-y-2"
                style={{ borderTop: `1px solid var(--borders)` }}
              >
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--secondary-text)' }}>Subtotal:</span>
                  <span style={{ color: 'var(--primary-text)' }}>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--secondary-text)' }}>Shipping:</span>
                  <span style={{ color: 'var(--primary-text)' }}>
                    {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                  </span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--secondary-text)' }}>
                      Discount ({appliedDiscount.code}):
                    </span>
                    <span className="text-green-600 font-medium">
                      -£{appliedDiscount.amount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div 
                  className="flex justify-between text-lg font-bold"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 
            className="text-2xl font-bold"
            style={{ color: 'var(--primary-text)' }}
          >
            Shopping Cart
          </h2>
          <Button
            variant="ghost"
            onClick={onBack}
            style={{ color: 'var(--primary-accent)' }}
          >
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: 'var(--secondary-accent)',
                  border: `1px solid var(--borders)`
                }}
              >
                <div className="flex items-center space-x-4">
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      {item.product.name}
                    </h3>
                    <p 
                      className="font-bold"
                      style={{ color: 'var(--primary-accent)' }}
                    >
                      £{item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div 
                      className="flex items-center rounded-lg overflow-hidden bg-white"
                      style={{ border: `1px solid var(--borders)` }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, -1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span 
                        className="px-4 py-2 bg-white font-bold min-w-[60px] text-center"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, 1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <p 
                      className="text-lg font-bold min-w-[80px] text-right"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div 
            className="p-6 rounded-lg h-fit"
            style={{
              backgroundColor: 'var(--secondary-accent)',
              border: `1px solid var(--borders)`
            }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--primary-text)' }}
            >
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span style={{ color: 'var(--secondary-text)' }}>Subtotal:</span>
                <span style={{ color: 'var(--primary-text)' }}>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--secondary-text)' }}>Shipping:</span>
                <span style={{ color: 'var(--primary-text)' }}>
                  {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Discount Code Section - Placed after shipping line */}
            <div className="mb-6">
              <Label 
                htmlFor="discount-code"
                className="text-sm font-medium mb-2 block"
                style={{ color: 'var(--primary-text)' }}
              >
                Discount Code
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="discount-code"
                  placeholder="Enter promo code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
                  className="flex-1 bg-white"
                  style={{
                    border: `1px solid var(--borders)`,
                    color: 'var(--primary-text)'
                  }}
                />
                <Button
                  onClick={handleApplyDiscount}
                  className="px-4 py-2 text-white font-medium"
                  style={{ backgroundColor: 'var(--primary-accent)' }}
                >
                  Apply
                </Button>
              </div>
              {discountError && (
                <p className="text-sm text-red-500 mt-2">{discountError}</p>
              )}
              {appliedDiscount && (
                <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded border border-green-200">
                  <span className="text-sm text-green-700 font-medium">
                    {appliedDiscount.code} ({appliedDiscount.percentage}% off)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveDiscount}
                    className="text-green-700 hover:text-green-800 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Applied Discount Summary */}
            {appliedDiscount && (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--secondary-text)' }}>
                    Discount ({appliedDiscount.code}):
                  </span>
                  <span className="text-green-600 font-medium">
                    -£{appliedDiscount.amount.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-green-500">✓ Discount applied!</p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div 
                className="pt-3"
                style={{ borderTop: `1px solid var(--borders)` }}
              >
                <div 
                  className="flex justify-between text-xl font-bold"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowCheckout(true)}
              className="w-full text-white py-3 text-lg font-bold transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--primary-accent)',
                boxShadow: '0 4px 10px var(--shadow)'
              }}
            >
              Proceed to Checkout
            </Button>

            <div 
              className="mt-4 text-center text-sm"
              style={{ color: 'var(--secondary-text)' }}
            >
              <p>Secure payment powered by demo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
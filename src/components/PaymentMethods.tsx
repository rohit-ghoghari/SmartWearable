import { useState } from 'react';
import { Shield } from 'lucide-react';

interface PaymentMethodsProps {
  className?: string;
}

export function PaymentMethods({ className = '' }: PaymentMethodsProps) {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  // High-fidelity payment method logos with authentic brand styling
  const paymentMethods = [
    {
      name: 'Visa',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-2">
          <svg viewBox="0 0 78 24" className="w-10 h-6">
            <path d="M31.5 20.3L28.3 4h-4.8l3.2 16.3h4.8zm23.6-10.5c-1.9-.9-3-1.6-3-2.5 0-.8.9-1.6 2.9-1.6 1.6 0 2.8.3 3.7.7l.7.3.6-3.8c-1-.4-2.5-.8-4.4-.8-4.9 0-8.3 2.6-8.3 6.3 0 2.7 2.4 4.2 4.3 5.1 1.9 1 2.6 1.6 2.6 2.5s-1 1.3-1.9 1.3c-1.6 0-2.5-.2-3.8-.8l-.5-.2-.6 3.8c1.2.5 3.4.9 5.7.9 5.2 0 8.6-2.6 8.6-6.6-.1-2.1-1.3-3.7-4.1-5zm13.9 10.5h4.2l-1.8-16.3h-3.9c-.9 0-1.6.5-1.9 1.3L58.2 20.3h5.2l1-2.9h6.4l.6 2.9zm-5.6-6.8l2.6-7.2.6 7.2h-3.2zm-26.7-9.5l-4.6 16.3h-5.2L21.3 7.1c-.3-1.2-.6-1.6-1.6-2.1C18.6 4.6 17 4.2 15.5 4l.1-.7h8.9c1.1 0 2.1.7 2.4 2l2.2 11.7L32.7 4h5.2l-7.7 16.3h.1z" fill="#1A1F71"/>
          </svg>
        </div>
      )
    },
    {
      name: 'Mastercard',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-2">
          <svg viewBox="0 0 48 29" className="w-10 h-6">
            <circle cx="15" cy="14.5" r="11" fill="#EB001B"/>
            <circle cx="33" cy="14.5" r="11" fill="#F79E1B"/>
            <path d="M24 6.5c2.4 2.4 3.9 5.7 3.9 9.5s-1.5 7.1-3.9 9.5c-2.4-2.4-3.9-5.7-3.9-9.5s1.5-7.1 3.9-9.5z" fill="#FF5F00"/>
          </svg>
        </div>
      )
    },
    {
      name: 'American Express',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-2">
          <svg viewBox="0 0 48 29" className="w-10 h-6">
            <rect width="48" height="29" fill="#006FCF" rx="3"/>
            <text x="24" y="12" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial, sans-serif">American</text>
            <text x="24" y="20" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial, sans-serif">Express</text>
          </svg>
        </div>
      )
    },
    {
      name: 'PayPal',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-2">
          <svg viewBox="0 0 48 29" className="w-10 h-6">
            <g transform="translate(6, 6)">
              <path d="M8.5 0h7.2c4.8 0 8.6 2.2 8.6 7.1 0 5.8-4.1 9.1-9.7 9.1H11l-1.2 6.2H6.2L8.5 0z" fill="#003087"/>
              <path d="M11.2 4.5h4.1c2.1 0 3.8.9 3.8 3.2 0 2.6-1.8 4.1-4.2 4.1h-3.2l1.5-7.3z" fill="#009CDE"/>
              <path d="M14.5 6.1h7.2c4.8 0 8.6 2.2 8.6 7.1 0 5.8-4.1 9.1-9.7 9.1H17l-1.2 6.2h-3.6l2.3-22.4z" fill="#012169"/>
              <path d="M17.2 10.6h4.1c2.1 0 3.8.9 3.8 3.2 0 2.6-1.8 4.1-4.2 4.1h-3.2l1.5-7.3z" fill="#003087"/>
            </g>
          </svg>
        </div>
      )
    },
    {
      name: 'Apple Pay',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-1">
          <svg viewBox="0 0 48 29" className="w-10 h-6">
            <g transform="translate(8, 7)">
              <path d="M8.5 0c-.4 0-1.6-.6-2.5-.6-1.4 0-2.5.8-3.2 2-1.4 2.3-.3 5.8.9 7.8.6.9 1.4 1.9 2.4 1.9.9 0 1.4-.6 2.5-.6s1.5.6 2.5.6c1 0 1.7-.9 2.4-1.8.8-1.1 1-2 1-2 0 0-2-.8-2-3.1-.1-1.8 1.6-2.8 1.6-2.8-.8-1.2-2.2-1.4-2.6-1.4-1.1-.1-2.3.7-2.6 0z" fill="#000000"/>
              <path d="M6.8-2.5c.5-.6.8-1.4.7-2.2-.7.1-1.5.5-1.9.9-.5.6-.8 1.3-.8 2.1.8 0 1.6-.3 2-.8z" fill="#000000"/>
              <text x="16" y="11" fill="#000000" fontSize="8" fontWeight="500" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">Pay</text>
            </g>
          </svg>
        </div>
      )
    },
    {
      name: 'Google Pay',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-1">
          <svg viewBox="0 0 48 29" className="w-10 h-6">
            <g transform="translate(6, 8)">
              <path d="M18.3 6.1c0-.4-.1-.8-.1-1.2H9.3v2.3h5.1c-.2.7-.6 1.4-1.2 1.8v1.5h1.9c1.1-1 1.8-2.5 1.8-4.4z" fill="#4285F4"/>
              <path d="M9.3 12.5c1.6 0 3-.5 4-1.4l-1.9-1.5c-.5.4-1.2.6-2 .6-1.5 0-2.9-1-3.4-2.5H3.9v1.5c1 2 3.1 3.3 5.4 3.3z" fill="#34A853"/>
              <path d="M5.9 7.7c-.1-.4-.2-.7-.2-1.1s.1-.8.2-1.1V4H3.9c-.4.8-.6 1.7-.6 2.6s.2 1.8.6 2.6l2-.5z" fill="#FBBC05"/>
              <path d="M9.3 2.9c.9 0 1.7.3 2.3.9l1.7-1.7C12.3.7 10.9 0 9.3 0 7 0 4.9 1.3 3.9 3.2l2 1.5c.5-1.5 1.9-2.5 3.4-2.5z" fill="#EA4335"/>
              <text x="20" y="9" fill="#5F6368" fontSize="6" fontWeight="500" fontFamily="Product Sans, Roboto, sans-serif">Pay</text>
            </g>
          </svg>
        </div>
      )
    },
    {
      name: 'Shop Pay',
      icon: (
        <div className="w-14 h-9 bg-white border border-gray-200 rounded-md flex items-center justify-center p-2">
          <svg viewBox="0 0 48 29" className="w-10 h-6">
            <rect width="48" height="29" fill="#5A31F4" rx="3"/>
            <text x="24" y="12" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">Shop</text>
            <text x="24" y="21" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Inter, sans-serif">Pay</text>
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* High-Fidelity Payment Methods Section */}
      <div className="flex flex-col items-center space-y-4">
        {/* Payment Icons Row - Premium, uniform containers */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="relative"
              onMouseEnter={() => setHoveredMethod(method.name)}
              onMouseLeave={() => setHoveredMethod(null)}
            >
              {/* Premium tooltip */}
              {hoveredMethod === method.name && (
                <div 
                  className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10 shadow-lg"
                  style={{ 
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    animation: 'fadeInUp 0.2s ease-out'
                  }}
                >
                  {method.name}
                  {/* Elegant tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
              
              {/* High-fidelity payment method container */}
              <div className="relative cursor-pointer group">
                <div className="relative transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-md">
                  {method.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* SSL Security Notice - Professional styling */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-3">
          <Shield size={14} className="text-gray-400" />
          <span 
            style={{ 
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            256-bit SSL encryption • Your payment information is protected
          </span>
        </div>
      </div>
    </div>
  );
}
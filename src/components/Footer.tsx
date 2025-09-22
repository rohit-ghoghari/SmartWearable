import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing! (This is a demo)");
    setEmail("");
  };

  return (
    <footer 
      className="text-black"
      style={{ 
        backgroundColor: 'white',
        borderTop: `1px solid var(--borders)`
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Smart Wearable
            </h3>
            <p 
              className="mb-4"
              style={{ 
                color: 'var(--secondary-text)',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Leading the future of wearable technology with
              innovative devices that enhance your daily life.
            </p>
            <div className="flex space-x-4">
              <Instagram 
                className="w-6 h-6 cursor-pointer transition-colors hover:opacity-80"
                style={{ color: 'var(--secondary-text)' }}
              />
              <Twitter 
                className="w-6 h-6 cursor-pointer transition-colors hover:opacity-80"
                style={{ color: 'var(--secondary-text)' }}
              />
              <Linkedin 
                className="w-6 h-6 cursor-pointer transition-colors hover:opacity-80"
                style={{ color: 'var(--secondary-text)' }}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-bold mb-4"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Quick Links
            </h4>
            <ul 
              className="space-y-2"
              style={{ 
                color: 'var(--secondary-text)',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  Warranty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-lg font-bold mb-4"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Contact Us
            </h4>
            <div 
              className="space-y-3"
              style={{ 
                color: 'var(--secondary-text)',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>hello@smartwearable.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>123 Tech Street, Innovation City</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 
              className="text-lg font-bold mb-4"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Newsletter
            </h4>
            <p 
              className="mb-4"
              style={{ 
                color: 'var(--secondary-text)',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Stay updated with our latest products and offers.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
                style={{
                  border: `1px solid var(--borders)`,
                  color: 'var(--primary-text)'
                }}
              />
              <Button
                type="submit"
                className="w-full text-white font-bold"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div 
          className="mt-8 pt-8"
          style={{ borderTop: `1px solid var(--borders)` }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p 
              className="text-sm text-center md:text-left mb-4 md:mb-0"
              style={{ 
                color: 'var(--secondary-text)',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              © 2024 Smart Wearable. All rights reserved.
            </p>
            <div 
              className="flex items-center space-x-6 text-sm"
              style={{ 
                color: 'var(--secondary-text)',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              <a
                href="#"
                className="hover:opacity-80 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
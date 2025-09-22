import { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from "sonner@2.0.3";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    toast.success('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl text-black mb-6"
            style={{ 
              fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}
          >
            Contact Us
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Have a question about our smart wearables? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 
                className="text-2xl text-black mb-6"
                style={{ 
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 500
                }}
              >
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#E1F5FA' }}
                  >
                    <MapPin size={20} style={{ color: '#0A73BE' }} />
                  </div>
                  <div>
                    <h3 
                      className="font-medium text-black mb-1"
                      style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Address
                    </h3>
                    <p 
                      className="text-gray-600"
                      style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      123 Innovation Drive<br />
                      Tech District, TD 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#E1F5FA' }}
                  >
                    <Phone size={20} style={{ color: '#0A73BE' }} />
                  </div>
                  <div>
                    <h3 
                      className="font-medium text-black mb-1"
                      style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Phone
                    </h3>
                    <p 
                      className="text-gray-600"
                      style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#E1F5FA' }}
                  >
                    <Mail size={20} style={{ color: '#0A73BE' }} />
                  </div>
                  <div>
                    <h3 
                      className="font-medium text-black mb-1"
                      style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      Email
                    </h3>
                    <p 
                      className="text-gray-600"
                      style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      hello@smartwearable.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-black mb-2"
                    style={{ 
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    style={{ 
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      backgroundColor: 'white'
                    }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-black mb-2"
                    style={{ 
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    style={{ 
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      backgroundColor: 'white'
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-black mb-2"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500
                  }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  style={{ 
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    backgroundColor: 'white'
                  }}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-black mb-2"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-vertical"
                  style={{ 
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    backgroundColor: 'white'
                  }}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center space-x-2 px-8 py-3 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#0A73BE',
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)'
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
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 
              className="text-2xl text-black mb-4"
              style={{ 
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              We Value Your Feedback
            </h3>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Your thoughts help us improve our products and services. 
              Whether it's a suggestion, compliment, or concern, we'd love to hear from you.
            </p>
          </div>

          {/* Feedback Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="feedback-name" 
                    className="block text-black mb-2"
                    style={{ 
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="feedback-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    style={{ 
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      backgroundColor: 'white'
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="feedback-email" 
                    className="block text-black mb-2"
                    style={{ 
                      fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="feedback-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    style={{ 
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      backgroundColor: 'white'
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="feedback-subject" 
                  className="block text-black mb-2"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500
                  }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="feedback-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  style={{ 
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    backgroundColor: 'white'
                  }}
                  placeholder="What's your feedback about?"
                />
              </div>

              <div>
                <label 
                  htmlFor="feedback-message" 
                  className="block text-black mb-2"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 500
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="feedback-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-vertical"
                  style={{ 
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    backgroundColor: 'white'
                  }}
                  placeholder="Share your feedback with us..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#0A73BE',
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)'
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
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
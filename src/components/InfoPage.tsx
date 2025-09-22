import { ImageWithFallback } from './figma/ImageWithFallback';
import { Smartphone, Watch, Zap, Shield, Headphones, Award } from 'lucide-react';

export function InfoPage() {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />,
      title: "Smart Integration",
      description: "Seamlessly connect with your smartphone and other devices for a unified experience."
    },
    {
      icon: <Watch className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />,
      title: "24/7 Monitoring",
      description: "Continuous health and activity tracking to keep you informed about your wellbeing."
    },
    {
      icon: <Zap className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />,
      title: "Long Battery Life",
      description: "Extended battery life ensures your devices work when you need them most."
    },
    {
      icon: <Shield className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security measures."
    },
    {
      icon: <Headphones className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you."
    },
    {
      icon: <Award className="w-8 h-8" style={{ color: 'var(--primary-accent)' }} />,
      title: "Award Winning",
      description: "Recognized by industry leaders for innovation and design excellence."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 
          className="text-4xl font-bold mb-6"
          style={{ 
            color: 'var(--primary-text)',
            fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          About Smart Wearable
        </h1>
        <p 
          className="text-xl max-w-3xl mx-auto leading-relaxed"
          style={{ 
            color: 'var(--primary-text)',
            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          We're pioneering the future of wearable technology, creating devices that seamlessly integrate 
          into your life while providing unprecedented functionality and style.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ color: 'var(--primary-text)' }}
          >
            Our Mission
          </h2>
          <p 
            className="mb-6 leading-relaxed"
            style={{ color: 'var(--primary-text)' }}
          >
            At Smart Wearable, we believe technology should enhance human potential, not complicate it. 
            Our mission is to create intuitive, powerful wearable devices that help people live healthier, 
            more connected, and more productive lives.
          </p>
          <p 
            className="leading-relaxed"
            style={{ color: 'var(--primary-text)' }}
          >
            Since our founding, we've been committed to pushing the boundaries of what's possible in 
            wearable technology, combining cutting-edge innovation with thoughtful design to create 
            products that truly make a difference.
          </p>
        </div>
        <div 
          className="aspect-square overflow-hidden rounded-lg"
          style={{ boxShadow: '0 4px 10px var(--shadow)' }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1707167144717-683f1714939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjB0ZWNobm9sb2d5JTIwd2VhcmFibGV8ZW58MXx8fHwxNzU3MzI3MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Advanced wearable technology"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: 'var(--primary-text)' }}
        >
          Why Choose Smart Wearable?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
              style={{
                border: `1px solid var(--borders)`,
                boxShadow: '0 2px 8px var(--shadow)'
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: 'var(--primary-text)' }}
              >
                {feature.title}
              </h3>
              <p 
                className="leading-relaxed"
                style={{ color: 'var(--primary-text)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation Section */}
      <div 
        className="rounded-xl p-10 mb-16"
        style={{ 
          backgroundColor: 'var(--secondary-accent)',
          border: `1px solid var(--borders)`
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--primary-text)' }}
            >
              Innovation at Our Core
            </h2>
            <p 
              className="mb-6 leading-relaxed"
              style={{ color: 'var(--primary-text)' }}
            >
              Our research and development team works tirelessly to bring you the latest advances in 
              wearable technology. From advanced sensors to AI-powered insights, we're constantly 
              pushing the envelope.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  50+
                </h3>
                <p style={{ color: 'var(--secondary-text)' }}>Patents Filed</p>
              </div>
              <div>
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  1M+
                </h3>
                <p style={{ color: 'var(--secondary-text)' }}>Happy Customers</p>
              </div>
              <div>
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  99%
                </h3>
                <p style={{ color: 'var(--secondary-text)' }}>Satisfaction Rate</p>
              </div>
              <div>
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  24/7
                </h3>
                <p style={{ color: 'var(--secondary-text)' }}>Customer Support</p>
              </div>
            </div>
          </div>
          <div 
            className="aspect-square overflow-hidden rounded-lg"
            style={{ boxShadow: '0 4px 10px var(--shadow)' }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzMyNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Innovation in wearable technology"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="text-center mb-16">
        <h2 
          className="text-3xl font-bold mb-6"
          style={{ 
            color: 'var(--primary-text)',
            fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          Committed to Sustainability
        </h2>
        <p 
          className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
          style={{ 
            color: 'var(--primary-text)',
            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          We believe in creating technology that's not only innovative but also responsible. 
          Our commitment to sustainability drives us to use eco-friendly materials and processes 
          throughout our supply chain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--secondary-accent)' }}
            >
              <span className="text-2xl">♻️</span>
            </div>
            <h3 
              className="text-lg font-bold mb-2"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Recycled Materials
            </h3>
            <p style={{ 
              color: 'var(--primary-text)',
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Using recycled materials in our packaging and products
            </p>
          </div>
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--secondary-accent)' }}
            >
              <span className="text-2xl">🌱</span>
            </div>
            <h3 
              className="text-lg font-bold mb-2"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Carbon Neutral
            </h3>
            <p style={{ 
              color: 'var(--primary-text)',
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Offsetting our carbon footprint through verified programs
            </p>
          </div>
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--secondary-accent)' }}
            >
              <span className="text-2xl">🔋</span>
            </div>
            <h3 
              className="text-lg font-bold mb-2"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Energy Efficient
            </h3>
            <p style={{ 
              color: 'var(--primary-text)',
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Designing products for maximum energy efficiency
            </p>
          </div>
        </div>
      </div>

      {/* Cybercy Group Section */}
      <div 
        className="py-16 px-8 rounded-xl text-center"
        style={{ 
          backgroundColor: '#f8fafb',
          border: '1px solid #E1F5FA'
        }}
      >
        <h2 
          className="text-3xl font-bold mb-12"
          style={{ 
            color: 'var(--primary-text)',
            fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          A Cybercy Group Company
        </h2>
        
        <div className="flex justify-center items-center space-x-12 mb-8">
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1737804719022-f70a238a65ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcmN5JTIwZ3JvdXAlMjBjb21wYW55JTIwbG9nb3xlbnwxfHx8fDE3NTc0OTk1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cybercy Group UK Logo"
              className="h-16 w-auto mx-auto mb-2"
            />
            <p 
              className="text-sm"
              style={{ 
                color: '#666666',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Cybercy Group UK
            </p>
          </div>
          
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1587124367855-97579a3eec12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29tcGFueSUyMGxvZ28lMjBjeWJlcnNlY3VyaXR5fGVufDF8fHx8MTc1NzQ5OTU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cybercy Group Gulf Logo"
              className="h-16 w-auto mx-auto mb-2"
            />
            <p 
              className="text-sm"
              style={{ 
                color: '#666666',
                fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              Cybercy Group Gulf
            </p>
          </div>
        </div>
        
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ 
            color: 'var(--primary-text)',
            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          Smart Wearable is engineered with the security and data protection expertise of Cybercy Group.
        </p>
      </div>
    </div>
  );
}
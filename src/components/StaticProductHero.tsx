import { ImageWithFallback } from './figma/ImageWithFallback';

interface StaticProductHeroProps {
  onLearnMore: () => void;
  onViewPricing: () => void;
}

export function StaticProductHero({ onLearnMore, onViewPricing }: StaticProductHeroProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
      {/* Text Content - Above Image */}
      <div className="text-center max-w-4xl mb-16">
        {/* Main Headline */}
        <h1 
          className="mb-6 text-primary-text"
          style={{ 
            fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '3.5rem',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}
        >
          Smart Glasses Pro
        </h1>

        {/* Sub-headline */}
        <h2 
          className="mb-8 text-secondary-text"
          style={{ 
            fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '1.5rem',
            fontWeight: 400,
            lineHeight: 1.3
          }}
        >
          The future of augmented reality
        </h2>

        {/* Body Text */}
        <p 
          className="mb-12 text-secondary-text leading-relaxed max-w-2xl mx-auto"
          style={{ 
            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '1.125rem',
            lineHeight: 1.6
          }}
        >
          Experience seamless integration of digital and physical worlds with our revolutionary Smart Glasses Pro. 
          Featuring advanced AR display technology, intuitive voice commands, and all-day battery life, 
          these glasses redefine how you interact with information and stay connected.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={onLearnMore}
            className="px-8 py-4 border border-gray-300 rounded-lg text-gray-700 transition-all duration-300 hover:border-gray-400 bg-white"
            style={{ 
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '1rem',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E1F5FA';
              e.currentTarget.style.borderColor = '#0A73BE';
              e.currentTarget.style.color = '#0A73BE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#374151';
            }}
          >
            Learn More
          </button>

          <button
            onClick={onViewPricing}
            className="px-8 py-4 border border-gray-300 rounded-lg text-gray-700 transition-all duration-300 hover:border-gray-400 bg-white"
            style={{ 
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '1rem',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E1F5FA';
              e.currentTarget.style.borderColor = '#0A73BE';
              e.currentTarget.style.color = '#0A73BE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#374151';
            }}
          >
            View Pricing
          </button>
        </div>
      </div>

      {/* Product Image - Large and Centered */}
      <div className="relative max-w-4xl w-full">
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1619089662078-7fda3fdec77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU3NTA4MDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Smart Glasses Pro"
            className="w-full h-auto object-contain"
          />
          
          {/* Subtle glow effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle at center, transparent 60%, rgba(10, 115, 190, 0.1) 100%)',
            }}
          />
        </div>

        {/* Floating feature highlights */}
        <div className="absolute top-1/4 left-8 opacity-60">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-4 py-2 shadow-sm">
            <p 
              className="text-sm text-gray-600"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              12h Battery Life
            </p>
          </div>
        </div>

        <div className="absolute top-1/3 right-8 opacity-60">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-4 py-2 shadow-sm">
            <p 
              className="text-sm text-gray-600"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              HD AR Display
            </p>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 opacity-60">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg px-4 py-2 shadow-sm">
            <p 
              className="text-sm text-gray-600"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Voice Commands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
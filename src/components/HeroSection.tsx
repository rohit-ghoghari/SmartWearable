import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onLearnMore: () => void;
  onExploreCollection?: () => void;
}

export function HeroSection({ onLearnMore, onExploreCollection }: HeroSectionProps) {
  return (
    <section className="bg-white py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight text-black"
              style={{ 
                fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500
              }}
            >
              Wear the future.
              <br />
              It's <span style={{ color: '#0A73BE' }}>SmartWearable</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Experience innovation that seamlessly integrates into your daily life. Our cutting-edge wearables combine sophisticated design with powerful technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={onExploreCollection || (() => {})}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-white font-medium hover-button hover:bg-[#085a9a] hover:shadow-[0_8px_20px_rgba(10,115,190,0.3)] w-full sm:w-auto"
                style={{ 
                  backgroundColor: '#0A73BE',
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)'
                }}
              >
                Explore Collection
              </button>

              <button
                onClick={onLearnMore}
                className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-[#E1F5FA] hover:border-[#0A73BE] hover:text-[#0A73BE] hover-button w-full sm:w-auto"
                style={{ 
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  backgroundColor: 'white'
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-first lg:order-last">
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-gray-50 max-w-md mx-auto lg:max-w-none hover-lift">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707167144717-683f1714939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjB0ZWNobm9sb2d5JTIwd2VhcmFibGV8ZW58MXx8fHwxNzU3MzI3MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Smart Wearable Technology"
                className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
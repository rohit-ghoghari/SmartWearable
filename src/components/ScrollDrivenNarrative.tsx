import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NarrativeSection {
  id: string;
  title: string;
  description: string;
  image: string;
  zoomLevel: number;
  focusArea: string;
}

const narrativeSections: NarrativeSection[] = [
  {
    id: 'connectivity',
    title: 'Effortless Connectivity',
    description: 'Stay seamlessly connected with advanced Bluetooth 5.0 technology. Stream music, take calls, and receive notifications without ever reaching for your phone.',
    image: 'https://images.unsplash.com/photo-1656579901550-06e15c164e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjBibGFjayUyMHRlY2hub2xvZ3klMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3NTA3NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    zoomLevel: 1.2,
    focusArea: 'temple'
  },
  {
    id: 'biometrics',
    title: 'Advanced Biometrics',
    description: 'Monitor your health in real-time with precision sensors that track heart rate, stress levels, and activity patterns. Your wellness data, intelligently analyzed.',
    image: 'https://images.unsplash.com/photo-1683270505099-93a7b445fcb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBjbGVhbiUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3NTA3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    zoomLevel: 1.4,
    focusArea: 'sensor'
  },
  {
    id: 'power',
    title: 'All-Day Power',
    description: 'Revolutionary battery technology delivers up to 12 hours of continuous use. Fast charging capabilities ensure you\'re never disconnected from what matters most.',
    image: 'https://images.unsplash.com/photo-1592006016974-e94636fdfe83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjB0ZWNobm9sb2d5JTIwd2VhcmFibGUlMjBkZXZpY2V8ZW58MXx8fHwxNzU3NTA3NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    zoomLevel: 1.6,
    focusArea: 'charging'
  },
  {
    id: 'display',
    title: 'Immersive Display',
    description: 'Experience the future with our crystal-clear AR overlay technology. Information appears naturally in your field of view, enhancing reality without overwhelming it.',
    image: 'https://images.unsplash.com/photo-1656579901550-06e15c164e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjBibGFjayUyMHRlY2hub2xvZ3klMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3NTA3NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    zoomLevel: 1.8,
    focusArea: 'lens'
  }
];

export function ScrollDrivenNarrative() {
  const [currentSection, setCurrentSection] = useState(0);
  const [maxZoomReached, setMaxZoomReached] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate which section is currently in view
      const progress = Math.max(0, Math.min(1, (scrollY - containerTop + windowHeight / 2) / containerHeight));
      const sectionIndex = Math.floor(progress * narrativeSections.length);
      const boundedIndex = Math.max(0, Math.min(narrativeSections.length - 1, sectionIndex));

      setCurrentSection(boundedIndex);
      
      // Update max zoom reached (never decreases)
      if (boundedIndex > maxZoomReached) {
        setMaxZoomReached(boundedIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxZoomReached]);

  const currentZoomLevel = narrativeSections[maxZoomReached]?.zoomLevel || 1;

  return (
    <div ref={containerRef} className="relative">
      {/* Spacer to create scroll distance */}
      <div style={{ height: `${narrativeSections.length * 100}vh` }}>
        {/* Sticky image container */}
        <div className="sticky top-0 h-screen w-full flex">
          {/* Left side - Text content */}
          <div className="w-1/2 flex items-center justify-center p-16">
            <div className="max-w-lg">
              <div 
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                <h2 
                  className="mb-6 text-primary-text"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: '2.5rem',
                    fontWeight: 500,
                    lineHeight: 1.2
                  }}
                >
                  {narrativeSections[currentSection]?.title}
                </h2>
                <p 
                  className="text-secondary-text leading-relaxed"
                  style={{ 
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: '1.125rem',
                    lineHeight: 1.7
                  }}
                >
                  {narrativeSections[currentSection]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Product image */}
          <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
            <div 
              ref={imageRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
            >
              <div
                className="transition-all duration-1000 ease-out"
                style={{
                  transform: `scale(${currentZoomLevel})`,
                  transformOrigin: 'center center'
                }}
              >
                <ImageWithFallback
                  src={narrativeSections[maxZoomReached]?.image || narrativeSections[0].image}
                  alt="Smart Glasses"
                  className="w-full h-auto max-w-2xl object-contain"
                />
              </div>

              {/* Subtle overlay effect */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, transparent 40%, rgba(10, 115, 190, 0.05) 100%)`,
                  opacity: currentZoomLevel > 1 ? 0.6 : 0
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col space-y-3">
          {narrativeSections.map((_, index) => (
            <div
              key={index}
              className="w-2 h-8 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index <= currentSection ? '#0A73BE' : '#E0E0E0',
                opacity: index <= maxZoomReached ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Section indicators for text transitions */}
      {narrativeSections.map((section, index) => (
        <div
          key={section.id}
          className="absolute left-16 pointer-events-none"
          style={{
            top: `${(index + 0.5) * 100}vh`,
            transform: 'translateY(-50%)'
          }}
        >
          <div
            className="transition-all duration-500 ease-out"
            style={{
              opacity: currentSection === index ? 1 : 0,
              transform: `translateX(${currentSection === index ? '0' : '-20px'})`
            }}
          >
            <div 
              className="w-1 h-16 rounded-full"
              style={{ backgroundColor: '#0A73BE' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
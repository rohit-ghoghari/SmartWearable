import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface AppleEsqueHeroProps {
  onLearnMore: () => void;
}

export function AppleEsqueHero({ onLearnMore }: AppleEsqueHeroProps) {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    {
      id: 'smart-glasses',
      title: 'See the world differently.',
      subtitle: 'Smart Glasses Pro redefines your reality with seamless AR integration.',
      image: 'https://images.unsplash.com/photo-1707167144717-683f1714939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdsYXNzZXMlMjB0ZWNobm9sb2d5JTIwd2VhcmFibGV8ZW58MXx8fHwxNzU3MzI3MzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Discover Smart Glasses'
    },
    {
      id: 'fitness-tracker',
      title: 'Every step tells a story.',
      subtitle: 'Fitness Tracker Elite captures the narrative of your wellness journey.',
      image: 'https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhY2tlciUyMHdlYXJhYmxlfGVufDF8fHx8MTc1NzMyNzM3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Explore Fitness Tracker'
    },
    {
      id: 'smartwatch',
      title: 'Power and elegance, intertwined.',
      subtitle: 'SmartWatch Ultra brings sophistication to your everyday moments.',
      image: 'https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzMyNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      cta: 'Experience SmartWatch'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.floor(scrollY / windowHeight);
      setCurrentSection(Math.min(newSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = currentSection + 1;
    if (nextSection < sections.length) {
      window.scrollTo({
        top: nextSection * window.innerHeight,
        behavior: 'smooth'
      });
    } else {
      onLearnMore();
    }
  };

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="h-screen flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--secondary-accent) 0%, white 100%)`
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, var(--secondary-accent) 0%, rgba(255,255,255,0.9) 100%)`
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl px-6">
            <h1 
              className="text-5xl md:text-7xl font-light mb-6 leading-tight"
              style={{ 
                color: 'var(--primary-text)',
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 300
              }}
            >
              {section.title}
            </h1>
            <p 
              className="text-xl md:text-2xl mb-12 leading-relaxed"
              style={{ color: 'var(--secondary-text)' }}
            >
              {section.subtitle}
            </p>
            <button
              onClick={onLearnMore}
              className="px-8 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-accent)',
                boxShadow: '0 4px 20px var(--shadow)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-accent)';
              }}
            >
              {section.cta}
            </button>
          </div>

          {/* Scroll Indicator */}
          {index === currentSection && index < sections.length - 1 && (
            <button
              onClick={scrollToNext}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
              style={{ color: 'var(--primary-accent)' }}
            >
              <ChevronDown size={32} />
            </button>
          )}

          {/* Section Indicators */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-3">
            {sections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  window.scrollTo({
                    top: idx * window.innerHeight,
                    behavior: 'smooth'
                  });
                }}
                className={`w-2 h-8 rounded-full transition-all duration-300 ${
                  idx === currentSection ? 'opacity-100' : 'opacity-40'
                }`}
                style={{
                  backgroundColor: idx === currentSection 
                    ? 'var(--primary-accent)' 
                    : 'var(--secondary-text)'
                }}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
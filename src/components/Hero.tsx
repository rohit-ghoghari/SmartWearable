import { useApp } from '../App';

export function Hero() {
  const { setCurrentPage } = useApp();

  return (
    <section className="bg-white py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 z-10 relative">
            <h1 
              className="text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: 'var(--primary-text)' }}
            >
              Innovation & Future Tech
            </h1>
            <p 
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: 'var(--primary-text)' }}
            >
              Discover cutting-edge wearable technology that enhances your lifestyle. 
              From fitness tracking to augmented reality, we bring you the future today.
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-8 py-4 rounded-lg text-white font-bold transition-all hover:opacity-90 transform hover:scale-105"
              style={{ 
                backgroundColor: 'var(--primary-accent)',
                boxShadow: '0 4px 10px var(--shadow)'
              }}
            >
              Discover More
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            {/* Large organic-shaped background element */}
            <div 
              className="absolute -inset-8 rounded-full opacity-30 blur-3xl"
              style={{ 
                backgroundColor: 'var(--secondary-accent)',
                width: '120%',
                height: '120%',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
              }}
            ></div>
            
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 4px 10px var(--shadow)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1627923314235-6f648fe012e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3ZWFyaW5nJTIwc21hcnR3YXRjaHxlbnwxfHx8fDE3NTczMzM1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Person using futuristic wearable device"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function InThePress() {
  const pressLogos = [
    {
      name: 'TechCrunch',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoY3J1bmNoJTIwbG9nb3xlbnwxfHx8fDE3NTczMjczNzB8MA&ixlib=rb-4.1.0&q=80&w=400',
      hoverColor: '#00D084'
    },
    {
      name: 'The Verge',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJnZSUyMGxvZ29zfGVufDF8fHx8MTc1NzMyNzM3MHww&ixlib=rb-4.1.0&q=80&w=400',
      hoverColor: '#FF6B35'
    },
    {
      name: 'Wired',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZCUyMG1hZ2F6aW5lfGVufDF8fHx8MTc1NzMyNzM3MHww&ixlib=rb-4.1.0&q=80&w=400',
      hoverColor: '#000000'
    },
    {
      name: 'Fast Company',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwY29tcGFueXxlbnwxfHx8fDE3NTczMjczNzB8MA&ixlib=rb-4.1.0&q=80&w=400',
      hoverColor: '#E60028'
    },
    {
      name: 'Forbes',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JiZXMlMjBsb2dvfGVufDF8fHx8MTc1NzMyNzM3MHww&ixlib=rb-4.1.0&q=80&w=400',
      hoverColor: '#0066CC'
    }
  ];

  return (
    <section 
      className="py-16"
      style={{ backgroundColor: 'var(--secondary-accent)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 
            className="text-3xl font-light mb-4"
            style={{ 
              color: 'var(--primary-text)',
              fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 300
            }}
          >
            In the Press
          </h2>
          <p 
            className="text-lg"
            style={{ 
              color: 'var(--secondary-text)',
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            Leading publications are talking about our innovation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {pressLogos.map((press, index) => (
            <div
              key={press.name}
              className="flex items-center justify-center p-6 transition-all duration-500 hover:scale-110 cursor-pointer group"
            >
              <div 
                className="w-full h-12 bg-gray-400 rounded flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-0 relative overflow-hidden"
                style={{
                  filter: 'grayscale(100%)',
                  backgroundImage: `url(${press.logo})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <span 
                  className="font-bold text-white text-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                  style={{
                    textShadow: '0 0 10px rgba(0,0,0,0.8)'
                  }}
                >
                  {press.name}
                </span>
                
                {/* Colored overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backgroundColor: press.hoverColor }}
                >
                  <span className="font-bold text-white text-sm">
                    {press.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p 
            className="text-sm"
            style={{ 
              color: 'var(--secondary-text)',
              fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            "Revolutionary wearable technology that's changing how we interact with the digital world."
          </p>
        </div>
      </div>
    </section>
  );
}
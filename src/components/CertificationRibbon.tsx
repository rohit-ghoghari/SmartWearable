import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";

interface Badge {
  id: string;
  name: string;
  image: string;
  description: string;
}

const certificationBadges: Badge[] = [
  {
    id: "iso27001",
    name: "ISO 27001",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc28lMjBjZXJ0aWZpY2F0aW9uJTIwYmFkZ2V8ZW58MXx8fHwxNzU3NTEyNDg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Information Security Management",
  },
  {
    id: "gdpr",
    name: "GDPR Compliant",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZHByJTIwY29tcGxpYW5jZSUyMGJhZGdlfGVufDF8fHx8MTc1NzUxMjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Data Protection Regulation",
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2MlMjAyJTIwc2VjdXJpdHklMjBiYWRnZXxlbnwxfHx8fDE3NTc1MTI0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Security & Availability",
  },
  {
    id: "hipaa",
    name: "HIPAA Compliant",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXBhYSUyMGNvbXBsaWFuY2UlMjBtZWRpY2FsfGVufDF8fHx8MTc1NzUxMjQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Healthcare Data Protection",
  },
  {
    id: "fda",
    name: "FDA Registered",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZGElMjByZWdpc3RyYXRpb24lMjBtZWRpY2FsfGVufDF8fHx8MTc1NzUxMjQ5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Medical Device Standards",
  },
  {
    id: "ce",
    name: "CE Marking",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZSUyMG1hcmtpbmclMjBldXJvcGVhbnxlbnwxfHx8fDE3NTc1MTI0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "European Conformity",
  },
  {
    id: "fcc",
    name: "FCC Certified",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmY2MlMjBjZXJ0aWZpY2F0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTc1MTI1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Federal Communications Commission",
  },
  {
    id: "energy-star",
    name: "Energy Star",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBzdGFyJTIwZWZmaWNpZW5jeXxlbnwxfHx8fDE3NTc1MTI1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Energy Efficiency Standards",
  },
];

export function CertificationRibbon() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const animationRef = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by triplicating badges for smooth scrolling
  const duplicatedBadges = [
    ...certificationBadges,
    ...certificationBadges,
    ...certificationBadges,
  ];

  // Smooth auto-scroll animation
  useEffect(() => {
    if (isHovered || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      const currentX = x.get();
      const badgeWidth = 224; // 192px width + 32px gap (w-48 + gap-8)
      const totalWidth = certificationBadges.length * badgeWidth;

      // Reset position for infinite loop
      if (Math.abs(currentX) >= totalWidth) {
        x.set(0);
      } else {
        // Smooth auto-scroll from right to left
        x.set(currentX - 0.8);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging, x]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;

    const startX = x.get();

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartX.current;
      // Natural drag direction: drag right reveals content from right
      x.set(startX - deltaX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartX.current = touch.clientX;

    const startX = x.get();

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartX.current;
      // Natural drag direction: swipe right reveals content from right
      x.set(startX - deltaX);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle background gradient that animates on scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "500px" }}
      />
      
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0A73BE 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #3CAEE1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "500px" }}
      />
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "500px" }}
          className="text-center mb-16"
        >
          <motion.h2
            className="heading-font mb-6 text-4xl"
            style={{ color: "#333333" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "500px" }}
          >
            Trusted & Certified
          </motion.h2>
          <motion.p
            className="font-open-sans text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#7F8C8D" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true, margin: "500px" }}
          >
            Our commitment to security, privacy, and quality is
            validated by leading industry certifications and
            regulatory compliance.
          </motion.p>
        </motion.div>

        {/* Scrolling Badge Ribbon with enhanced container */}
        <motion.div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true, margin: "500px" }}
        >
          <div className="overflow-hidden py-8">
            <motion.div
              className="flex gap-8 items-center cursor-grab active:cursor-grabbing select-none"
              style={{ x }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {duplicatedBadges.map((badge, index) => (
                <motion.div
                  key={`${badge.id}-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center group"
                  style={{
                    boxShadow: "4px 6px 20px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "8px 12px 32px rgba(10, 115, 190, 0.16)",
                    borderColor: "#E1F5FA",
                  }}
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: (index % certificationBadges.length) * 0.1,
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                      draggable={false}
                    />
                  </div>
                  <h3
                    className="font-open-sans text-sm font-semibold text-center mb-1"
                    style={{ color: "#333333" }}
                  >
                    {badge.name}
                  </h3>
                  <p
                    className="font-open-sans text-xs text-center leading-tight"
                    style={{ color: "#7F8C8D" }}
                  >
                    {badge.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Fade Effects */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Interaction Hint with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          viewport={{ once: true, margin: "500px" }}
          className="text-center mt-12"
        >
          <p
            className="font-open-sans text-sm"
            style={{ color: "#7F8C8D" }}
          >
            Hover to pause • Drag to explore • All certifications current and verified
          </p>
        </motion.div>
      </div>
      </div>
      
      {/* Bottom fade effect for seamless transition */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        viewport={{ once: true, margin: "500px" }}
      />
    </section>
  );
}
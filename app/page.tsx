'use client';

import Link from 'next/link';
import { 
  HoverSlider, 
  HoverSliderImage, 
  HoverSliderImageWrap, 
  TextStaggerHover, 
  useHoverSliderContext 
} from '@/components/ui/animated-slideshow';

const SLIDES = [
  {
    id: "upvc",
    title: "uPVC Windows & Doors",
    description: "German-engineered multi-chamber insulation profiles optimized for mountain storm wind loads and climate weatherproofing.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    link: "/products/upvc",
  },
  {
    id: "invisible-grills",
    title: "Invisible Grills",
    description: "High-tensile SS 316 marine-grade cable safety systems that secure windows and balconies invisibly without compromising views.",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop",
    link: "/products/invisible-grills",
  },
  {
    id: "pleated-nets",
    title: "Pleated Mosquito Nets",
    description: "Architectural pleated screens that slide smoothly along guide tracks and fold away into slim profiles when not in use.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    link: "/products/pleated-nets",
  },
  {
    id: "ceiling-hangers",
    title: "Ceiling Cloth Hangers",
    description: "Double-rod ceiling pulley elevators designed to dry clothes out of sight and maximize balcony usable floor space.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    link: "/products/ceiling-hangers",
  },
];

function ActiveProductDetails() {
  const { activeSlide } = useHoverSliderContext();
  const currentSlide = SLIDES[activeSlide] || SLIDES[0];

  return (
    <div style={{ marginTop: '2.5rem', minHeight: '120px', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.4s ease-out' }} key={activeSlide}>
      <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#aaa', maxWidth: '450px' }}>
        {currentSlide.description}
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href={currentSlide.link} className="btn btn-primary" style={{ padding: '0.8rem 1.6rem', fontSize: '0.8rem' }}>
          Explore Engineering
        </Link>
        <Link href="/contact" className="btn btn-secondary" style={{ padding: '0.8rem 1.6rem', fontSize: '0.8rem' }}>
          Get Quote
        </Link>
      </div>
    </div>
  );
}

function ProjectBlueprint({ type }: { type: 'tower' | 'hotel' | 'villa' }) {
  return (
    <div style={{
      width: '100%',
      height: '240px',
      background: '#111',
      position: 'relative',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="arch-grid" />
      <svg viewBox="0 0 300 200" style={{ width: '80%', height: '80%', display: 'block', zIndex: 2 }}>
        {type === 'tower' && (
          <g>
            <rect x="90" y="20" width="120" height="170" fill="none" stroke="rgba(197,168,128,0.2)" strokeWidth="1" />
            {[40, 75, 110, 145].map((y) => (
              <g key={y}>
                <line x1="80" y1={y} x2="220" y2={y} stroke="var(--accent)" strokeWidth="0.8" />
                {Array.from({ length: 8 }, (_, idx) => 105 + idx * 12).map((x) => (
                  <line key={x} x1={x} y1={y - 12} x2={x} y2={y} stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
                ))}
              </g>
            ))}
          </g>
        )}
        
        {type === 'hotel' && (
          <g>
            <path d="M 20 180 L 100 80 L 160 140 L 240 60 L 290 130" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <path d="M 120 140 L 220 140 L 220 180 L 120 180 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 140 100 L 240 100 L 240 140 L 140 140 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="150" y1="110" x2="150" y2="130" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
          </g>
        )}

        {type === 'villa' && (
          <g>
            <path d="M 60 140 L 150 100 L 240 140 L 150 180 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="60" y1="140" x2="60" y2="180" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="150" y1="180" x2="150" y2="220" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="240" y1="140" x2="240" y2="180" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 80 80 L 170 40 L 260 80 L 170 120 Z" fill="none" stroke="var(--accent)" strokeWidth="1" />
            <line x1="80" y1="80" x2="80" y2="120" stroke="var(--accent)" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function Home() {
  const getWhatsAppLink = () => {
    const baseMsg = "Hi Yuval Enterprise,\nI am interested in your products and would like a quotation.";
    return `https://wa.me/919832065123?text=${encodeURIComponent(baseMsg)}`;
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Background Ambient Glows */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div className="arch-grid" />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.5) 0%, rgba(10, 10, 10, 0.95) 100%)',
          zIndex: 2
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '900px' }}>
          <h1 className="hero-title">
            Designed for Better Living.
          </h1>
          <p className="hero-subtitle">
            Premium home utility and security solutions for modern homes and commercial spaces across North Bengal and Sikkim.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeIn 1.8s ease-out'
          }}>
            <Link href="/products/upvc" className="btn btn-primary">
              Explore Products
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Get Free Quote
            </Link>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.503 4.94 1.505 5.548 0 10.064-4.512 10.068-10.066.002-2.69-1.043-5.22-2.943-7.122C16.75 1.57 14.225.524 11.535.524c-5.551 0-10.069 4.513-10.073 10.067-.001 1.912.499 3.778 1.448 5.405L1.87 20.48l4.777-1.326zM17.56 14.73c-.26-.13-1.534-.76-1.77-.845-.235-.085-.407-.13-.578.13-.17.26-.66.845-.806 1.012-.147.17-.294.19-.553.06-2.887-1.444-4.55-2.88-5.3-4.172-.2-.34.2-.315.572-1.055.06-.115.03-.22-.015-.31-.045-.09-.407-1.01-.558-1.38-.147-.35-.294-.3-.407-.305-.106-.005-.228-.005-.35-.005-.122 0-.32.045-.488.225-.168.18-.642.63-.642 1.54 0 .907.66 1.785.75 1.91.09.125 1.294 1.97 3.137 2.76.438.19.78.3 1.047.385.44.14.84.12 1.157.073.354-.05 1.533-.625 1.75-1.23.217-.61.217-1.135.152-1.24-.065-.105-.235-.165-.495-.295z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS SHOWCASE (Interactive Apple-style Hover Slider) */}
      <section id="products" className="section" style={{ position: 'relative', zIndex: 5, backgroundColor: '#0d0d0d' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Engineering Showroom</span>
            <h2 style={{ fontSize: 'calc(2rem + 0.5vw)', fontWeight: 400, marginTop: '1rem' }}>Our Architectural Solutions</h2>
          </div>

          <HoverSlider className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            {/* Left Column: Titles list & active description */}
            <div>
              <div className="flex flex-col space-y-4">
                {SLIDES.map((slide, index) => (
                  <TextStaggerHover
                    key={slide.id}
                    index={index}
                    className="cursor-pointer text-4xl lg:text-5xl font-bold uppercase tracking-tighter text-[#fff]"
                    text={slide.title}
                  />
                ))}
              </div>
              
              <ActiveProductDetails />
            </div>

            {/* Right Column: Slide images */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HoverSliderImageWrap style={{ width: '100%', maxWidth: '500px', height: '380px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                {SLIDES.map((slide, index) => (
                  <div key={slide.id} style={{ width: '100%', height: '100%' }}>
                    <HoverSliderImage
                      index={index}
                      imageUrl={slide.imageUrl}
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="size-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </HoverSliderImageWrap>
            </div>
          </HoverSlider>

        </div>
      </section>

      {/* 3. PROJECTS PORTFOLIO SUMMARY */}
      <section className="section" style={{ backgroundColor: '#0a0a0a', position: 'relative', zIndex: 5 }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Recent Showcases</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 0.5vw)', fontWeight: 400, marginTop: '1rem' }}>Architectural Portfolio</h2>
            </div>
            <Link href="/projects" className="btn btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.85rem' }}>
              Explore All Projects
            </Link>
          </div>

          <div className="projects-grid">
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <ProjectBlueprint type="tower" />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Siliguri</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Luxury Penthouse Apartment</h3>
                <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.5' }}>
                  Full-bleed uPVC sliding glass doors integrated with thin vertical invisible safety grills on high-rise balconies.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <ProjectBlueprint type="hotel" />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gangtok</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Himalayan Boutique Resort</h3>
                <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.5' }}>
                  Customized heavy-duty uPVC window configurations built for thermal efficiency and storm resistance.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <ProjectBlueprint type="villa" />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>North Bengal</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Modern Tea Estate Villa</h3>
                <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.5' }}>
                  A complete utility design combining custom sliding insect screens and heavy-duty ceiling drying racks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE AREAS SUMMARY */}
      <section className="section" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid var(--border-light)', position: 'relative', zIndex: 5 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Operational Scope</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.5vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Regional Service Coverage</h2>
            <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: 300 }}>
              We deploy full installation and service teams across North Bengal and Sikkim, maintaining core operations hubs in Siliguri and Gangtok to handle mountain-load custom specifications.
            </p>
            <Link href="/service-areas" className="btn btn-secondary">
              View Interactive Map
            </Link>
          </div>
          
          <div style={{
            position: 'relative',
            backgroundColor: '#121212',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '2rem',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <path d="M 0 10 L 100 10 M 0 30 L 100 30 M 0 50 L 100 50 M 0 70 L 100 70 M 0 90 L 100 90 M 10 0 L 10 100 M 30 0 L 30 100 M 50 0 L 50 100 M 70 0 L 70 100 M 90 0 L 90 100" stroke="rgba(255,255,255,0.02)" strokeWidth="0.2"/>
              <path d="M 10 40 L 25 20 L 40 35 L 55 10 L 70 30 L 85 15 L 95 35" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="25" r="2.5" fill="var(--accent)" stroke="#0a0a0a" strokeWidth="0.5" />
              <circle cx="45" cy="65" r="2.5" fill="var(--accent)" stroke="#0a0a0a" strokeWidth="0.5" />
              <circle cx="30" cy="45" r="2.5" fill="rgba(255,255,255,0.4)" stroke="#0a0a0a" strokeWidth="0.5" />
              <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.4)" stroke="#0a0a0a" strokeWidth="0.5" />
              <text x="50" y="21" textAnchor="middle" fill="#aaa" fontSize="3.5" fontFamily="var(--font-sans)">Gangtok</text>
              <text x="45" y="73" textAnchor="middle" fill="#aaa" fontSize="3.5" fontFamily="var(--font-sans)">Siliguri</text>
            </svg>
          </div>
        </div>
      </section>

      {/* 5. GENERAL CTA */}
      <section className="section" style={{ backgroundColor: '#0a0a0a', textAlign: 'center', borderTop: '1px solid var(--border-light)', position: 'relative', zIndex: 5 }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'calc(2rem + 0.5vw)', fontWeight: 400, fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Enhance Your Living Spaces</h2>
          <p style={{ color: '#888', marginBottom: '3rem', fontSize: '1rem', lineHeight: '1.6', fontWeight: 300 }}>
            Request a free consultation and project site survey with our solutions engineers. We manage custom dimensions, logistics, and solid installations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Get Free Quote
            </Link>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

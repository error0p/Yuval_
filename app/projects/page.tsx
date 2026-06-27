'use client';

import Link from 'next/link';

function ProjectBlueprint({ type }: { type: 'tower' | 'hotel' | 'villa' }) {
  return (
    <div style={{
      width: '100%',
      height: '280px',
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
            <rect x="90" y="20" width="120" height="170" fill="none" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 3" />
            {[40, 65, 90, 115, 140, 165].map((y) => (
              <g key={y}>
                <line x1="80" y1={y} x2="220" y2={y} stroke="var(--accent)" strokeWidth="1" />
                <rect x="95" y={y - 12} width="110" height="12" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                {Array.from({ length: 10 }, (_, idx) => 100 + idx * 10).map((x) => (
                  <line key={x} x1={x} y1={y - 12} x2={x} y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
                ))}
              </g>
            ))}
            <text x="150" y="110" fill="rgba(197,168,128,0.4)" fontSize="8" letterSpacing="0.2em" textAnchor="middle" fontFamily="var(--font-sans)">STRUCTURAL BLUEPRINT</text>
          </g>
        )}
        
        {type === 'hotel' && (
          <g>
            <path d="M 20 180 L 100 80 L 160 140 L 240 60 L 290 130" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 120 140 L 220 140 L 220 180 L 120 180 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 140 100 L 240 100 L 240 140 L 140 140 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 160 60 L 260 60 L 260 100 L 160 100 Z" fill="none" stroke="var(--accent)" strokeWidth="1" />
            <line x1="170" y1="70" x2="170" y2="90" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="250" y1="70" x2="250" y2="90" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="150" y1="110" x2="150" y2="130" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
            <text x="200" y="125" fill="rgba(197,168,128,0.4)" fontSize="8" letterSpacing="0.2em" textAnchor="middle" fontFamily="var(--font-sans)">ELEVATION BLUEPRINT</text>
          </g>
        )}

        {type === 'villa' && (
          <g>
            <path d="M 60 140 L 150 100 L 240 140 L 150 180 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="60" y1="140" x2="60" y2="180" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="150" y1="180" x2="150" y2="220" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="240" y1="140" x2="240" y2="180" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 60 180 L 150 220 L 240 180" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 80 80 L 170 40 L 260 80 L 170 120 Z" fill="none" stroke="var(--accent)" strokeWidth="1" />
            <line x1="80" y1="80" x2="80" y2="120" stroke="var(--accent)" strokeWidth="1" />
            <line x1="170" y1="120" x2="170" y2="160" stroke="var(--accent)" strokeWidth="1" />
            <line x1="260" y1="80" x2="260" y2="120" stroke="var(--accent)" strokeWidth="1" />
            <path d="M 80 120 L 170 160 L 260 120" fill="none" stroke="var(--accent)" strokeWidth="1" />
            <text x="170" y="100" fill="rgba(197,168,128,0.4)" fontSize="8" letterSpacing="0.2em" textAnchor="middle" fontFamily="var(--font-sans)">ISOMETRIC SCHEMATIC</text>
          </g>
        )}
      </svg>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '8rem 0 5rem', color: '#fff', position: 'relative' }}>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Editorial Header */}
        <div style={{ maxWidth: '800px', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
            Architectural Showcases
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Selected Projects Portfolio
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.7', fontWeight: 300 }}>
            We collaborate with premier architects, interior designers, builders, and villa owners across North Bengal and Sikkim. Inspect our portfolio of tailored uPVC windows, invisible safety installations, and integrated balcony utility systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" style={{ marginBottom: '5rem' }}>
          {/* Project 1 */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <ProjectBlueprint type="tower" />
            <div style={{ padding: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Siliguri</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Luxury Penthouse Apartment</h3>
              <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '2rem', lineHeight: '1.6' }}>
                Full-bleed charcoal-grey uPVC sliding doors integrated with thin vertical invisible safety grills on the 14th-floor penthouse balconies of a luxury high-rise development.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="badge">uPVC sliding doors</span>
                <span className="badge">Invisible Grills</span>
                <span className="badge">Balcony Security</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <ProjectBlueprint type="hotel" />
            <div style={{ padding: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gangtok</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Himalayan Boutique Resort</h3>
              <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '2rem', lineHeight: '1.6' }}>
                Customized heavy-duty uPVC window configurations built for thermal efficiency and wind-resistance, installed across cascading resort luxury suites overlooking Gangtok Valley.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="badge">Thermal uPVC</span>
                <span className="badge">Hotel Scale</span>
                <span className="badge">Wind Class 5</span>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <ProjectBlueprint type="villa" />
            <div style={{ padding: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>North Bengal</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Modern Tea Estate Villa</h3>
              <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '2rem', lineHeight: '1.6' }}>
                A complete utility and security design combining custom sliding insect screens, heavy-load pulley drying systems, and glass balcony panels for a private tea estate villa.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span className="badge">Pleated Mosquito Nets</span>
                <span className="badge">Ceiling drying racks</span>
                <span className="badge">Villa Package</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Have a project in mind?</h3>
          <p style={{ color: '#888', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
            Whether it is a private residential home, a new commercial build, or a renovation, our specialists can collaborate on structural specifications.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Book Site Survey
            </Link>
            <a href="https://wa.me/919832065123" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
              Chat with an Expert
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

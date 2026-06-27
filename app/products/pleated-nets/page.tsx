'use client';

import Link from 'next/link';
import { useState } from 'react';

function PleatedNetDiagram() {
  const [position, setPosition] = useState(60);

  const height = 200;
  const maxWidth = 300;
  const currentWidth = (position / 100) * maxWidth;
  const numPleats = 16;
  const pleatWidth = currentWidth / numPleats;
  
  let pathD = '';
  if (currentWidth > 0) {
    pathD = `M 0 0`;
    for (let i = 0; i <= numPleats; i++) {
      const x = i * pleatWidth;
      const y = i % 2 === 0 ? 0 : height;
      pathD += ` L ${x} ${y}`;
    }
  }

  return (
    <div className="tech-svg" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Slide to Deploy Mesh</h4>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={position} 
          onChange={(e) => setPosition(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <rect x="10" y="10" width="330" height="220" fill="none" stroke="var(--border-medium)" strokeWidth="2" />
          
          <line x1="10" y1="20" x2="340" y2="20" stroke="var(--text-muted)" strokeWidth="4" />
          <line x1="10" y1="220" x2="340" y2="220" stroke="var(--text-muted)" strokeWidth="4" />
          
          <g transform="translate(10, 20)">
            <path 
              d={pathD} 
              fill="none" 
              stroke="var(--accent)" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
              opacity="0.8" 
            />
          </g>

          <line 
            x1={10 + currentWidth} 
            y1="20" 
            x2={10 + currentWidth} 
            y2="220" 
            stroke="var(--text-primary)" 
            strokeWidth="4" 
          />
          <circle 
            cx={10 + currentWidth} 
            cy="120" 
            r="8" 
            fill="var(--accent)" 
            stroke="var(--bg-primary)" 
            strokeWidth="2" 
          />
          
          <text x="25" y="200" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="0.05em">
            TENSION GUIDE WIRE ACTIVE
          </text>
          <text x="325" y="200" textAnchor="end" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="0.05em">
            MESH EXPANSION: {position}%
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function PleatedNetsPage() {
  const getWhatsAppLink = () => {
    return `https://wa.me/919832065123?text=${encodeURIComponent(
      "Hi Yuval Enterprise,\nI am interested in Pleated Mosquito Nets and would like a quotation."
    )}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '8rem 0 5rem', color: 'var(--text-primary)', position: 'relative' }}>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Editorial Header */}
        <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
            Insect Screens & Ventilation Systems
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Fresh Air Without Compromise.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.7', fontWeight: 300 }}>
            Enjoy natural ventilation completely insect-free. Our architectural-grade pleated mosquito nets are designed to slide effortlessly along guide tracks and fold away into thin profiles. Combining modern minimal frame tracks with high-strength, weather-resistant pleated screens.
          </p>
        </div>

        {/* Product Visual & Spec Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div style={{ height: '400px' }}>
            <PleatedNetDiagram />
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
              Screen Technology & Mechanics
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>UV-Resistant Polyester Mesh</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  High-durability pleated polyester mesh is resistant to fading, solar heat, and tears. Dust-resistant coatings prevent debris accumulation.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>High-Strength Kevlar Guide Wires</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  Internal tension guide wires run horizontally through the pleats, providing strict structural wind resistance and smooth vertical track alignment.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Ultra-Thin Aluminum Frames</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  Profiles measure only 20mm in depth, allowing seamless integrations into existing uPVC, aluminum, or wooden window casings.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Smooth Frictionless Tracks</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  The lower track is engineered to be extremely low-profile (only 4mm high) to prevent tripping and allow smooth cleaning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Table Summary */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Net Specifications</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  <th style={{ padding: '1rem 0' }}>Specification</th>
                  <th style={{ padding: '1rem 0' }}>Standard Roller Nets</th>
                  <th style={{ padding: '1rem 0' }}>Yuval Enterprise Pleated</th>
                  <th style={{ padding: '1rem 0' }}>Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Mesh Material</td>
                  <td style={{ padding: '1rem 0' }}>Fiberglass (Brittle)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Polyester (Elastic)</td>
                  <td style={{ padding: '1rem 0' }}>Resists pet scratching and structural creases</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Wind Rating</td>
                  <td style={{ padding: '1rem 0' }}>Mesh blows out of track</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Tensioned wires retain track</td>
                  <td style={{ padding: '1rem 0' }}>Works perfectly in storm conditions</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Sash Operations</td>
                  <td style={{ padding: '1rem 0' }}>Spring-loaded (Snaps back)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Friction-lock (Stops anywhere)</td>
                  <td style={{ padding: '1rem 0' }}>Can be opened partially as desired</td>
                </tr>
                <tr style={{ color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Maximum Width</td>
                  <td style={{ padding: '1rem 0' }}>Up to 1.5 meters</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Up to 4.0 meters (Linked)</td>
                  <td style={{ padding: '1rem 0' }}>Fits massive floor-to-ceiling balcony doors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Interested in this solution?</h3>
          <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Get in touch with our engineering team for custom sizing, site assessment, and a quotation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
              Get Quote on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-secondary">
              Free Consultation Form
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

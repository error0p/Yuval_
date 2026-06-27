'use client';

import Link from 'next/link';
import { useState } from 'react';

function InvisibleGrillDiagram() {
  const [sliderVal, setSliderVal] = useState(50);
  const grillWires = Array.from({ length: 15 }, (_, i) => 25 + i * 18);

  return (
    <div className="tech-svg" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>Drag to Simulate Installation</h4>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderVal} 
          onChange={(e) => setSliderVal(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: '#111', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#081418" />
              <stop offset="60%" stopColor="#215461" />
              <stop offset="100%" stopColor="#3ea1b9" stopOpacity="0.95" />
            </linearGradient>
            <clipPath id="grillClip">
              <rect x="25" y="20" width={(sliderVal / 100) * 270} height="160" />
            </clipPath>
          </defs>
          
          <rect x="25" y="20" width="270" height="160" fill="url(#sky)" />
          <path d="M 25 150 L 80 110 L 140 140 L 220 90 L 295 160 Z" fill="#1b1222" opacity="0.9" />
          <path d="M 80 180 L 160 130 L 230 160 L 295 120 L 295 180 Z" fill="#120c18" />
          <circle cx="180" cy="110" r="14" fill="#ffebd3" filter="drop-shadow(0 0 10px #ff9e3b)" />

          <rect x="20" y="15" width="280" height="8" fill="#1f1f1f" />
          <rect x="20" y="175" width="280" height="40" fill="1a1a1a" />
          <rect x="20" y="172" width="280" height="4" fill="#2b2b2b" />
          
          <rect x="25" y="120" width="270" height="52" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="25" y1="120" x2="295" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          <g clipPath="url(#grillClip)">
            {grillWires.map((x) => (
              <line 
                key={x} 
                x1={x} 
                y1="20" 
                x2={x} 
                y2="172" 
                stroke="#fff" 
                strokeWidth="0.8" 
                opacity="0.55" 
                filter="drop-shadow(0 0 1px rgba(255,255,255,0.8))"
              />
            ))}
          </g>

          <line 
            x1={25 + (sliderVal / 100) * 270} 
            y1="15" 
            x2={25 + (sliderVal / 100) * 270} 
            y2="215" 
            stroke="var(--accent)" 
            strokeWidth="2" 
            strokeDasharray="2 2"
          />
          <circle 
            cx={25 + (sliderVal / 100) * 270} 
            cy="110" 
            r="8" 
            fill="var(--accent)" 
            stroke="#0a0a0a" 
            strokeWidth="2" 
          />

          <text x="30" y="200" fill="#555" fontSize="8" fontFamily="var(--font-sans)">
            PROTECTION VIEW: {sliderVal}% SECURED
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function InvisibleGrillsPage() {
  const getWhatsAppLink = () => {
    return `https://wa.me/919832065123?text=${encodeURIComponent(
      "Hi Yuval Enterprise,\nI am interested in Invisible Grills and would like a quotation."
    )}`;
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '8rem 0 5rem', color: '#fff', position: 'relative' }}>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Editorial Header */}
        <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
            Balcony Safety / Security Systems
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Protection You Barely Notice.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.7', fontWeight: 300 }}>
            Reclaim your balcony with zero visual compromise. Our invisible safety grills are made of high-tensile 316 marine-grade stainless steel cables sheathed in tough nylon. Providing absolute fall protection for families, children, and pets without creating a cage-like feeling.
          </p>
        </div>

        {/* Product Visual & Spec Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div style={{ height: '400px' }}>
            <InvisibleGrillDiagram />
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
              Safety & Material Engineering
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>SS 316 Marine-Grade Core</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  High-tensile multi-strand steel core provides up to 400kg of load-bearing strength per cable. Designed to resist cutting, impact, and high tension.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Protective Nylon Sheathing</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  Each wire is encapsulated in a heavy-duty, weather-resistant nylon coat that prevents rust and is soft to touch, protecting children's hands.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Structural Aluminum Tracks</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  The tracks are anchored securely to concrete using structural expansion bolts, distributing force evenly across the slab.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Emergency Escape Friendly</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  In case of fires or evacuation emergencies, the cables can be cut using professional safety wire-cutters, unlike thick steel grill cages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Table Summary */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Grill Specifications</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  <th style={{ padding: '1rem 0' }}>Specification</th>
                  <th style={{ padding: '1rem 0' }}>Standard Grills</th>
                  <th style={{ padding: '1rem 0' }}>Yuval Enterprise Spec</th>
                  <th style={{ padding: '1rem 0' }}>Advantage</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Cable Diameter</td>
                  <td style={{ padding: '1rem 0' }}>1.2mm - 1.6mm</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>2.5mm - 3.0mm</td>
                  <td style={{ padding: '1rem 0' }}>Double the tensile strength</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Tensile Strength</td>
                  <td style={{ padding: '1rem 0' }}>100 - 150 kg</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>350 - 400 kg</td>
                  <td style={{ padding: '1rem 0' }}>Withstands massive body impacts</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Standard Spacing</td>
                  <td style={{ padding: '1rem 0' }}>3 inches / 4 inches</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>2.0 inches (Optimum)</td>
                  <td style={{ padding: '1rem 0' }}>Pet-friendly: small cats/dogs cannot pass</td>
                </tr>
                <tr style={{ color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Rust Resistance</td>
                  <td style={{ padding: '1rem 0' }}>Low (Mild Steel)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>100% Rust-proof (SS 316)</td>
                  <td style={{ padding: '1rem 0' }}>Ideal for heavy Sikkim rain and humidity</td>
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

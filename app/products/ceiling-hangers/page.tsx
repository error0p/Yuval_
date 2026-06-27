'use client';

import Link from 'next/link';
import { useState } from 'react';

function CeilingHangerDiagram() {
  const [heightOffset, setHeightOffset] = useState(20);

  const pulleyX1 = 60;
  const pulleyX2 = 240;
  const gearX = 300;
  const poleY = 40 + heightOffset;

  return (
    <div className="tech-svg" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>Pulley Height Adjustment</h4>
        <input 
          type="range" 
          min="0" 
          max="120" 
          value={heightOffset} 
          onChange={(e) => setHeightOffset(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <rect x="20" y="15" width="310" height="8" fill="#c8d6d9" rx="2" />
          
          <circle cx={pulleyX1} cy="30" r="10" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <circle cx={pulleyX1} cy="30" r="4" fill="var(--accent)" />
          
          <circle cx={pulleyX2} cy="30" r="10" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <circle cx={pulleyX2} cy="30" r="4" fill="var(--accent)" />

          <rect x={gearX - 10} y="150" width="20" height="30" fill="var(--border-medium)" rx="3" />
          <circle cx={gearX} cy="165" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1={gearX} y1="165" x2={gearX + 8} y2="157" stroke="var(--accent)" strokeWidth="2" />

          <path 
            d={`M ${gearX} 150 L ${pulleyX2} 30 L ${pulleyX1} 30 L ${pulleyX1} ${poleY}`} 
            fill="none" 
            stroke="#7a9297" 
            strokeWidth="1.2" 
          />
          <path 
            d={`M ${gearX} 150 L ${pulleyX2} 30 L ${pulleyX2} ${poleY}`} 
            fill="none" 
            stroke="#7a9297" 
            strokeWidth="1.2" 
          />

          <rect x="40" y={poleY} width="220" height="8" fill="var(--accent)" rx="2" />
          <line x1="40" y1={poleY + 4} x2="260" y2={poleY + 4} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          
          {[60, 110, 160, 210].map((xOffset) => (
            <g key={xOffset} transform={`translate(${xOffset}, ${poleY + 8})`}>
              <path d="M 10 0 L 0 10 L 20 10 Z" fill="none" stroke="var(--text-muted)" strokeWidth="1" />
              <path d="M 0 10 L 4 40 L 16 40 L 20 10 Z" fill="rgba(33, 84, 97, 0.05)" stroke="var(--border-medium)" strokeWidth="0.5" />
            </g>
          ))}

          <text x="320" y="195" textAnchor="end" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-sans)">
            MECHANICAL ADVANTAGE: 2:1
          </text>
          <text x="320" y="210" textAnchor="end" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-sans)">
            ELEVATION STATS: {120 - heightOffset}mm HEIGHT
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function CeilingHangersPage() {
  const getWhatsAppLink = () => {
    return `https://wa.me/919832065123?text=${encodeURIComponent(
      "Hi Yuval Enterprise,\nI am interested in Ceiling Cloth Hangers and would like a quotation."
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
            Balcony Space & Utility Systems
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Utility Made Beautiful.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.7', fontWeight: 300 }}>
            Reclaim your precious balcony floor area. Our ceiling-mounted, pulley-operated double-pole drying hangers let you elevate wet laundry up to the ceiling, completely out of the way. Seamless, structural, and heavy-duty designs for modern apartments in Siliguri.
          </p>
        </div>

        {/* Product Visual & Spec Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div style={{ height: '400px' }}>
            <CeilingHangerDiagram />
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
              Mechanical & Spatial Engineering
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>2:1 Mechanical Advantage Pulley</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  A heavy-duty manual pulley reduction loop cuts the physical effort required to lift heavy wet clothes in half. Smooth, frictionless nylon wheels.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Marine-Grade Stainless Steel Rope</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  High-durability stainless steel wire ropes run from the ceiling mounts to the rods. Rustproof, fray-resistant, and built for heavy constant loads.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Premium Aluminum Rod Profiles</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  Double poles are crafted from thick-walled aluminum tubes, coated in a sleek white finish. Resists bending, sag, and moisture oxidation.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Wall-Mounted Friction Lock Gear</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  A clean, wall-anchored metal locking spool holds the ropes firmly at any desired elevation, preventing sudden drops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Table Summary */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Utility Specifications</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  <th style={{ padding: '1rem 0' }}>Specification</th>
                  <th style={{ padding: '1rem 0' }}>Standard Rope Lines</th>
                  <th style={{ padding: '1rem 0' }}>Yuval Pulley Hanger</th>
                  <th style={{ padding: '1rem 0' }}>Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Load Capacity</td>
                  <td style={{ padding: '1rem 0' }}>5 - 10 kg</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Up to 25 kg</td>
                  <td style={{ padding: '1rem 0' }}>Holds heavy wet bedsheets and blankets easily</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Suspension Lines</td>
                  <td style={{ padding: '1rem 0' }}>Nylon Ropes (Stretches)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Stainless Steel 304 Wires</td>
                  <td style={{ padding: '1rem 0' }}>Zero sag, rustproof, and fire-resistant</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Floor Area Saved</td>
                  <td style={{ padding: '1rem 0' }}>0% (Takes up floor space)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>100% Floor Area Liberated</td>
                  <td style={{ padding: '1rem 0' }}>Converts utility balcony to relaxation deck</td>
                </tr>
                <tr style={{ color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Durability</td>
                  <td style={{ padding: '1rem 0' }}>1 - 2 Years (plastic parts snap)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>10+ Years Lifetime</td>
                  <td style={{ padding: '1rem 0' }}>Solid alloy structural fittings</td>
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

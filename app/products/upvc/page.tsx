'use client';

import Link from 'next/link';
import { useState } from 'react';

function UPvcDiagram() {
  const [activeTab, setActiveTab] = useState<'thermal' | 'reinforce' | 'seals' | 'glass'>('thermal');

  return (
    <div className="tech-svg" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div className="feature-tabs">
        <button 
          onClick={() => setActiveTab('thermal')} 
          className={`feature-tab ${activeTab === 'thermal' ? 'active' : ''}`}
        >
          Thermal Chambers
        </button>
        <button 
          onClick={() => setActiveTab('reinforce')} 
          className={`feature-tab ${activeTab === 'reinforce' ? 'active' : ''}`}
        >
          Steel Core
        </button>
        <button 
          onClick={() => setActiveTab('seals')} 
          className={`feature-tab ${activeTab === 'seals' ? 'active' : ''}`}
        >
          Triple Gaskets
        </button>
        <button 
          onClick={() => setActiveTab('glass')} 
          className={`feature-tab ${activeTab === 'glass' ? 'active' : ''}`}
        >
          Argon Glazing
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <path d="M 50 30 L 150 30 L 150 70 L 170 70 L 170 210 L 50 210 Z" fill="none" stroke="var(--text-muted)" strokeWidth="2" />
          
          <rect x="58" y="38" width="84" height="24" fill="none" stroke="var(--border-medium)" strokeWidth="1" />
          <rect x="58" y="68" width="40" height="60" fill="none" stroke="var(--border-medium)" strokeWidth="1" />
          <rect x="102" y="68" width="40" height="60" fill="none" stroke="var(--border-medium)" strokeWidth="1" />
          <rect x="58" y="134" width="104" height="68" fill="none" stroke="var(--border-medium)" strokeWidth="1" />

          <g opacity={activeTab === 'thermal' ? 0.15 : 0.02} style={{ transition: 'opacity 0.5s' }}>
            <rect x="58" y="38" width="84" height="24" fill="var(--accent)" />
            <rect x="58" y="68" width="40" height="60" fill="var(--accent)" />
            <rect x="102" y="68" width="40" height="60" fill="var(--accent)" />
            <rect x="58" y="134" width="104" height="68" fill="var(--accent)" />
          </g>

          <rect x="106" y="74" width="32" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="2" />
          <rect x="110" y="78" width="24" height="40" fill={activeTab === 'reinforce' ? 'var(--accent)' : 'var(--bg-primary)'} opacity={activeTab === 'reinforce' ? 0.35 : 0.9} stroke="var(--accent)" strokeWidth="1" style={{ transition: 'all 0.5s' }} />
          {activeTab === 'reinforce' && (
            <text x="122" y="102" fill="var(--text-primary)" fontSize="8" textAnchor="middle" fontWeight="bold">Fe</text>
          )}

          <circle cx="150" cy="50" r="4" fill={activeTab === 'seals' ? 'var(--accent)' : 'var(--border-medium)'} stroke="var(--bg-primary)" style={{ transition: 'all 0.5s' }} />
          <circle cx="170" cy="74" r="4" fill={activeTab === 'seals' ? 'var(--accent)' : 'var(--border-medium)'} stroke="var(--bg-primary)" style={{ transition: 'all 0.5s' }} />
          <circle cx="170" cy="206" r="4" fill={activeTab === 'seals' ? 'var(--accent)' : 'var(--border-medium)'} stroke="var(--bg-primary)" style={{ transition: 'all 0.5s' }} />

          <rect x="210" y="40" width="10" height="160" fill="none" stroke="var(--border-medium)" strokeWidth="1" />
          <rect x="235" y="40" width="10" height="160" fill="none" stroke="var(--border-medium)" strokeWidth="1" />
          <rect x="220" y="40" width="15" height="160" fill={activeTab === 'glass' ? 'var(--accent-light)' : 'transparent'} style={{ transition: 'all 0.5s' }} />
          {activeTab === 'glass' && (
            <text x="227" y="125" fill="var(--accent)" fontSize="8" textAnchor="middle" letterSpacing="0.1em" transform="rotate(-90, 227, 125)">ARGON GAS</text>
          )}

          {activeTab === 'thermal' && <path d="M 50 30 L 150 30 L 150 70 L 170 70 L 170 210 L 50 210 Z" fill="none" stroke="var(--accent)" strokeWidth="1.5" filter="drop-shadow(0 0 2px var(--accent))" />}
          {activeTab === 'reinforce' && <rect x="106" y="74" width="32" height="48" fill="none" stroke="var(--accent)" strokeWidth="1.5" filter="drop-shadow(0 0 2px var(--accent))" />}
          {activeTab === 'seals' && (
            <g>
              <circle cx="150" cy="50" r="6" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <circle cx="170" cy="74" r="6" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <circle cx="170" cy="206" r="6" fill="none" stroke="var(--accent)" strokeWidth="1" />
            </g>
          )}
          {activeTab === 'glass' && (
            <g>
              <rect x="210" y="40" width="10" height="160" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <rect x="235" y="40" width="10" height="160" fill="none" stroke="var(--accent)" strokeWidth="1" />
            </g>
          )}

          <text x="25" y="222" fill="var(--text-secondary)" fontSize="8" fontFamily="var(--font-sans)">
            {activeTab === 'thermal' && 'THERMAL BARRIER: MULTI-CHAMBER HEAT DISSIPATION'}
            {activeTab === 'reinforce' && 'STRUCTURAL SOLIDITY: HEAVY-DUTY STEEL REINFORCEMENT'}
            {activeTab === 'seals' && 'SOUND SHIELDING: CONTINUOUS TRIPLE GASKETS BLOCK NOISE'}
            {activeTab === 'glass' && 'ACOUSTIC & SOLAR BARRIER: DOUBLE-PANE ARGON GAS INSULATION'}
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function UpvcPage() {
  const getWhatsAppLink = () => {
    return `https://wa.me/919832065123?text=${encodeURIComponent(
      "Hi Yuval Enterprise,\nI am interested in uPVC Windows & Doors and would like a quotation."
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
            uPVC Profiles / Windows & Doors
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Built for Light. Engineered for Living.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.7', fontWeight: 300 }}>
            Our high-performance uPVC profile systems bring absolute luxury, insulation, and durability to residential and commercial projects. Specifically engineered to withstand the strong wind pressures and low temperatures of high-altitude Sikkim, while keeping external noises outside.
          </p>
        </div>

        {/* Product Visual & Spec Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div style={{ height: '400px' }}>
            <UPvcDiagram />
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
              Engineering Specifications
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Multi-Chamber Thermal Insulation</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  A multi-chamber cross-section design forms dead air pockets that block heat transmission, preventing indoor heat loss in cold hill regions and saving energy.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Galvanized Steel Reinforcement</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  High-gauge internal steel reinforcement frames inside the central chamber ensure structural rigidity and stability under Darjeeling & Gangtok wind loads.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Triple Gasket Seal Shielding</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  Continuous high-grade rubber weather gaskets prevent dust intrusion, drafts, and rainwater seepage, while damping exterior traffic noise up to 45 dB.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>Double-Glazed Argon Panes</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300 }}>
                  Double glass layers separated by a hermetically sealed spacer filled with inert Argon gas provide a massive solar and acoustic barrier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Table Summary */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Technical Parameters</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  <th style={{ padding: '1rem 0' }}>Feature</th>
                  <th style={{ padding: '1rem 0' }}>Industry Standard</th>
                  <th style={{ padding: '1rem 0' }}>Yuval Enterprise Spec</th>
                  <th style={{ padding: '1rem 0' }}>Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>U-Value (Thermal)</td>
                  <td style={{ padding: '1rem 0' }}>&gt; 2.5 W/m²K</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>&le; 1.6 W/m²K</td>
                  <td style={{ padding: '1rem 0' }}>60% better heat retention in winters</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Acoustic Rating</td>
                  <td style={{ padding: '1rem 0' }}>25 - 30 dB</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>40 - 45 dB</td>
                  <td style={{ padding: '1rem 0' }}>Whisper-quiet living spaces</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>Wind Load Capacity</td>
                  <td style={{ padding: '1rem 0' }}>Class 3 (1500 Pa)</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>Class 5 (3000 Pa)</td>
                  <td style={{ padding: '1rem 0' }}>Uncompromising safety at high altitudes</td>
                </tr>
                <tr style={{ color: '#ccc' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: '#fff' }}>UV Resistance</td>
                  <td style={{ padding: '1rem 0' }}>5 - 10 Years</td>
                  <td style={{ padding: '1rem 0', color: 'var(--accent)' }}>30+ Years Warranty</td>
                  <td style={{ padding: '1rem 0' }}>Profile remains pristine white or charcoal</td>
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

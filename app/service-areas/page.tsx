'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServiceArea {
  id: string;
  name: string;
  coords: { x: number; y: number };
  description: string;
  specialties: string[];
}

const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'gangtok',
    name: 'Gangtok & Sikkim',
    coords: { x: 50, y: 25 },
    description: 'Hillside installations optimized for weatherproofing and mountain wind loads. High-performance uPVC and pleated net systems.',
    specialties: ['uPVC Casement Windows', 'Pleated Mosquito Nets', 'Hotel Installations'],
  },
  {
    id: 'siliguri',
    name: 'Siliguri (Hub)',
    coords: { x: 45, y: 65 },
    description: 'Our central operations hub. Express delivery and full installation teams for apartments and high-rises.',
    specialties: ['Invisible Grills', 'Sliding Balcony Doors', 'Ceiling Hangers'],
  },
  {
    id: 'north-bengal',
    name: 'North Bengal Hills',
    coords: { x: 30, y: 45 },
    description: 'Premium villa projects in Darjeeling, Kalimpong, and Kurseong. Custom thermal uPVC profiles.',
    specialties: ['Custom Window Systems', 'Weatherproof Seals', 'Villa Utility Units'],
  },
  {
    id: 'dooars',
    name: 'Dooars Plains',
    coords: { x: 70, y: 70 },
    description: 'Insect protection and ventilation systems tailored for lush, green plain environments.',
    specialties: ['Pleated Mosquito Nets', 'Invisible Safety Grills', 'Resort Installations'],
  },
];

export default function ServiceAreasPage() {
  const [activeArea, setActiveArea] = useState<ServiceArea | null>(null);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '8rem 0 5rem', color: 'var(--text-primary)', position: 'relative' }}>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
            Geographical Coverage
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Service Areas & Networks.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontWeight: 300 }}>
            We deploy dedicated installation and support engineers across North Bengal and Sikkim. Click or hover on the glowing network pins below to explore regional capabilities, specialties, and support hubs.
          </p>
        </div>

        {/* Map Grid Container */}
        <div className="map-grid" style={{ marginBottom: '5rem' }}>
          {/* SVG Interactive Map */}
          <div style={{
            position: 'relative',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '2rem',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1.5rem', zIndex: 5 }}>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>Interactive Network Map</span>
            </div>
            
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2d7a8e" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#2d7a8e" stopOpacity="0"/>
                </radialGradient>
              </defs>
              
              <path d="M 0 10 L 100 10 M 0 30 L 100 30 M 0 50 L 100 50 M 0 70 L 100 70 M 0 90 L 100 90 M 10 0 L 10 100 M 30 0 L 30 100 M 50 0 L 50 100 M 70 0 L 70 100 M 90 0 L 90 100" stroke="rgba(0,0,0,0.015)" strokeWidth="0.2"/>
              <path d="M 10 40 L 25 20 L 40 35 L 55 10 L 70 30 L 85 15 L 95 35" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 25 15 Q 50 5 75 15 T 90 45 T 75 85 T 45 95 T 15 75 T 25 15 Z" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.8" strokeDasharray="2 2"/>
              
              <line x1="45" y1="65" x2="50" y2="25" stroke="rgba(33, 84, 97, 0.25)" strokeWidth="0.4" strokeDasharray="1 1"/>
              <line x1="45" y1="65" x2="30" y2="45" stroke="rgba(33, 84, 97, 0.25)" strokeWidth="0.4" strokeDasharray="1 1"/>
              <line x1="45" y1="65" x2="70" y2="70" stroke="rgba(33, 84, 97, 0.25)" strokeWidth="0.4" strokeDasharray="1 1"/>

              {/* Pins */}
              {SERVICE_AREAS.map((area) => {
                const isHovered = activeArea?.id === area.id;
                return (
                  <g 
                    key={area.id} 
                    onClick={() => setActiveArea(area)}
                    onMouseEnter={() => setActiveArea(area)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle 
                      cx={area.coords.x} 
                      cy={area.coords.y} 
                      r={isHovered ? 8 : 4} 
                      fill="url(#glow)" 
                      style={{ transition: 'r 0.3s ease' }}
                    />
                    <circle 
                      cx={area.coords.x} 
                      cy={area.coords.y} 
                      r={isHovered ? 2 : 1.2} 
                      fill={isHovered ? '#fff' : '#215461'} 
                      stroke="var(--bg-primary)"
                      strokeWidth="0.4"
                      style={{ transition: 'fill 0.3s, r 0.3s' }}
                    />
                    <circle 
                      cx={area.coords.x} 
                      cy={area.coords.y} 
                      r={12} 
                      fill="transparent"
                    />
                    <text 
                      x={area.coords.x} 
                      y={area.coords.y - 3} 
                      textAnchor="middle" 
                      fill={isHovered ? 'var(--text-primary)' : 'var(--text-secondary)'} 
                      fontSize="2.8" 
                      fontWeight={isHovered ? '600' : '400'}
                      style={{ transition: 'fill 0.3s', fontFamily: 'var(--font-sans)' }}
                    >
                      {area.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Regional details card */}
          <div>
            {activeArea ? (
              <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                 <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 500 }}>Operational Hub</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)' }}>{activeArea.name}</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 300 }}>
                  {activeArea.description}
                </p>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Popular Installations:</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {activeArea.specialties.map((spec, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{
                padding: '3rem 2rem',
                border: '1px dashed var(--border-medium)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" style={{ marginBottom: '1rem', opacity: 0.6 }}><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 1.89.77 4.12 2.15 6.19C7.51 18.26 9.61 20 12 20s4.49-1.74 5.85-3.81C19.23 14.12 20 11.89 20 10a8 8 0 0 0-8-8z"></path></svg>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Select a Service Region</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto' }}>
                  Hover over or click on the glowing pins on the interactive map to explore our localized capabilities and specialties.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Have a project in our coverage area?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
            Book a site survey and consultation. Our team handles local sizing, custom transport, and complete structural installations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Book Site Survey
            </Link>
            <a href="https://wa.me/919832065123" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

// Service Area Data for Interactive Map
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

/* ==========================================
   1. uPVC INTERACTIVE SCHEMATIC DIAGRAM
   ========================================== */
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
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: '#111', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Outer PVC Frame boundaries */}
          <path d="M 50 30 L 150 30 L 150 70 L 170 70 L 170 210 L 50 210 Z" fill="none" stroke="#444" strokeWidth="2.5" />
          
          {/* Chambers */}
          <rect x="58" y="38" width="84" height="24" fill="none" stroke="#2b2b2b" strokeWidth="1" />
          <rect x="58" y="68" width="40" height="60" fill="none" stroke="#2b2b2b" strokeWidth="1" />
          <rect x="102" y="68" width="40" height="60" fill="none" stroke="#2b2b2b" strokeWidth="1" />
          <rect x="58" y="134" width="104" height="68" fill="none" stroke="#2b2b2b" strokeWidth="1" />

          {/* Multi-chamber highlights */}
          <g opacity={activeTab === 'thermal' ? 0.25 : 0.05} style={{ transition: 'opacity 0.5s' }}>
            <rect x="58" y="38" width="84" height="24" fill="var(--accent)" />
            <rect x="58" y="68" width="40" height="60" fill="var(--accent)" />
            <rect x="102" y="68" width="40" height="60" fill="var(--accent)" />
            <rect x="58" y="134" width="104" height="68" fill="var(--accent)" />
          </g>

          {/* Steel Reinforcement Core */}
          <rect x="106" y="74" width="32" height="48" fill="none" stroke="#555" strokeWidth="2" />
          <rect x="110" y="78" width="24" height="40" fill={activeTab === 'reinforce' ? 'var(--accent)' : '#222'} opacity={activeTab === 'reinforce' ? 0.3 : 0.8} stroke="var(--accent)" strokeWidth="1" style={{ transition: 'all 0.5s' }} />
          {activeTab === 'reinforce' && (
            <text x="122" y="102" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">Fe</text>
          )}

          {/* Triple Gaskets */}
          <circle cx="150" cy="50" r="4" fill={activeTab === 'seals' ? 'var(--accent)' : '#000'} stroke="#222" style={{ transition: 'all 0.5s' }} />
          <circle cx="170" cy="74" r="4" fill={activeTab === 'seals' ? 'var(--accent)' : '#000'} stroke="#222" style={{ transition: 'all 0.5s' }} />
          <circle cx="170" cy="206" r="4" fill={activeTab === 'seals' ? 'var(--accent)' : '#000'} stroke="#222" style={{ transition: 'all 0.5s' }} />

          {/* Double Pane Argon Glazing */}
          <rect x="210" y="40" width="10" height="160" fill="none" stroke="#444" strokeWidth="1" />
          <rect x="235" y="40" width="10" height="160" fill="none" stroke="#444" strokeWidth="1" />
          <rect x="220" y="40" width="15" height="160" fill={activeTab === 'glass' ? 'rgba(197,168,128,0.1)' : 'rgba(255,255,255,0.01)'} style={{ transition: 'all 0.5s' }} />
          {activeTab === 'glass' && (
            <text x="227" y="125" fill="var(--accent)" fontSize="8" textAnchor="middle" letterSpacing="0.1em" transform="rotate(-90, 227, 125)">ARGON GAS</text>
          )}

          {/* Glow indicator line */}
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

          {/* Tech Description overlay */}
          <text x="25" y="222" fill="#888" fontSize="8" fontFamily="var(--font-sans)">
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

/* ==========================================
   2. INVISIBLE GRILL INTERACTIVE SLIDER
   ========================================== */
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
              <stop offset="0%" stopColor="#2c1a35" />
              <stop offset="60%" stopColor="#4a263c" />
              <stop offset="100%" stopColor="#c5a880" stopOpacity="0.8" />
            </linearGradient>
            <clipPath id="grillClip">
              <rect x="25" y="20" width={(sliderVal / 100) * 270} height="160" />
            </clipPath>
          </defs>
          
          {/* City view (rendered inside frame) */}
          <rect x="25" y="20" width="270" height="160" fill="url(#sky)" />
          
          {/* Mountains in background */}
          <path d="M 25 150 L 80 110 L 140 140 L 220 90 L 295 160 Z" fill="#1b1222" opacity="0.9" />
          <path d="M 80 180 L 160 130 L 230 160 L 295 120 L 295 180 Z" fill="#120c18" />

          {/* Glowing Sun */}
          <circle cx="180" cy="110" r="14" fill="#ffebd3" filter="drop-shadow(0 0 10px #ff9e3b)" />

          {/* Balcony Structure Overlay */}
          <rect x="20" y="15" width="280" height="8" fill="#1f1f1f" />
          <rect x="20" y="175" width="280" height="40" fill="#1a1a1a" />
          <rect x="20" y="172" width="280" height="4" fill="#2b2b2b" />
          
          {/* Glass Railing */}
          <rect x="25" y="120" width="270" height="52" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="25" y1="120" x2="295" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* Wires (Clipped based on slider position) */}
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

          {/* Slider divider overlay */}
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

          {/* Grid annotations */}
          <text x="30" y="200" fill="#555" fontSize="8" fontFamily="var(--font-sans)">
            PROTECTION VIEW: {sliderVal}% SECURED
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================
   3. PLEATED NET PHYSICAL DEPLOYMENT SIMULATION
   ========================================== */
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
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>Slide to Deploy Mesh</h4>
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
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: '#111', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Frame Outer */}
          <rect x="10" y="10" width="330" height="220" fill="none" stroke="#333" strokeWidth="2" />
          
          {/* Track Rails */}
          <line x1="10" y1="20" x2="340" y2="20" stroke="#222" strokeWidth="4" />
          <line x1="10" y1="220" x2="340" y2="220" stroke="#222" strokeWidth="4" />
          
          {/* Pleated Mesh */}
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

          {/* Sliding Handle Bar */}
          <line 
            x1={10 + currentWidth} 
            y1="20" 
            x2={10 + currentWidth} 
            y2="220" 
            stroke="#fff" 
            strokeWidth="4" 
          />
          <circle 
            cx={10 + currentWidth} 
            cy="120" 
            r="8" 
            fill="var(--accent)" 
            stroke="#0a0a0a" 
            strokeWidth="2" 
          />
          
          {/* Technical Specs Text */}
          <text x="25" y="200" fill="#555" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="0.05em">
            TENSION GUIDE WIRE ACTIVE
          </text>
          <text x="325" y="200" textAnchor="end" fill="#555" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="0.05em">
            MESH EXPANSION: {position}%
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================
   4. CEILING PULLEY SYSTEM DELEVATION SCHEMATIC
   ========================================== */
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
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: 'auto', background: '#111', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Ceiling Mount */}
          <rect x="20" y="15" width="310" height="8" fill="#222" rx="2" />
          
          {/* Pulley Wheels */}
          <circle cx={pulleyX1} cy="30" r="10" fill="none" stroke="#444" strokeWidth="2" />
          <circle cx={pulleyX1} cy="30" r="4" fill="var(--accent)" />
          
          <circle cx={pulleyX2} cy="30" r="10" fill="none" stroke="#444" strokeWidth="2" />
          <circle cx={pulleyX2} cy="30" r="4" fill="var(--accent)" />

          {/* Wall-mounted Gear Controller */}
          <rect x={gearX - 10} y="150" width="20" height="30" fill="#222" rx="3" />
          <circle cx={gearX} cy="165" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1={gearX} y1="165" x2={gearX + 8} y2="157" stroke="var(--accent)" strokeWidth="2" />

          {/* Rope 1: controller -> pulley 2 -> pulley 1 -> Pole Left */}
          <path 
            d={`M ${gearX} 150 L ${pulleyX2} 30 L ${pulleyX1} 30 L ${pulleyX1} ${poleY}`} 
            fill="none" 
            stroke="#aaa" 
            strokeWidth="1.2" 
          />
          {/* Rope 2: controller -> pulley 2 -> Pole Right */}
          <path 
            d={`M ${gearX} 150 L ${pulleyX2} 30 L ${pulleyX2} ${poleY}`} 
            fill="none" 
            stroke="#aaa" 
            strokeWidth="1.2" 
          />

          {/* Hanging Rod (Poles) */}
          <rect x="40" y={poleY} width="220" height="8" fill="var(--accent)" rx="2" />
          <line x1="40" y1={poleY + 4} x2="260" y2={poleY + 4} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          
          {/* Hangers and Laundry Outlines */}
          {[60, 110, 160, 210].map((xOffset) => (
            <g key={xOffset} transform={`translate(${xOffset}, ${poleY + 8})`}>
              <path d="M 10 0 L 0 10 L 20 10 Z" fill="none" stroke="#555" strokeWidth="1" />
              <path d="M 0 10 L 4 40 L 16 40 L 20 10 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </g>
          ))}

          {/* Text Info */}
          <text x="320" y="195" textAnchor="end" fill="#555" fontSize="8" fontFamily="var(--font-sans)">
            MECHANICAL ADVANTAGE: 2:1
          </text>
          <text x="320" y="210" textAnchor="end" fill="#555" fontSize="8" fontFamily="var(--font-sans)">
            ELEVATION STATS: {120 - heightOffset}mm HEIGHT
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ==========================================
   5. MINIMALIST BLUEPRINT CARD PLACEHOLDERS FOR PROJECTS
   ========================================== */
function ProjectBlueprint({ type }: { type: 'tower' | 'hotel' | 'villa' }) {
  return (
    <div style={{
      width: '100%',
      height: '280px',
      background: '#111',
      position: 'relative',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="arch-grid" />
      <svg viewBox="0 0 300 200" style={{ width: '80%', height: '80%', display: 'block', zIndex: 2 }}>
        {type === 'tower' && (
          <g>
            {/* Outline of building tower */}
            <rect x="90" y="20" width="120" height="170" fill="none" stroke="rgba(197,168,128,0.2)" strokeWidth="1" />
            <rect x="90" y="20" width="120" height="170" fill="none" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Balcony segments */}
            {[40, 65, 90, 115, 140, 165].map((y) => (
              <g key={y}>
                <line x1="80" y1={y} x2="220" y2={y} stroke="var(--accent)" strokeWidth="1" />
                <rect x="95" y={y - 12} width="110" height="12" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                {/* Thin wires representing invisible grills */}
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
            {/* Mountain peak lines */}
            <path d="M 20 180 L 100 80 L 160 140 L 240 60 L 290 130" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* Hillside Cascading Hotel Frame */}
            <path d="M 120 140 L 220 140 L 220 180 L 120 180 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 140 100 L 240 100 L 240 140 L 140 140 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 160 60 L 260 60 L 260 100 L 160 100 Z" fill="none" stroke="var(--accent)" strokeWidth="1" />
            
            {/* Large glazing lines */}
            <line x1="170" y1="70" x2="170" y2="90" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="250" y1="70" x2="250" y2="90" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="150" y1="110" x2="150" y2="130" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="1 1" />
            
            <text x="200" y="125" fill="rgba(197,168,128,0.4)" fontSize="8" letterSpacing="0.2em" textAnchor="middle" fontFamily="var(--font-sans)">ELEVATION BLUEPRINT</text>
          </g>
        )}

        {type === 'villa' && (
          <g>
            {/* Isometric box villa segments */}
            {/* Base block */}
            <path d="M 60 140 L 150 100 L 240 140 L 150 180 Z" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="60" y1="140" x2="60" y2="180" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="150" y1="180" x2="150" y2="220" stroke="var(--accent)" strokeWidth="0.8" />
            <line x1="240" y1="140" x2="240" y2="180" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M 60 180 L 150 220 L 240 180" fill="none" stroke="var(--accent)" strokeWidth="0.8" />

            {/* Top offset block */}
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

/* ==========================================
   6. MAIN HOMEPAGE COMPONENT
   ========================================== */
export default function Home() {
  const [activeArea, setActiveArea] = useState<ServiceArea | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    product: '',
    details: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location || !formData.product) {
      setErrorMessage('Please fill in all required fields.');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          phone: '',
          location: '',
          product: '',
          details: '',
        });
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to submit. Please check your internet connection.');
      setFormStatus('error');
    }
  };

  // Helper to generate WhatsApp link
  const getWhatsAppLink = (productText: string) => {
    const baseMsg = `Hi Yuval Enterprise,\nI am interested in ${productText} and would like a quotation.`;
    return `https://wa.me/919832065123?text=${encodeURIComponent(baseMsg)}`;
  };

  return (
    <div id="home" style={{ position: 'relative' }}>
      
      {/* Dynamic Background Light (Ambient Glows) */}
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
            <Link href="#products" className="btn btn-primary">
              Explore Products
            </Link>
            <Link href="#contact" className="btn btn-secondary">
              Get Free Quote
            </Link>
            <a href={getWhatsAppLink('your products')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.503 4.94 1.505 5.548 0 10.064-4.512 10.068-10.066.002-2.69-1.043-5.22-2.943-7.122C16.75 1.57 14.225.524 11.535.524c-5.551 0-10.069 4.513-10.073 10.067-.001 1.912.499 3.778 1.448 5.405L1.87 20.48l4.777-1.326zM17.56 14.73c-.26-.13-1.534-.76-1.77-.845-.235-.085-.407-.13-.578.13-.17.26-.66.845-.806 1.012-.147.17-.294.19-.553.06-2.887-1.444-4.55-2.88-5.3-4.172-.2-.34.2-.315.572-1.055.06-.115.03-.22-.015-.31-.045-.09-.407-1.01-.558-1.38-.147-.35-.294-.3-.407-.305-.106-.005-.228-.005-.35-.005-.122 0-.32.045-.488.225-.168.18-.642.63-.642 1.54 0 .907.66 1.785.75 1.91.09.125 1.294 1.97 3.137 2.76.438.19.78.3 1.047.385.44.14.84.12 1.157.073.354-.05 1.533-.625 1.75-1.23.217-.61.217-1.135.152-1.24-.065-.105-.235-.165-.495-.295z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS SECTION (Immersive Vector blueprints) */}
      <section id="products" className="section" style={{ padding: 0, position: 'relative', zIndex: 5 }}>
        
        {/* Product 1: uPVC */}
        <div id="upvc" className="product-viewport" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '6rem 0',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', zIndex: 2 }}>
            <div>
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>uPVC Windows & Doors</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Built for Light.<br />Engineered for Living.
              </h2>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.7' }}>
                Experience German-engineered precision with high-performance uPVC profile systems. Providing advanced thermal insulation to keep high-altitude Sikkim cold outside, superior sound dampening, and elegant minimalist aesthetics that maximize natural day-lighting in your home.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={getWhatsAppLink('uPVC Windows & Doors')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
                  Get Quote on WhatsApp
                </a>
                <Link href="#contact" className="btn btn-secondary">
                  Request Details
                </Link>
              </div>
            </div>
            <div className="product-image-container" style={{ height: '450px' }}>
              <UPvcDiagram />
            </div>
          </div>
        </div>

        {/* Product 2: Invisible Grills */}
        <div id="grill" className="product-viewport" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '6rem 0',
          backgroundColor: '#0d0d0d',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', zIndex: 2 }}>
            <div className="product-image-container order-mobile-2" style={{ height: '450px' }}>
              <InvisibleGrillDiagram />
            </div>
            <div className="order-mobile-1">
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Invisible Grills</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Protection You<br />Barely Notice.
              </h2>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.7' }}>
                Secure your high-rise balconies and windows without compromising the beautiful views of Siliguri or the hills. Crafted from marine-grade 316 stainless steel tensile cables sheathed in heavy-duty nylon, these grills offer uncompromising safety for children and pets while remaining virtually invisible from a distance.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={getWhatsAppLink('Invisible Grills')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
                  Get Quote on WhatsApp
                </a>
                <Link href="#contact" className="btn btn-secondary">
                  Request Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product 3: Pleated Mosquito Nets */}
        <div id="net" className="product-viewport" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '6rem 0',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', zIndex: 2 }}>
            <div>
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Pleated Mosquito Nets</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Fresh Air Without<br />Compromise.
              </h2>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.7' }}>
                Enjoy the fresh mountain breeze of Sikkim or the cool evening air of North Bengal completely bug-free. Our high-grade architectural-style pleated mosquito nets slide effortlessly, folding away neatly into ultra-slim frames when not in use. Highly durable polyester mesh designed to resist dust and strong wind currents.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={getWhatsAppLink('Pleated Mosquito Nets')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
                  Get Quote on WhatsApp
                </a>
                <Link href="#contact" className="btn btn-secondary">
                  Request Details
                </Link>
              </div>
            </div>
            <div className="product-image-container" style={{ height: '450px' }}>
              <PleatedNetDiagram />
            </div>
          </div>
        </div>

        {/* Product 4: Ceiling Cloth Hangers */}
        <div id="hanger" className="product-viewport" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '6rem 0',
          backgroundColor: '#0d0d0d',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', zIndex: 2 }}>
            <div className="product-image-container order-mobile-2" style={{ height: '450px' }}>
              <CeilingHangerDiagram />
            </div>
            <div className="order-mobile-1">
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Ceiling Cloth Hangers</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Utility Made Beautiful.
              </h2>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.7' }}>
                Reclaim your luxury balcony space. Our ceiling-mounted, manual pulley-operated double-pole drying hangers are designed to elevate clothes dry-line to the ceiling, keeping laundry completely out of sight and maximizing functional floor area. Crafted from premium high-grade steel and aluminum for heavy-load operations.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={getWhatsAppLink('Ceiling Cloth Hangers')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
                  Get Quote on WhatsApp
                </a>
                <Link href="#contact" className="btn btn-secondary">
                  Request Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS SECTION (Technical Blueprint Showcase) */}
      <section id="projects" className="section" style={{ backgroundColor: '#0a0a0a', position: 'relative', zIndex: 5 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Recent Showcases</span>
            <h2 style={{ fontSize: 'calc(2rem + 0.5vw)', fontWeight: 400, marginTop: '1rem' }}>Architectural Portfolio</h2>
            <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: '#888' }}>
              Explore how we integrate premium security, utility, and modern design systems into residential and commercial spaces.
            </p>
          </div>

          <div className="projects-grid">
            {/* Project 1 */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <ProjectBlueprint type="tower" />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Siliguri</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Luxury Penthouse Apartment</h3>
                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                  Full-bleed uPVC sliding glass doors integrated with ultra-thin vertical invisible safety grills on a 14th-floor balcony.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge">uPVC Doors</span>
                  <span className="badge">Invisible Grills</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <ProjectBlueprint type="hotel" />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gangtok</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Himalayan Boutique Resort</h3>
                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                  Custom charcoal casement window systems engineered to withstand mountain storm pressures while offering panoramic views.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge">Custom Windows</span>
                  <span className="badge">Hotel Scale</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <ProjectBlueprint type="villa" />
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>North Bengal</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-sans)', color: '#fff' }}>Modern Tea Estate Villa</h3>
                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                  A comprehensive installation combining pleated mosquito nets, security sliding gates, and heavy-duty ceiling drying racks.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge">Mosquito Nets</span>
                  <span className="badge">Ceiling Hangers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE AREAS SECTION (Interactive SVG Map) */}
      <section id="services" className="section" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid var(--border-light)', position: 'relative', zIndex: 5 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Operational Scope</span>
            <h2 style={{ fontSize: 'calc(2rem + 0.5vw)', fontWeight: 400, marginTop: '1rem' }}>Regional Service Areas</h2>
            <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: '#888' }}>
              We deploy full installation and service teams across North Bengal and Sikkim. Click or hover on a location pin to view details.
            </p>
          </div>

          <div className="map-grid">
            {/* Interactive Vector Map */}
            <div style={{
              position: 'relative',
              backgroundColor: '#121212',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '2rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Map Title and Grid */}
              <div style={{ position: 'absolute', top: '1rem', left: '1.5rem', zIndex: 5 }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#444' }}>Interactive Network Map</span>
              </div>
              
              {/* High-fidelity architectural vector graphic map */}
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c5a880" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#c5a880" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                
                {/* Background decorative grid */}
                <path d="M 0 10 L 100 10 M 0 30 L 100 30 M 0 50 L 100 50 M 0 70 L 100 70 M 0 90 L 100 90 M 10 0 L 10 100 M 30 0 L 30 100 M 50 0 L 50 100 M 70 0 L 70 100 M 90 0 L 90 100" stroke="rgba(255,255,255,0.02)" strokeWidth="0.2"/>
                
                {/* Himalayan Mountains Abstract Outline */}
                <path d="M 10 40 L 25 20 L 40 35 L 55 10 L 70 30 L 85 15 L 95 35" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Region Boundary */}
                <path d="M 25 15 Q 50 5 75 15 T 90 45 T 75 85 T 45 95 T 15 75 T 25 15 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="2 2"/>
                
                {/* Service Area Connections */}
                <line x1="45" y1="65" x2="50" y2="25" stroke="rgba(197, 168, 128, 0.15)" strokeWidth="0.4" strokeDasharray="1 1"/>
                <line x1="45" y1="65" x2="30" y2="45" stroke="rgba(197, 168, 128, 0.15)" strokeWidth="0.4" strokeDasharray="1 1"/>
                <line x1="45" y1="65" x2="70" y2="70" stroke="rgba(197, 168, 128, 0.15)" strokeWidth="0.4" strokeDasharray="1 1"/>

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
                      {/* Outer Glow Ring on Hover */}
                      <circle 
                        cx={area.coords.x} 
                        cy={area.coords.y} 
                        r={isHovered ? 8 : 4} 
                        fill="url(#glow)" 
                        style={{ transition: 'r 0.3s ease' }}
                      />
                      {/* Inner Pin Dot */}
                      <circle 
                        cx={area.coords.x} 
                        cy={area.coords.y} 
                        r={isHovered ? 2 : 1.2} 
                        fill={isHovered ? '#fff' : '#c5a880'} 
                        stroke="#0a0a0a"
                        strokeWidth="0.4"
                        style={{ transition: 'fill 0.3s, r 0.3s' }}
                      />
                      {/* Large invisible circle for touch target on mobile */}
                      <circle 
                        cx={area.coords.x} 
                        cy={area.coords.y} 
                        r={12} 
                        fill="transparent"
                      />
                      {/* Text Label */}
                      <text 
                        x={area.coords.x} 
                        y={area.coords.y - 3} 
                        textAnchor="middle" 
                        fill={isHovered ? '#fff' : '#666'} 
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

            {/* Service Area Info Card */}
            <div>
              {activeArea ? (
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 500 }}>Operational Hub</span>
                  <h3 style={{ fontSize: '2rem', fontWeight: 400, marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)' }}>{activeArea.name}</h3>
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#ccc', marginBottom: '2rem' }}>
                    {activeArea.description}
                  </p>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Popular Installations:</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {activeArea.specialties.map((spec, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#888', fontSize: '0.95rem' }}>
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
                  <p style={{ fontSize: '0.85rem', color: '#666', maxWidth: '300px', margin: '0 auto' }}>
                    Hover over or click on the glowing pins on the interactive map to explore our localized capabilities and specialties.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEAD FORM SECTION */}
      <section id="contact" className="section" style={{ backgroundColor: '#0a0a0a', position: 'relative', zIndex: 5 }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Consultation</span>
            <h2 style={{ fontSize: 'calc(2rem + 0.5vw)', fontWeight: 400, marginTop: '1rem' }}>Get Free Consultation</h2>
            <p style={{ color: '#888', marginTop: '1rem' }}>
              Fill in the form below. Our architectural solutions team will review your requirements and contact you with a quotation.
            </p>
          </div>

          <div className="glass-panel form-panel">
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  color: '#25d366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem auto',
                  border: '1px solid rgba(37, 211, 102, 0.2)'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Consultation Requested</h3>
                <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  Thank you! Your request has been successfully captured in our system. Our specialists will review your details and reach out to you shortly.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                  <button onClick={() => setFormStatus('idle')} className="btn btn-secondary">
                    Submit Another Request
                  </button>
                  <a href={getWhatsAppLink('consultation')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
                    Follow up on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {formStatus === 'error' && (
                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginBottom: '2rem',
                    fontSize: '0.9rem',
                    fontWeight: 300
                  }}>
                    {errorMessage}
                  </div>
                )}

                <div className="input-group">
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder=" " 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <label htmlFor="name" className="input-label">Full Name *</label>
                </div>

                <div className="input-group">
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    placeholder=" " 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <label htmlFor="phone" className="input-label">Phone Number *</label>
                </div>

                <div className="input-group">
                  <select 
                    name="location" 
                    id="location" 
                    required 
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field select-field"
                    style={{ color: formData.location ? '#fff' : '#666' }}
                  >
                    <option value="" disabled hidden></option>
                    <option value="Siliguri">Siliguri</option>
                    <option value="Gangtok">Gangtok / Sikkim</option>
                    <option value="North Bengal Hills">North Bengal (Darjeeling / Kalimpong / Kurseong)</option>
                    <option value="Dooars">Dooars Region</option>
                  </select>
                  <label htmlFor="location" className="input-label">Location / Site Project *</label>
                </div>

                <div className="input-group">
                  <select 
                    name="product" 
                    id="product" 
                    required 
                    value={formData.product}
                    onChange={handleChange}
                    className="input-field select-field"
                    style={{ color: formData.product ? '#fff' : '#666' }}
                  >
                    <option value="" disabled hidden></option>
                    <option value="uPVC Windows & Doors">uPVC Windows & Doors</option>
                    <option value="Invisible Grills">Invisible Grills</option>
                    <option value="Pleated Mosquito Nets">Pleated Mosquito Nets</option>
                    <option value="Ceiling Cloth Hangers">Ceiling Cloth Hangers</option>
                    <option value="Multiple Products / Complete Utility">Multiple Solutions / Full Package</option>
                  </select>
                  <label htmlFor="product" className="input-label">Product Interested In *</label>
                </div>

                <div className="input-group">
                  <textarea 
                    name="details" 
                    id="details" 
                    placeholder=" " 
                    value={formData.details}
                    onChange={handleChange}
                    className="input-field"
                    rows={4}
                    style={{ resize: 'vertical', minHeight: '100px' }}
                  />
                  <label htmlFor="details" className="input-label">Project Details (Optional)</label>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {formStatus === 'submitting' ? 'Submitting Request...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CSS for adjustments */}
      <style jsx>{`
        .product-viewport {
          scroll-margin-top: 5rem;
        }
        .badge {
          font-size: 0.7rem;
          color: #888;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        @media (max-width: 768px) {
          .order-mobile-1 {
            order: 1 !important;
          }
          .order-mobile-2 {
            order: 2 !important;
          }
          .product-viewport {
            min-height: auto !important;
          }
          .product-image-container {
            height: auto !important;
            min-height: 350px !important;
          }
        }
      `}</style>
    </div>
  );
}

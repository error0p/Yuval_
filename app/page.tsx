'use client';

import { useState } from 'react';
import Image from 'next/image';
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

export default function Home() {
  // Map Hover State
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
    <div id="home">
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/hero-luxury.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.85) 100%)',
          zIndex: 1
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
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

      {/* 2. PRODUCTS SECTION (Apple-Style Immersive Showroom) */}
      <section id="products" className="section" style={{ padding: 0 }}>
        
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
            <div className="product-image-container" style={{ position: 'relative', height: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <Image 
                src="/product-upvc.png" 
                alt="uPVC Windows & Doors" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
                priority
              />
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
            <div className="product-image-container order-mobile-2" style={{ position: 'relative', height: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <Image 
                src="/product-grill.png" 
                alt="Invisible Grills" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
              />
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
            <div className="product-image-container" style={{ position: 'relative', height: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <Image 
                src="/product-net.png" 
                alt="Pleated Mosquito Nets" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
              />
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
            <div className="product-image-container order-mobile-2" style={{ position: 'relative', height: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <Image 
                src="/product-hanger.png" 
                alt="Ceiling Cloth Hangers" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }} 
              />
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

      {/* 3. PROJECTS SECTION (Architectural Showcase) */}
      <section id="projects" className="section" style={{ backgroundColor: '#0a0a0a' }}>
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
              <div style={{ position: 'relative', height: '280px' }}>
                <Image 
                  src="/project-apartment.png" 
                  alt="Luxury Apartment Siliguri" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="project-img"
                />
              </div>
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
              <div style={{ position: 'relative', height: '280px' }}>
                <Image 
                  src="/project-hotel.png" 
                  alt="Hotel Project Gangtok" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="project-img"
                />
              </div>
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
              <div style={{ position: 'relative', height: '280px' }}>
                <Image 
                  src="/project-villa.png" 
                  alt="Villa Project North Bengal" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="project-img"
                />
              </div>
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
      <section id="services" className="section" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid var(--border-light)' }}>
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
                
                {/* Himalayan Mountains Abstract Outline (Sikkim Area) */}
                <path d="M 10 40 L 25 20 L 40 35 L 55 10 L 70 30 L 85 15 L 95 35" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Region Boundary (Abstract) */}
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
      <section id="contact" className="section" style={{ backgroundColor: '#0a0a0a' }}>
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

      {/* CSS for order adjustments on mobile */}
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
        .glass-card:hover .project-img {
          transform: scale(1.05);
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
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}

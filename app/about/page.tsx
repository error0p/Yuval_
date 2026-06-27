'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '8rem 0 5rem', color: '#fff', position: 'relative' }}>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
            Who We Are
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Crafting Premium Home Solutions.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.7', fontWeight: 300 }}>
            Yuval Enterprise is a leading home utility and security installation company serving North Bengal and Sikkim. We believe that modern homes deserve solutions that combine meticulous engineering, visual minimalism, and uncompromising functionality.
          </p>
        </div>

        {/* Brand Positioning Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '1.8rem', color: 'var(--accent)', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '1rem' }}>01</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', fontFamily: 'var(--font-sans)', color: '#fff' }}>Not Fabricators. Solutions.</h3>
            <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: '1.6', fontWeight: 300 }}>
              Most local options function as simple contractors or material fabricators. At Yuval Enterprise, we position ourselves as design partners who understand modern architecture and premium living spaces.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '1.8rem', color: 'var(--accent)', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '1rem' }}>02</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', fontFamily: 'var(--font-sans)', color: '#fff' }}>Uncompromising Quality</h3>
            <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: '1.6', fontWeight: 300 }}>
              From marine-grade SS 316 invisible cables to heavy-duty UV-stabilized uPVC window profiles, we source only the finest raw materials to ensure durability in challenging climates.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '1.8rem', color: 'var(--accent)', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '1rem' }}>03</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', fontFamily: 'var(--font-sans)', color: '#fff' }}>Precision Installation</h3>
            <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: '1.6', fontWeight: 300 }}>
              The best products are only as good as their installation. Our teams are strictly trained in concrete slab anchoring, structural leveling, and sealing mechanics.
            </p>
          </div>
        </div>

        {/* Philosophy Block */}
        <div className="glass-panel" style={{ padding: '3.5rem', marginBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
          <div className="arch-grid" />
          <div style={{ position: 'relative', zIndex: 5, maxWidth: '700px' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Our Vision Statement</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', lineHeight: '1.3' }}>
              "We are not selling windows, grills, and nets. We are selling better views, safer homes, cleaner living, and premium lifestyles."
            </h3>
            <p style={{ color: '#aaa', fontSize: '0.95rem', fontWeight: 300 }}>
              Every installation we perform is designed to fade into the background—allowing natural light to enter, keeping insects out, securing balconies invisibly, and lifting utility lines out of sight. That is utility made beautiful.
            </p>
          </div>
        </div>

        {/* Core Capabilities List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>Our Target Sectors</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#888', fontSize: '0.95rem' }}>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <strong style={{ color: '#fff', minWidth: '110px' }}>Residential:</strong>
                <span>Luxury penthouses, villas, apartment complexes, renovation projects, and designer collaborations.</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <strong style={{ color: '#fff', minWidth: '110px' }}>Commercial:</strong>
                <span>Boutique hotels, hillside resorts, commercial offices, builder projects, and real estate developments.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>Service Philosophy</h3>
            <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', fontWeight: 300 }}>
              We manage the entire lifecycle of your home utility installations: initial consultations, site measurements, custom fabrication drawings, and full-slab mechanical anchoring.
            </p>
            <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 300 }}>
              Serving operational bases in **Siliguri** and **Gangtok** to deploy installation engineers to even the most remote projects in Sikkim and Dooars.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Ready to enhance your space?</h3>
          <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Book a site survey and consultation with our design specialist.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Book Site Survey
            </Link>
            <Link href="/projects" className="btn btn-secondary">
              Explore Our Work
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

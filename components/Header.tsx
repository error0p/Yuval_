'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <Link href="/" className="logo">
          YUVAL
          <span>Enterprise</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            <li><Link href="#home" className="nav-link">Home</Link></li>
            <li><Link href="#products" className="nav-link">Products</Link></li>
            <li><Link href="#projects" className="nav-link">Projects</Link></li>
            <li><Link href="#services" className="nav-link">Service Areas</Link></li>
            <li><Link href="#contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="#contact" className="btn btn-primary desktop-only" style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Get Quote
          </Link>
          <button 
            className="menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <Link href="#home" className="nav-link" style={{ fontSize: '1.4rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="#products" className="nav-link" style={{ fontSize: '1.4rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link href="#projects" className="nav-link" style={{ fontSize: '1.4rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="#services" className="nav-link" style={{ fontSize: '1.4rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Service Areas</Link>
          <Link href="#contact" className="nav-link" style={{ fontSize: '1.4rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="#contact" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setMobileMenuOpen(false)}>Get Free Quote</Link>
        </div>
      )}

      {/* Inline styles for header responsive elements */}
      <style jsx global>{`
        .desktop-only {
          display: inline-flex;
        }
        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }
          .menu-toggle {
            display: block !important;
            z-index: 1000;
          }
          .desktop-nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

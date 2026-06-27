'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <Link href="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          YUVAL
          <span>Enterprise</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            <li><Link href="/" className="nav-link">Home</Link></li>
            
            {/* Products Dropdown */}
            <li 
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              style={{ position: 'relative' }}
            >
              <span className="nav-link" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Products
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '6px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  minWidth: '220px',
                  zIndex: 2000,
                  boxShadow: 'var(--shadow-md)',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <Link href="/products/upvc" className="dropdown-item">uPVC Windows & Doors</Link>
                  <Link href="/products/invisible-grills" className="dropdown-item">Invisible Grills</Link>
                  <Link href="/products/pleated-nets" className="dropdown-item">Pleated Mosquito Nets</Link>
                  <Link href="/products/ceiling-hangers" className="dropdown-item">Ceiling Cloth Hangers</Link>
                </div>
              )}
            </li>

            <li><Link href="/projects" className="nav-link">Projects</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/service-areas" className="nav-link">Service Areas</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/contact" className="btn btn-primary desktop-only" style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem', borderRadius: '4px' }}>
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
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.8rem',
          padding: '2rem'
        }}>
          <Link href="/" className="nav-link" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '0.8rem 0', width: '100%' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666' }}>Products</span>
            <Link href="/products/upvc" className="nav-link" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(false)}>uPVC Windows & Doors</Link>
            <Link href="/products/invisible-grills" className="nav-link" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(false)}>Invisible Grills</Link>
            <Link href="/products/pleated-nets" className="nav-link" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(false)}>Pleated Mosquito Nets</Link>
            <Link href="/products/ceiling-hangers" className="nav-link" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(false)}>Ceiling Cloth Hangers</Link>
          </div>

          <Link href="/projects" className="nav-link" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="/about" className="nav-link" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/service-areas" className="nav-link" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Service Areas</Link>
          <Link href="/contact" className="nav-link" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '0.5rem' }} onClick={() => setMobileMenuOpen(false)}>Get Free Quote</Link>
        </div>
      )}

      <style jsx global>{`
        .desktop-only {
          display: inline-flex;
        }
        .dropdown-item {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: var(--transition-fast);
          padding: 0.4rem 0.6rem;
          border-radius: 4px;
        }
        .dropdown-item:hover {
          color: var(--accent);
          background: rgba(0, 0, 0, 0.03);
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

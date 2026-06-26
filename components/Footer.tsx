import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '5rem 0 2rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '4rem',
        marginBottom: '4rem'
      }}>
        <div>
          <Link href="/" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            YUVAL
            <span>Enterprise</span>
          </Link>
          <p style={{ fontSize: '0.9rem', color: '#888', fontWeight: 300, maxWidth: '300px' }}>
            Enhancing modern living through design, safety, and premium home utility and security installations.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Products</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link href="#upvc" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem', transition: '0.2s' }} className="footer-link">uPVC Windows & Doors</Link></li>
            <li><Link href="#grill" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem', transition: '0.2s' }} className="footer-link">Invisible Grills</Link></li>
            <li><Link href="#net" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem', transition: '0.2s' }} className="footer-link">Pleated Mosquito Nets</Link></li>
            <li><Link href="#hanger" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem', transition: '0.2s' }} className="footer-link">Ceiling Cloth Hangers</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Service Areas</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#888', fontSize: '0.9rem', fontWeight: 300 }}>
            <li>Siliguri</li>
            <li>Gangtok (Sikkim)</li>
            <li>North Bengal</li>
            <li>Dooars</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#888', fontSize: '0.9rem' }}>
            <li>
              <a href="tel:+919832065123" style={{ color: '#888', textDecoration: 'none', transition: '0.2s' }} className="footer-link">
                +91 98320 65123
              </a>
            </li>
            <li>
              <a href="mailto:info@yuvalenterprise.com" style={{ color: '#888', textDecoration: 'none', transition: '0.2s' }} className="footer-link">
                info@yuvalenterprise.com
              </a>
            </li>
            <li style={{ lineHeight: '1.4', fontWeight: 300 }}>
              Siliguri & Gangtok
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <p style={{ fontSize: '0.8rem', color: '#555' }}>
          &copy; {new Date().getFullYear()} Yuval Enterprise. All rights reserved.
        </p>
        <Link href="/secure-admin" style={{
          fontSize: '0.75rem',
          color: '#333',
          textDecoration: 'none',
          transition: '0.2s',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }} className="admin-link">
          Admin Portal
        </Link>
      </div>

    </footer>
  );
}

'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    product: '',
    details: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const getWhatsAppLink = () => {
    const baseMsg = "Hi Yuval Enterprise,\nI am interested in your products and would like a quotation.";
    return `https://wa.me/919832065123?text=${encodeURIComponent(baseMsg)}`;
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '8rem 0 5rem', color: '#fff', position: 'relative' }}>
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>
            Get In Touch
          </span>
          <h1 style={{ fontSize: 'calc(2.5rem + 1vw)', fontWeight: 400, marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Free Sizing & Consultation.
          </h1>
          <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6', fontWeight: 300 }}>
            Schedule a site survey or request quotations. Fill out the blueprint form below and our architectural team will reach out shortly.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Info Card */}
          <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div className="arch-grid" />
            
            <div style={{ position: 'relative', zIndex: 5 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
                Direct Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', display: 'block', marginBottom: '0.4rem' }}>WhatsApp Chat</span>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="phone-link">
                    +91 98320 65123
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', display: 'block', marginBottom: '0.4rem' }}>Call Operations</span>
                  <a href="tel:+919832065123" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }} className="phone-link">
                    +91 98320 65123
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', display: 'block', marginBottom: '0.4rem' }}>Email Support</span>
                  <a href="mailto:info@yuvalenterprise.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }} className="phone-link">
                    info@yuvalenterprise.com
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', display: 'block', marginBottom: '0.4rem' }}>Office Locations</span>
                  <p style={{ color: '#ccc', fontSize: '0.95rem', fontWeight: 300, lineHeight: '1.5' }}>
                    Siliguri & Gangtok Hubs<br />
                    West Bengal & Sikkim, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
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
                  Thank you! Your request has been successfully captured. Our specialists will review your details and reach out to you shortly.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setFormStatus('idle')} className="btn btn-secondary">
                    Submit Another Request
                  </button>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ gap: '0.5rem' }}>
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

      </div>
    </div>
  );
}

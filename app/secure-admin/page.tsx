'use client';

import { useState, useEffect } from 'react';
import { Lead } from '../../lib/db';

export default function SecureAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Check Auth Status on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchLeads();
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to verify auth session:', err);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch Leads from API
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    
    setLoginError('');
    setLoginSubmitting(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setLoginError(data.error || 'Invalid passcode. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Failed to authenticate. Server may be offline.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  // 4. Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      if (res.ok) {
        setIsAuthenticated(false);
        setLeads([]);
        setPasscode('');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // 5. Update Lead Status
  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state dynamically
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
        // If modal is open, update selected lead details
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // 6. Delete Lead Inquiry
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead inquiry?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // 7. Format Date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString;
    }
  };

  // 8. Filters and Search Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.product.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: leads.length,
    newLeads: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    inProgress: leads.filter(l => l.status === 'In Progress').length,
    completed: leads.filter(l => l.status === 'Completed').length,
  };

  // Loading State
  if (isAuthenticated === null) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // PASSCODE AUTH GATE SCREEN
  if (!isAuthenticated) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
        padding: '1.5rem'
      }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>
              YUVAL ADMIN
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Secure Database Portal
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {loginError && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                padding: '0.8rem',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                fontWeight: 300
              }}>
                {loginError}
              </div>
            )}

            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <input 
                type="password" 
                name="passcode" 
                id="passcode" 
                placeholder=" "
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="input-field"
                style={{ letterSpacing: '0.3em' }}
              />
              <label htmlFor="passcode" className="input-label" style={{ letterSpacing: 'normal' }}>Passcode</label>
            </div>

            <button 
              type="submit" 
              disabled={loginSubmitting}
              className="btn btn-primary" 
              style={{ width: '100%' }}
            >
              {loginSubmitting ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD INTERFACE
  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      padding: '7rem 2rem 5rem',
      color: 'var(--text-primary)'
    }}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '2rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 400, fontFamily: 'var(--font-serif)' }}>Leads Management</h1>
            <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.4rem' }}>
              Real-time customer inquiries, consultation requests, and installation leads.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={fetchLeads} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }} disabled={loading}>
              Refresh
            </button>
            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', backgroundColor: '#ef4444', borderColor: '#ef4444', color: '#fff' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div className="stat-card">
            <span className="stat-title">Total Inquiries</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card" style={{ borderLeft: '3px solid #25d366' }}>
            <span className="stat-title">New Requests</span>
            <span className="stat-value" style={{ color: '#25d366' }}>{stats.newLeads}</span>
          </div>
          <div className="stat-card" style={{ borderLeft: '3px solid #eab308' }}>
            <span className="stat-title">Contacted</span>
            <span className="stat-value" style={{ color: '#eab308' }}>{stats.contacted}</span>
          </div>
          <div className="stat-card" style={{ borderLeft: '3px solid #3b82f6' }}>
            <span className="stat-title">In Progress</span>
            <span className="stat-value" style={{ color: '#3b82f6' }}>{stats.inProgress}</span>
          </div>
          <div className="stat-card" style={{ borderLeft: '3px solid #6b7280' }}>
            <span className="stat-title">Completed</span>
            <span className="stat-value" style={{ color: '#a3a3a3' }}>{stats.completed}</span>
          </div>
        </div>

        {/* Filters and Search Control Panel */}
        <div className="glass-panel" style={{
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search leads by name, phone, location, product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ padding: '0.8rem 1rem', fontSize: '0.9rem', marginBottom: 0 }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#888' }}>Status Filter:</span>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field select-field"
              style={{ padding: '0.8rem 2.5rem 0.8rem 1rem', fontSize: '0.9rem', width: '180px', marginBottom: 0, backgroundPosition: 'right 0.8rem center' }}
            >
              <option value="All">All Leads</option>
              <option value="New">🟢 New</option>
              <option value="Contacted">🟡 Contacted</option>
              <option value="In Progress">🔵 In Progress</option>
              <option value="Completed">⚫ Completed</option>
              <option value="Archived">⚪ Archived</option>
            </select>
          </div>
        </div>

        {/* Leads Data Table */}
        <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '12px' }}>
          {loading ? (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <div className="spinner" style={{ margin: '0 auto' }}></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: '4rem 0', textAlign: 'center', color: '#666' }}>
              No inquiries found matching your filters.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Name</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Phone</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Location</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Product</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Date Submitted</th>
                  <th style={{ padding: '1.2rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="table-row" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)' }}>
                    <td style={{ padding: '1.2rem 1.5rem', fontWeight: 500, color: '#fff' }}>{lead.name}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <a href={`tel:${lead.phone}`} style={{ color: '#888', textDecoration: 'none', transition: '0.2s' }} className="phone-link">
                        {lead.phone}
                      </a>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: '#ccc' }}>{lead.location}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span className="badge" style={{ borderColor: 'rgba(197, 168, 128, 0.15)', color: 'var(--accent)' }}>
                        {lead.product.split(' ')[0]} {/* Shorten name for space */}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: '#666', fontSize: '0.85rem' }}>{formatDate(lead.createdAt)}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id!, e.target.value as Lead['status'])}
                        className="status-selector"
                        style={{
                          backgroundColor: 
                            lead.status === 'New' ? 'rgba(37, 211, 102, 0.1)' :
                            lead.status === 'Contacted' ? 'rgba(234, 179, 8, 0.1)' :
                            lead.status === 'In Progress' ? 'rgba(59, 130, 246, 0.1)' :
                            'rgba(156, 163, 175, 0.1)',
                          color: 
                            lead.status === 'New' ? '#25d366' :
                            lead.status === 'Contacted' ? '#eab308' :
                            lead.status === 'In Progress' ? '#3b82f6' :
                            '#a3a3a3',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => setSelectedLead(lead)} 
                        className="btn btn-secondary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', textTransform: 'none', border: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* INQUIRY DETAIL MODAL */}
        {selectedLead && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '600px',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg)',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                paddingBottom: '1.2rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}>Lead Details</span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '0.3rem', fontFamily: 'var(--font-sans)' }}>{selectedLead.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', transition: '0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Lead Info Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Phone</span>
                  <a href={`tel:${selectedLead.phone}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>{selectedLead.phone}</a>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Location</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{selectedLead.location}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Product</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{selectedLead.product}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Submission Date</span>
                  <span style={{ color: '#ccc' }}>{formatDate(selectedLead.createdAt)}</span>
                </div>
              </div>

              {/* Project Message */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2.5rem',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem', fontWeight: 500 }}>Project Details / Inquiry Text</span>
                <p style={{ color: '#eee', fontSize: '0.95rem', fontWeight: 300, whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                  {selectedLead.details || 'No additional project details were provided.'}
                </p>
              </div>

              {/* Modal Footer Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '1.5rem'
              }}>
                <div>
                  <select 
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id!, e.target.value as Lead['status'])}
                    className="status-selector"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      border: '1px solid var(--border-medium)',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => handleDeleteLead(selectedLead.id!)} 
                    className="btn btn-secondary" 
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Lead'}
                  </button>
                  <button 
                    onClick={() => setSelectedLead(null)} 
                    className="btn btn-primary" 
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Embedded CSS for Admin Portal Dashboard */}
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(197, 168, 128, 0.1);
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .stat-card {
          background: rgba(26, 26, 26, 0.3);
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .stat-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #666;
          font-weight: 500;
        }
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          font-family: var(--font-sans);
        }
        .table-row {
          transition: background-color 0.2s ease;
        }
        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.01) !important;
        }
        :global(.phone-link:hover) {
          color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}

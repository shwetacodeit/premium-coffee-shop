import React, { useState } from 'react';
import { Coffee, Mail, MapPin, Phone, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export default function Footer({ onShowToast }) {
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      });
      const data = await res.json();
      if (data.success) {
        onShowToast(data.message);
        setEmailInput('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer style={{ background: '#070504', borderTop: '1px solid var(--border-gold)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #f0c75e, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0806' }}>
                <Coffee size={20} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 700 }}>AURA BLEND</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Crafting extraordinary coffee experiences with passion, ethics, and gold-standard perfection.
            </p>
            <div style={{ display: 'flex', gap: '14px', color: 'var(--gold-primary)' }}>
              <a href="#" style={socialStyle}><Instagram size={18} /></a>
              <a href="#" style={socialStyle}><Facebook size={18} /></a>
              <a href="#" style={socialStyle}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--gold-primary)' }}>
              Lounge Hours
            </h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Mon - Thu: 7:00 AM - 9:00 PM</li>
              <li>Fri - Sat: 7:00 AM - 11:00 PM</li>
              <li>Sunday: 8:00 AM - 8:00 PM</li>
              <li style={{ color: 'var(--gold-hover)', fontSize: '0.82rem', marginTop: '6px' }}>☕ Espresso Bar & Kitchen Open Daily</li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--gold-primary)' }}>
              Visit Our Bar
            </h4>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--gold-primary)', shrink: 0 }} />
                <span>452 Grand Avenue, Reserve District, NY 10012</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--gold-primary)' }} />
                <span>+1 (555) 839-2872</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--gold-primary)' }}>
              Coffee Club VIP
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>
              Subscribe for exclusive micro-lot releases and receive 15% off your first order.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(20, 16, 12, 0.8)',
                  border: '1px solid var(--border-gold)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-primary btn-icon">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', paddingTop: '24px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Aura Blend Coffee Co. All rights reserved. Handcrafted for Coffee Lovers.
        </div>
      </div>
    </footer>
  );
}

const socialStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid var(--border-gold)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--gold-primary)',
  textDecoration: 'none',
  transition: 'var(--transition)'
};

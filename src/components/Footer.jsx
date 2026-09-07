import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

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
    <footer style={{ background: '#070d0b', borderTop: '1px solid var(--slate-border)', paddingTop: '80px', paddingBottom: '40px' }}>
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
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #00a862, #006241)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f3f1e7' }}>
                <Coffee size={20} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 700 }}>STARBUCKS INDIA ★</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Crafting extraordinary Indian Arabica & Reserve coffee experiences with passion, ethics, and heritage perfection.
            </p>
            <div style={{ display: 'flex', gap: '14px', color: 'var(--sb-green-light)' }}>
              <a href="#" style={socialStyle}><Instagram size={18} /></a>
              <a href="#" style={socialStyle}><Facebook size={18} /></a>
              <a href="#" style={socialStyle}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--sb-green-light)' }}>
              Reserve Hours
            </h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Mon - Thu: 7:00 AM - 11:00 PM</li>
              <li>Fri - Sat: 7:00 AM - 12:30 AM</li>
              <li>Sunday: 8:00 AM - 11:00 PM</li>
              <li style={{ color: 'var(--sb-gold)', fontSize: '0.82rem', marginTop: '6px' }}>☕ Espresso Bar & Kitchen Open Daily</li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--sb-green-light)' }}>
              Reserve Flagships
            </h4>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--sb-green-light)', shrink: 0 }} />
                <span>100ft Road, Indiranagar, Bengaluru, KA 560038</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--sb-green-light)' }} />
                <span>+91 (080) 4920-1822</span>
              </div>
            </div>
          </div>

          {/* Starbucks India Rewards */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--sb-green-light)' }}>
              Starbucks India Rewards
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>
              Join Starbucks Rewards to unlock ₹150 instant voucher & exclusive micro-lot coffee beans.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter email for ₹150 voucher"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(19, 32, 27, 0.8)',
                  border: '1px solid var(--slate-border)',
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

        <div style={{ borderTop: '1px solid rgba(0, 168, 98, 0.15)', paddingTop: '24px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Starbucks Coffee Company (Tata Starbucks Private Limited). All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const socialStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid var(--slate-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--sb-green-light)',
  textDecoration: 'none',
  transition: 'var(--transition)'
};

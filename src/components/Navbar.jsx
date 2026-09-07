import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Calendar, Sparkles } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenReservation, onOpenQuiz }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(11, 20, 17, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0, 168, 98, 0.25)' : '1px solid transparent',
      padding: scrolled ? '14px 0' : '22px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', color: 'var(--text-main)' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00a862, #006241)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f3f1e7',
            boxShadow: '0 0 22px rgba(0, 168, 98, 0.5)'
          }}>
            <Coffee size={24} />
          </div>
          <div>
            <span className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, letterSpacing: '1px', display: 'block', lineHeight: 1 }}>
              STARBUCKS <span style={{ color: 'var(--sb-gold)' }}>★</span>
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--sb-green-light)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Reserve India & Roastery
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#menu" style={linkStyle}>Menu</a>
          <a href="#about" style={linkStyle}>Our Craft</a>
          <a href="#testimonials" style={linkStyle}>Experience</a>
          
          <button 
            onClick={onOpenQuiz} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--sb-green-light)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
            <Sparkles size={16} /> Roast Quiz
          </button>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onOpenReservation} className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            <Calendar size={16} /> Reserve Table
          </button>

          <button 
            onClick={onOpenCart}
            className="btn btn-primary"
            style={{ position: 'relative', padding: '10px 18px', fontSize: '0.85rem' }}>
            <ShoppingBag size={18} />
            <span style={{ marginLeft: '4px' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#cba258',
                color: '#0b1411',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '2px solid #0b1411'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

const linkStyle = {
  color: 'var(--text-muted)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'color 0.2s ease'
};

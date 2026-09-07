import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Calendar, Sparkles, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenReservation, onOpenQuiz }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      background: scrolled ? 'rgba(10, 8, 6, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
      padding: scrolled ? '14px 0' : '22px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text-main)' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f0c75e, #d4af37)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0a0806',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
          }}>
            <Coffee size={22} />
          </div>
          <div>
            <span className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '1px', display: 'block', lineHeight: 1 }}>
              AURA BLEND
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--gold-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Artisanal Coffee & Lounge
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <a href="#menu" style={linkStyle}>Menu</a>
          <a href="#about" style={linkStyle}>Our Craft</a>
          <a href="#testimonials" style={linkStyle}>Experience</a>
          
          <button 
            onClick={onOpenQuiz} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--gold-hover)', 
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
                background: '#e67e22',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '2px solid #0a0806'
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

import React from 'react';
import { ArrowRight, Sparkles, Award, Coffee, Star } from 'lucide-react';

export default function Hero({ onExploreMenu, onOpenQuiz }) {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: '140px',
      paddingBottom: '80px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Lighting Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230, 126, 34, 0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Column: Copy & CTAs */}
        <div>
          <div className="badge" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> Artisanal Roastery & Craft Bar
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '24px',
            color: 'var(--text-main)'
          }}>
            Every Sip, A Masterpiece of <span className="text-gold">Pure Elegance.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            marginBottom: '36px',
            maxWidth: '520px',
            lineHeight: 1.7
          }}>
            Experience single-origin micro-lots, hand-laminated golden croissants, and bespoke velvet lattes crafted by award-winning baristas.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <button onClick={onExploreMenu} className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Explore Artisanal Menu <ArrowRight size={18} />
            </button>
            <button onClick={onOpenQuiz} className="btn btn-outline" style={{ padding: '14px 28px' }}>
              <Sparkles size={18} /> Find Your Perfect Roast
            </button>
          </div>

          {/* Social Proof Stats */}
          <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid var(--border-gold)', paddingTop: '24px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-primary)' }}>4.9★</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>2,400+ Reviews</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-gold)', paddingLeft: '32px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Ethical Arabica</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-gold)', paddingLeft: '32px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight 700, color: 'var(--gold-primary)' }}>18+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Global Awards</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Glass Card */}
        <div style={{ position: 'relative' }}>
          <div className="animate-float" style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            border: '1px solid var(--border-gold-strong)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80" 
              alt="Aura Signature Coffee" 
              style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
            />
            
            {/* Overlay Glass Card Badge */}
            <div className="glass-card" style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(10, 8, 6, 0.85)'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  FEATURED SELECTION
                </div>
                <div className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px' }}>
                  Aura Velvet Gold Latte
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-serif text-gold" style={{ fontSize: '1.3rem', fontWeight: 700 }}>$6.75</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

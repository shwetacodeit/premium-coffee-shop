import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      {/* Background Starbucks Siren Lighting Glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '8%',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 168, 98, 0.2) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30, 57, 50, 0.3) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(70px)',
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
            <Sparkles size={14} /> Starbucks Reserve India Roastery
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '24px',
            color: 'var(--text-main)'
          }}>
            Handcrafted Indian Coffee, <span className="text-sb">Pure Reserve Luxury.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            marginBottom: '36px',
            maxWidth: '520px',
            lineHeight: 1.7
          }}>
            Discover Chikmagalur single-origin Arabica, Kashmiri saffron cardamoms, and artisanal South Indian Filter Kaapi extracted to perfection.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <button onClick={onExploreMenu} className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Explore Reserve Menu <ArrowRight size={18} />
            </button>
            <button onClick={onOpenQuiz} className="btn btn-outline" style={{ padding: '14px 28px' }}>
              <Sparkles size={18} /> Find Your Perfect Roast
            </button>
          </div>

          {/* Social Proof Stats */}
          <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid var(--slate-border)', paddingTop: '24px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--sb-green-light)' }}>4.95★</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>4,800+ Reviews</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--slate-border)', paddingLeft: '32px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Indian Arabica</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--slate-border)', paddingLeft: '32px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--sb-gold)' }}>₹150 Off</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>First Rewards Order</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Glass Card */}
        <div style={{ position: 'relative' }}>
          <div className="animate-float" style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
            border: '1px solid var(--slate-border-strong)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80" 
              alt="Starbucks Royal Saffron Latte" 
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
              background: 'rgba(11, 20, 17, 0.9)'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-green-light)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  STARBUCKS RESERVE SPECIAL
                </div>
                <div className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px' }}>
                  Royal Saffron Cardamom Latte
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-serif text-sb" style={{ fontSize: '1.4rem', fontWeight: 700 }}>₹345</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

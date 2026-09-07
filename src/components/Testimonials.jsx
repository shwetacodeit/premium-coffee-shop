import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Sophia Laurent',
    role: 'Food & Wine Critic',
    rating: 5,
    text: 'Aura Blend elevates coffee to an art form. The Velvet Latte with 24k gold dust is unlike anything I’ve tasted in Paris or Milan.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Architect & Coffee Collector',
    rating: 5,
    text: 'The Ethiopian Geisha pour-over blew me away. The jasmine and bergamot notes are incredibly distinct. Unrivaled ambience!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Michelin Star Chef',
    rating: 5,
    text: 'Their French butter croissants with black truffle honey pair exquisitely with the Pistachio Cloud Espresso. Truly world class.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #0a0806 0%, #14100c 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
          <div className="badge" style={{ marginBottom: '14px' }}>Guest Reviews</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
            Loved by Connoisseurs & <span className="text-gold">Critics Alike</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {REVIEWS.map(r => (
            <div key={r.id} className="glass-card" style={{ padding: '30px', position: 'relative' }}>
              <Quote size={36} style={{ position: 'absolute', right: '24px', top: '24px', opacity: 0.15, color: 'var(--gold-primary)' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold-hover)" color="none" />
                ))}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
                "{r.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={r.avatar} alt={r.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-primary)' }} />
                <div>
                  <h4 className="font-serif" style={{ fontSize: '1rem', fontWeight: 700 }}>{r.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

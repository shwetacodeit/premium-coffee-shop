import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ananya Deshmukh',
    role: 'Coffee Enthusiast & Food Blogger',
    rating: 5,
    text: 'Starbucks Reserve India has outdone itself. The Royal Saffron Cardamom Latte paired with Malai Kulfi cream is absolute perfection.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Vikramaditya Rao',
    role: 'Architect, Bengaluru',
    rating: 5,
    text: 'The Chikmagalur Monsooned Malabar Arabica is deeply aromatic. The ambience in the Indiranagar Flagship Lounge is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Priya Iyer',
    role: 'Culinary Stylist, Mumbai',
    rating: 5,
    text: 'Their South Indian Filter Kaapi brewed with brass dabarah and steamed oat milk is a masterpiece of Indian coffee culture.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #0b1411 0%, #13201b 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
          <div className="badge" style={{ marginBottom: '14px' }}>Guest Reviews</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
            Loved by Coffee Connoisseurs <span className="text-sb">Across India</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {REVIEWS.map(r => (
            <div key={r.id} className="glass-card" style={{ padding: '30px', position: 'relative' }}>
              <Quote size={36} style={{ position: 'absolute', right: '24px', top: '24px', opacity: 0.15, color: 'var(--sb-green-light)' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--sb-green-light)" color="none" />
                ))}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>
                "{r.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={r.avatar} alt={r.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--sb-green-light)' }} />
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

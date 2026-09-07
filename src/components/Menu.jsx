import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Star, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'signatures', label: '✨ Signature Craft' },
  { id: 'espresso', label: '☕ Espresso Bar' },
  { id: 'cold-brews', label: '🧊 Cold Brews' },
  { id: 'pastries', label: '🥐 Fresh Pastries' },
  { id: 'whole-bean', label: '🌱 Whole Bean' }
];

export default function Menu({ menuItems, onAddToCart, onOpenCustomizer }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
          <div className="badge" style={{ marginBottom: '14px' }}>Artisanal Offerings</div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '16px' }}>
            Handcrafted <span className="text-gold">Menu & Delicacies</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Every roast is meticulously profiled, extracted to gold standards, and paired with house-baked buttery French pastries.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  border: activeCategory === cat.id ? '1px solid var(--gold-primary)' : '1px solid rgba(212, 175, 55, 0.15)',
                  background: activeCategory === cat.id ? 'linear-gradient(135deg, #f0c75e 0%, #d4af37 100%)' : 'rgba(20, 16, 12, 0.6)',
                  color: activeCategory === cat.id ? '#0a0806' : 'var(--text-main)',
                  boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none'
                }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search coffee, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(20, 16, 12, 0.8)',
                border: '1px solid var(--border-gold)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {filteredItems.map(item => (
            <div key={item.id} className="glass-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Image Container */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />
                  {item.badge && (
                    <span className="badge" style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(10, 8, 6, 0.85)',
                      backdropFilter: 'blur(8px)'
                    }}>
                      {item.badge}
                    </span>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '14px',
                    background: 'rgba(10, 8, 6, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--gold-hover)'
                  }}>
                    <Star size={14} fill="var(--gold-hover)" color="none" /> {item.rating} ({item.reviews})
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '22px' }}>
                  <h3 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                  
                  {item.roast && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', marginBottom: '12px', fontWeight: 600 }}>
                      🔥 {item.roast} • {item.calories || 'Crafted Fresh'}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div style={{
                padding: '0 22px 22px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px dashed rgba(212, 175, 55, 0.15)',
                paddingTop: '16px'
              }}>
                <span className="font-serif text-gold" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                  ${item.price.toFixed(2)}
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {item.customizable && (
                    <button
                      onClick={() => onOpenCustomizer(item)}
                      className="btn btn-outline"
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                      <Sparkles size={14} /> Customize
                    </button>
                  )}
                  <button
                    onClick={() => onAddToCart(item)}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

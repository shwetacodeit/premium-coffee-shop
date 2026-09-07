import React, { useState } from 'react';
import { Search, Plus, Star, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'signatures', label: '✨ Starbucks Reserve Craft' },
  { id: 'espresso', label: '☕ Espresso & Filter Kaapi' },
  { id: 'cold-brews', label: '🧊 Nitro Cold Brews' },
  { id: 'pastries', label: '🥐 Fresh Bakes & Puffs' },
  { id: 'whole-bean', label: '🌱 Single Origin Beans' }
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
          <div className="badge" style={{ marginBottom: '14px' }}>Starbucks India Reserve</div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '16px' }}>
            Handcrafted <span className="text-sb">Menu & Delicacies</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Single-origin Indian coffees harvested from Western Ghats, roasted to perfection and paired with fresh bakes.
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
                  border: activeCategory === cat.id ? '1px solid var(--sb-green-light)' : '1px solid rgba(212, 233, 226, 0.2)',
                  background: activeCategory === cat.id ? 'linear-gradient(135deg, #00a862 0%, #006241 100%)' : 'rgba(19, 32, 27, 0.7)',
                  color: activeCategory === cat.id ? '#f3f1e7' : 'var(--text-main)',
                  boxShadow: activeCategory === cat.id ? '0 4px 18px rgba(0, 168, 98, 0.4)' : 'none'
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
              placeholder="Search Indian coffee, bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(19, 32, 27, 0.8)',
                border: '1px solid var(--slate-border)',
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
                      background: 'rgba(11, 20, 17, 0.9)',
                      backdropFilter: 'blur(8px)'
                    }}>
                      {item.badge}
                    </span>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '14px',
                    background: 'rgba(11, 20, 17, 0.9)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--sb-green-light)'
                  }}>
                    <Star size={14} fill="var(--sb-green-light)" color="none" /> {item.rating} ({item.reviews})
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
                    <div style={{ fontSize: '0.78rem', color: 'var(--sb-green-light)', marginBottom: '12px', fontWeight: 600 }}>
                      🔥 {item.roast} • {item.calories || 'Fresh Brew'}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer with Rupee Symbol */}
              <div style={{
                padding: '0 22px 22px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px dashed var(--slate-border)',
                paddingTop: '16px'
              }}>
                <span className="font-serif text-sb" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  ₹{item.price}
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

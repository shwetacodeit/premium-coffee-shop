import React, { useState } from 'react';
import { X, Check, Sparkles, Coffee } from 'lucide-react';

const SIZES = [
  { id: 'single', name: 'Solo (8 oz)', priceExtra: 0 },
  { id: 'double', name: 'Double (12 oz)', priceExtra: 1.00 },
  { id: 'grand', name: 'Grand Reserve (16 oz)', priceExtra: 1.75 }
];

const MILKS = [
  { id: 'oat', name: 'Oatly Organic Oat Milk', priceExtra: 0.75 },
  { id: 'almond', name: 'Artisanal Almond Milk', priceExtra: 0.75 },
  { id: 'pistachio', name: 'Sicilian Pistachio Milk', priceExtra: 1.25 },
  { id: 'whole', name: 'Whole Organic Dairy Milk', priceExtra: 0 }
];

const SYRUPS = [
  { id: 'vanilla', name: 'Madagascar Bourbon Vanilla', priceExtra: 0.75 },
  { id: 'caramel', name: 'Salted Butter Caramel', priceExtra: 0.75 },
  { id: 'hazelnut', name: 'Piedmont Roasted Hazelnut', priceExtra: 0.75 },
  { id: 'pumpkin', name: 'Spiced Pumpkin Nectar', priceExtra: 0.95 }
];

const TOPPINGS = [
  { id: 'gold', name: '24K Edible Gold Dust', priceExtra: 1.50 },
  { id: 'cinnamon', name: 'Ceylon Cinnamon Dusting', priceExtra: 0.25 },
  { id: 'cocoa', name: 'Valrhona Cocoa Nibs', priceExtra: 0.50 }
];

export default function BrewCustomizerModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedSyrups, setSelectedSyrups] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [shots, setShots] = useState(2);

  const calculateTotal = () => {
    let base = item.price;
    base += selectedSize.priceExtra;
    base += selectedMilk.priceExtra;
    base += selectedSyrups.reduce((sum, s) => sum + s.priceExtra, 0);
    base += selectedToppings.reduce((sum, t) => sum + t.priceExtra, 0);
    if (shots > 2) base += (shots - 2) * 1.00;
    return base;
  };

  const toggleSyrup = (syrup) => {
    if (selectedSyrups.find(s => s.id === syrup.id)) {
      setSelectedSyrups(selectedSyrups.filter(s => s.id !== syrup.id));
    } else {
      setSelectedSyrups([...selectedSyrups, syrup]);
    }
  };

  const toggleTopping = (topping) => {
    if (selectedToppings.find(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddCustomized = () => {
    const customizedItem = {
      ...item,
      id: `${item.id}-${Date.now()}`,
      name: `${item.name} (${selectedSize.name.split(' ')[0]})`,
      price: calculateTotal(),
      customizations: {
        size: selectedSize.name,
        milk: selectedMilk.name,
        syrups: selectedSyrups.map(s => s.name),
        toppings: selectedToppings.map(t => t.name),
        shots
      }
    };
    onAddToCart(customizedItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade" style={{ padding: '30px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600, textTransform: 'uppercase' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Brew Lab Customizer
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 700 }}>{item.name}</h2>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-icon" style={{ borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Customization Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Size Option */}
          <div>
            <label style={labelStyle}>1. Select Size</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {SIZES.map(size => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  style={optionButtonStyle(selectedSize.id === size.id)}>
                  <div>{size.name}</div>
                  <small style={{ color: 'var(--text-dim)' }}>
                    {size.priceExtra > 0 ? `+$${size.priceExtra.toFixed(2)}` : 'Standard'}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Espresso Shots */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={labelStyle}>2. Espresso Intensity</label>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 600 }}>{shots} Shots</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => setShots(Math.max(1, shots - 1))} 
                className="btn btn-outline" style={{ width: '40px', height: '40px', padding: 0 }}>-</button>
              <div style={{ flex: 1, textAlign: 'center', background: 'rgba(20, 16, 12, 0.8)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-gold)' }}>
                {shots === 1 ? 'Single Shot' : shots === 2 ? 'Double Shot (Standard)' : `${shots} Shots (Extra Reserve)`}
              </div>
              <button 
                onClick={() => setShots(shots + 1)} 
                className="btn btn-outline" style={{ width: '40px', height: '40px', padding: 0 }}>+</button>
            </div>
          </div>

          {/* Milk Choice */}
          <div>
            <label style={labelStyle}>3. Milk & Plant Base</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {MILKS.map(milk => (
                <button
                  key={milk.id}
                  onClick={() => setSelectedMilk(milk)}
                  style={optionButtonStyle(selectedMilk.id === milk.id)}>
                  <div>{milk.name}</div>
                  <small style={{ color: 'var(--text-dim)' }}>
                    {milk.priceExtra > 0 ? `+$${milk.priceExtra.toFixed(2)}` : 'Included'}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Syrups */}
          <div>
            <label style={labelStyle}>4. Artisanal Syrups (Optional)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {SYRUPS.map(syrup => {
                const isSelected = selectedSyrups.some(s => s.id === syrup.id);
                return (
                  <button
                    key={syrup.id}
                    onClick={() => toggleSyrup(syrup)}
                    style={optionButtonStyle(isSelected)}>
                    <div>{syrup.name}</div>
                    <small style={{ color: 'var(--text-dim)' }}>+${syrup.priceExtra.toFixed(2)}</small>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <label style={labelStyle}>5. Signature Finish & Toppings</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {TOPPINGS.map(topping => {
                const isSelected = selectedToppings.some(t => t.id === topping.id);
                return (
                  <button
                    key={topping.id}
                    onClick={() => toggleTopping(topping)}
                    style={optionButtonStyle(isSelected)}>
                    <div style={{ fontSize: '0.85rem' }}>{topping.name}</div>
                    <small style={{ color: 'var(--text-dim)' }}>+${topping.priceExtra.toFixed(2)}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with total price */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-gold)'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customized Total</span>
            <div className="font-serif text-gold" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
              ${calculateTotal().toFixed(2)}
            </div>
          </div>

          <button onClick={handleAddCustomized} className="btn btn-primary" style={{ padding: '14px 28px' }}>
            <Check size={18} /> Add Custom Brew
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: 600,
  marginBottom: '8px',
  color: 'var(--text-main)'
};

const optionButtonStyle = (active) => ({
  padding: '12px',
  borderRadius: 'var(--radius-sm)',
  border: active ? '1px solid var(--gold-primary)' : '1px solid rgba(212, 175, 55, 0.15)',
  background: active ? 'rgba(212, 175, 55, 0.15)' : 'rgba(20, 16, 12, 0.6)',
  color: active ? 'var(--gold-hover)' : 'var(--text-muted)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'var(--transition)'
});

import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

const SIZES = [
  { id: 'tall', name: 'Tall (12 oz / 354 ml)', priceExtra: 0 },
  { id: 'grande', name: 'Grande (16 oz / 473 ml)', priceExtra: 45 },
  { id: 'venti', name: 'Venti Reserve (20 oz / 591 ml)', priceExtra: 85 }
];

const MILKS = [
  { id: 'oat', name: 'Oatly Organic Oat Milk', priceExtra: 45 },
  { id: 'almond', name: 'Artisanal Almond Milk', priceExtra: 45 },
  { id: 'soy', name: 'Silk Soy Milk', priceExtra: 35 },
  { id: 'whole', name: 'Whole Cream Dairy Milk', priceExtra: 0 }
];

const SYRUPS = [
  { id: 'saffron', name: 'Kashmiri Saffron Syrup', priceExtra: 55 },
  { id: 'cardamom', name: 'Green Cardamom Nectar', priceExtra: 40 },
  { id: 'vanilla', name: 'Madagascar Vanilla Bean', priceExtra: 45 },
  { id: 'caramel', name: 'Smoked Jaggery Caramel', priceExtra: 45 }
];

const TOPPINGS = [
  { id: 'gold', name: '24K Edible Gold Dust', priceExtra: 95 },
  { id: 'pistachio', name: 'Crushed Roasted Pistachio', priceExtra: 35 },
  { id: 'cinnamon', name: 'Ceylon Cinnamon Dusting', priceExtra: 20 }
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
    if (shots > 2) base += (shots - 2) * 50;
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--slate-border)', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--sb-green-light)', fontWeight: 600, textTransform: 'uppercase' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Starbucks Reserve Customizer
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
                    {size.priceExtra > 0 ? `+₹${size.priceExtra}` : 'Standard'}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Espresso Shots */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={labelStyle}>2. Espresso Intensity</label>
              <span style={{ fontSize: '0.85rem', color: 'var(--sb-green-light)', fontWeight: 600 }}>{shots} Shots</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => setShots(Math.max(1, shots - 1))} 
                className="btn btn-outline" style={{ width: '40px', height: '40px', padding: 0 }}>-</button>
              <div style={{ flex: 1, textAlign: 'center', background: 'rgba(19, 32, 27, 0.8)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-border)' }}>
                {shots === 1 ? 'Single Shot' : shots === 2 ? 'Double Shot (Standard)' : `${shots} Shots (+₹${(shots-2)*50})`}
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
                    {milk.priceExtra > 0 ? `+₹${milk.priceExtra}` : 'Included'}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Syrups */}
          <div>
            <label style={labelStyle}>4. Indian Spiced Syrups (Optional)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {SYRUPS.map(syrup => {
                const isSelected = selectedSyrups.some(s => s.id === syrup.id);
                return (
                  <button
                    key={syrup.id}
                    onClick={() => toggleSyrup(syrup)}
                    style={optionButtonStyle(isSelected)}>
                    <div>{syrup.name}</div>
                    <small style={{ color: 'var(--text-dim)' }}>+₹{syrup.priceExtra}</small>
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
                    <small style={{ color: 'var(--text-dim)' }}>+₹{topping.priceExtra}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with Rupee symbol */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid var(--slate-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customized Total</span>
            <div className="font-serif text-sb" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
              ₹{calculateTotal()}
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
  border: active ? '1px solid var(--sb-green-light)' : '1px solid rgba(212, 233, 226, 0.15)',
  background: active ? 'rgba(0, 168, 98, 0.18)' : 'rgba(19, 32, 27, 0.6)',
  color: active ? 'var(--sb-green-light)' : 'var(--text-muted)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'var(--transition)'
});

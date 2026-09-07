import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onShowToast }) {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = discountApplied ? subtotal * 0.10 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'COFFEE10') {
      setDiscountApplied(true);
      onShowToast('10% Welcome Promo Code Applied!');
    } else {
      onShowToast('Invalid promo code. Try COFFEE10!');
    }
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          promoCode: discountApplied ? 'COFFEE10' : ''
        })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutResult(data.order);
        onClearCart();
        onShowToast('Order placed successfully!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        background: '#120e0a',
        borderLeft: '1px solid var(--border-gold-strong)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
        animation: 'slideInRight 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-gold)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} className="text-gold" />
            <h2 className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 700 }}>Your Artisanal Cart</h2>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-icon" style={{ borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Checkout Completed State */}
        {checkoutResult ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CheckCircle size={56} style={{ color: 'var(--gold-primary)', margin: '0 auto 16px' }} />
            <h3 className="font-serif text-gold" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
              Order Received!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Order ID: <strong>{checkoutResult.orderId}</strong>
            </p>
            <div className="glass-card" style={{ padding: '20px', textAlign: 'left', marginBottom: '30px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Estimated Prep Time:</span>
                <strong className="text-gold">{checkoutResult.estimatedTime}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Items:</span>
                <span>{checkoutResult.itemsCount} Items</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-gold)', paddingTop: '8px' }}>
                <span>Total Paid:</span>
                <strong className="font-serif text-gold">${checkoutResult.total}</strong>
              </div>
            </div>
            <button onClick={() => { setCheckoutResult(null); onClose(); }} className="btn btn-primary" style={{ padding: '14px' }}>
              Back to Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
                  <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '14px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      
                      <div style={{ flex: 1 }}>
                        <h4 className="font-serif" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 600, marginTop: '2px' }}>
                          ${item.price.toFixed(2)}
                        </div>

                        {item.customizations && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                            {item.customizations.size} • {item.customizations.milk}
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => onUpdateQuantity(item, -1)} style={qtyBtnStyle}>-</button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item, 1)} style={qtyBtnStyle}>+</button>
                        
                        <button onClick={() => onRemoveItem(item)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', marginLeft: '6px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--border-gold)', background: 'rgba(10, 8, 6, 0.9)' }}>
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Tag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. COFFEE10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-sm)', background: 'rgba(20,16,12,0.8)', border: '1px solid var(--border-gold)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                    Apply
                  </button>
                </form>

                {/* Subtotal Calculations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discountApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-primary)' }}>
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, borderTop: '1px dashed var(--border-gold)', paddingTop: '10px', marginTop: '6px' }}>
                    <span>Total</span>
                    <span className="font-serif text-gold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
                  {isSubmitting ? 'Processing Order...' : 'Proceed to Checkout'} <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: '26px',
  height: '26px',
  borderRadius: '4px',
  border: '1px solid var(--border-gold)',
  background: 'rgba(20,16,12,0.6)',
  color: 'var(--text-main)',
  cursor: 'pointer'
};

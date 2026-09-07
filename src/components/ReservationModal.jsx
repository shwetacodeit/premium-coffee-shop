import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2 } from 'lucide-react';

const TIME_SLOTS = [
  '08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:30 PM', '09:00 PM'
];

const AREAS = [
  { id: 'indiranagar', name: '🌿 Indiranagar Flagship Lounge (Bengaluru)' },
  { id: 'bandra', name: '🌊 Bandra Sunlit Reserve (Mumbai)' },
  { id: 'cp', name: '🏛️ Connaught Place Bar (Delhi)' }
];

export default function ReservationModal({ onClose, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: TIME_SLOTS[2],
    guests: 2,
    area: AREAS[0].name,
    specialRequests: ''
  });

  const [confirmed, setConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setConfirmed(data.reservation);
        onShowToast(`Table reserved for ${formData.name}!`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade" style={{ padding: '36px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--sb-green-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Starbucks Reserve India
            </span>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 700 }}>Reserve Your Lounge Table</h2>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-icon" style={{ borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Name & Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rohan Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rohan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Date & Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}><Users size={14} style={{ display: 'inline', marginRight: '4px' }} /> Guests ({formData.guests})</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--sb-green-light)', height: '36px' }}
                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label style={labelStyle}><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Select Time Slot</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TIME_SLOTS.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setFormData({ ...formData, time: t })}
                    style={chipButtonStyle(formData.time === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Reserve Location */}
            <div>
              <label style={labelStyle}><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Select Reserve Roastery Location</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {AREAS.map(a => (
                  <button
                    type="button"
                    key={a.id}
                    onClick={() => setFormData({ ...formData, area: a.name })}
                    style={chipButtonStyle(formData.area === a.name)}>
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '14px', marginTop: '10px' }}>
              {loading ? 'Confirming Reservation...' : 'Confirm Table Reservation'}
            </button>
          </form>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--sb-green-light)', margin: '0 auto 16px' }} />
            <h3 className="font-serif text-sb" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
              Reservation Confirmed!
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Booking Reference: <strong>{confirmed.reservationId}</strong>
            </p>
            <div className="glass-card" style={{ padding: '18px', textAlign: 'left', marginBottom: '24px', fontSize: '0.9rem' }}>
              <div>📅 <strong>Date:</strong> {confirmed.date}</div>
              <div>⏰ <strong>Time:</strong> {confirmed.time}</div>
              <div>👥 <strong>Party:</strong> {confirmed.guests} Guests</div>
              <div>📍 <strong>Location:</strong> {confirmed.area}</div>
            </div>
            <button onClick={onClose} className="btn btn-outline" style={{ width: '100%', padding: '12px' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: '6px',
  color: 'var(--text-main)'
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 'var(--radius-sm)',
  background: 'rgba(19, 32, 27, 0.8)',
  border: '1px solid var(--slate-border)',
  color: 'var(--text-main)',
  fontSize: '0.9rem',
  outline: 'none'
};

const chipButtonStyle = (active) => ({
  padding: '10px 14px',
  borderRadius: 'var(--radius-sm)',
  border: active ? '1px solid var(--sb-green-light)' : '1px solid rgba(212, 233, 226, 0.15)',
  background: active ? 'rgba(0, 168, 98, 0.22)' : 'rgba(19, 32, 27, 0.6)',
  color: active ? 'var(--sb-green-light)' : 'var(--text-muted)',
  fontSize: '0.85rem',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'var(--transition)'
});

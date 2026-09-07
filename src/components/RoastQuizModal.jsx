import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'taste',
    title: '1. What flavor notes call out to your palate?',
    options: ['Kashmiri Saffron & Cardamom', 'Rich Malai Rabri & Pistachio', 'Bold Dark Roasted Monsooned Beans', 'Authentic South Indian Filter Kaapi']
  },
  {
    id: 'brewMethod',
    title: '2. How do you prefer your daily brew?',
    options: ['South Indian Brass Filter Brew', 'Double Espresso Shot', 'Nitro Cold Brew / Cascading Foam', 'Velvety Steamed Oat Latte']
  },
  {
    id: 'intensity',
    title: '3. What roast level suits your mood?',
    options: ['Light & Fruity Arabica', 'Balanced Medium Roast', 'Bold & Intense Dark Roast']
  }
];

export default function RoastQuizModal({ onClose, onAddToCart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectOption = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      fetchRecommendation(newAnswers);
    }
  };

  const fetchRecommendation = async (userAnswers) => {
    setLoading(true);
    try {
      const res = await fetch('/api/quiz-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userAnswers)
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sb-green-light)' }}>
            <Sparkles size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Starbucks Reserve Coffee Match
            </span>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-icon" style={{ borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {!result ? (
          <div>
            {/* Progress Bar */}
            <div style={{ height: '4px', background: 'rgba(0, 168, 98, 0.2)', borderRadius: '2px', marginBottom: '28px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                background: 'var(--sb-green-light)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Sparkles size={36} className="text-sb animate-float" style={{ margin: '0 auto 16px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.4rem' }}>Finding Your Starbucks Signature Brew...</h3>
              </div>
            ) : (
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>
                  {QUESTIONS[currentStep].title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(QUESTIONS[currentStep].id, opt)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--slate-border)',
                        background: 'rgba(19, 32, 27, 0.6)',
                        color: 'var(--text-main)',
                        fontSize: '1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition)'
                      }}>
                      <span>{opt}</span>
                      <ArrowRight size={18} style={{ color: 'var(--sb-green-light)' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Result View */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 168, 98, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sb-green-light)', margin: '0 auto 20px' }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 className="font-serif text-sb" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
              Your Starbucks Soulmate
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
              {result.reason}
            </p>

            {/* Matched Product Card */}
            <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', marginBottom: '28px' }}>
              <img src={result.recommendedItem.image} alt={result.recommendedItem.name} style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
              <div>
                <span className="badge" style={{ marginBottom: '6px' }}>{result.recommendedItem.badge}</span>
                <h4 className="font-serif" style={{ fontSize: '1.15rem', fontWeight: 700 }}>{result.recommendedItem.name}</h4>
                <div className="font-serif text-sb" style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '4px' }}>
                  ₹{result.recommendedItem.price}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(result.recommendedItem);
                onClose();
              }}
              className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Add Recommended Brew to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

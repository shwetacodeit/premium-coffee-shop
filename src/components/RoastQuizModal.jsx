import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'taste',
    title: '1. What flavor notes call out to your palate?',
    options: ['Fruity, Floral & Jasmine', 'Rich Dark Chocolate & Caramel', 'Nutty, Spiced & Earthy', 'Sweet & Creamy Vanilla']
  },
  {
    id: 'brewMethod',
    title: '2. How do you prefer your daily brew?',
    options: ['Double Espresso Shot', 'Pour-Over V60 Filter', 'Velvety Cold Brew / Nitro', 'Latte / Steamed Milk']
  },
  {
    id: 'intensity',
    title: '3. What roast level suits your mood?',
    options: ['Light & Bright Roast', 'Balanced Medium Roast', 'Bold & Intense Dark Roast']
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
      // Calculate match
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)' }}>
            <Sparkles size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Find Your Perfect Roast Quiz
            </span>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-icon" style={{ borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {!result ? (
          <div>
            {/* Progress Bar */}
            <div style={{ height: '4px', background: 'rgba(212, 175, 55, 0.15)', borderRadius: '2px', marginBottom: '28px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                background: 'var(--gold-primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Sparkles size={36} className="text-gold animate-float" style={{ margin: '0 auto 16px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.4rem' }}>Finding Your Perfect Roast...</h3>
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
                        border: '1px solid var(--border-gold)',
                        background: 'rgba(20, 16, 12, 0.6)',
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
                      <ArrowRight size={18} style={{ color: 'var(--gold-primary)' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Result View */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)', margin: '0 auto 20px' }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 className="font-serif text-gold" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
              Your Coffee Soulmate
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
                <div className="font-serif text-gold" style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '4px' }}>
                  ${result.recommendedItem.price.toFixed(2)}
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

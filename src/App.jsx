import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BrewCustomizerModal from './components/BrewCustomizerModal';
import RoastQuizModal from './components/RoastQuizModal';
import ReservationModal from './components/ReservationModal';
import CartDrawer from './components/CartDrawer';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch Menu from Express API on Mount
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMenuItems(data.data);
        }
      })
      .catch(err => console.error('Error fetching menu:', err));
  }, []);

  // Toast Trigger Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add Item to Cart
  const handleAddToCart = (item) => {
    const existingIndex = cartItems.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    showToast(`Added "${item.name}" to your cart!`);
  };

  // Update Cart Item Quantity
  const handleUpdateQuantity = (item, delta) => {
    const updated = cartItems.map(i => {
      if (i.id === item.id) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter(Boolean);

    setCartItems(updated);
  };

  // Remove Item from Cart
  const handleRemoveItem = (item) => {
    setCartItems(cartItems.filter(i => i.id !== item.id));
    showToast(`Removed "${item.name}" from cart.`);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span>☕</span>
            <div>{toastMessage}</div>
          </div>
        </div>
      )}

      {/* Main Header Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={handleExploreMenu}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Artisanal Coffee & Pastry Menu */}
      <Menu
        menuItems={menuItems}
        onAddToCart={handleAddToCart}
        onOpenCustomizer={(item) => setCustomizingItem(item)}
      />

      {/* Guest Reviews & Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer onShowToast={showToast} />

      {/* Modals & Slide-out Drawers */}
      {customizingItem && (
        <BrewCustomizerModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isQuizOpen && (
        <RoastQuizModal
          onClose={() => setIsQuizOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isReservationOpen && (
        <ReservationModal
          onClose={() => setIsReservationOpen(false)}
          onShowToast={showToast}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onShowToast={showToast}
      />
    </div>
  );
}

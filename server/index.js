import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Coffee Shop Database
const MENU = [
  {
    id: 'c1',
    name: 'Aura Signature Velvet Latte',
    category: 'signatures',
    price: 6.75,
    rating: 4.9,
    reviews: 142,
    badge: 'Bestseller',
    description: 'Double espresso infused with Madagascar vanilla bean, steamed oat milk, and a dusting of 24k edible gold dust.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Medium Roast',
    calories: '220 kcal'
  },
  {
    id: 'c2',
    name: 'Obsidian Nitro Cold Brew',
    category: 'cold-brews',
    price: 5.95,
    rating: 4.8,
    reviews: 98,
    badge: 'Popular',
    description: 'Steeped for 24 hours from Ethiopian Yirgacheffe beans, infused with pure nitrogen for a velvety cascade and rich foam.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Dark Roast',
    calories: '15 kcal'
  },
  {
    id: 'c3',
    name: 'Pistachio Cloud Espresso',
    category: 'signatures',
    price: 7.25,
    rating: 4.95,
    reviews: 210,
    badge: 'Chef Choice',
    description: 'Ristretto espresso layered over house-made Sicilian pistachio foam, honey drizzle, and crushed roasted pistachios.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Light Roast',
    calories: '280 kcal'
  },
  {
    id: 'c4',
    name: 'Artisanal Double Cortado',
    category: 'espresso',
    price: 4.75,
    rating: 4.7,
    reviews: 84,
    badge: 'Classic',
    description: 'Equal parts single-origin espresso and warm silky milk served in a hand-blown crystal tumbler.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Medium-Dark Roast',
    calories: '90 kcal'
  },
  {
    id: 'c5',
    name: 'Smoked Honey & Sea Salt Macchiato',
    category: 'signatures',
    price: 6.95,
    rating: 4.88,
    reviews: 116,
    badge: 'Limited',
    description: 'Espresso marked with microfoam, smoked wildflower honey, and flaky Maldon sea salt.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Medium Roast',
    calories: '190 kcal'
  },
  {
    id: 'c6',
    name: 'Iced Cardamom Rose Brew',
    category: 'cold-brews',
    price: 6.25,
    rating: 4.75,
    reviews: 72,
    badge: 'Refreshing',
    description: 'Cold brewed arabica infused with green cardamom pods, organic rose water, and coconut nectar.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Light-Medium Roast',
    calories: '45 kcal'
  },
  {
    id: 'p1',
    name: 'Golden Truffle Butter Croissant',
    category: 'pastries',
    price: 5.50,
    rating: 4.9,
    reviews: 165,
    badge: 'Fresh Baked',
    description: 'Hand-laminated French butter croissant infused with black truffle honey and golden sea salt.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    customizable: false,
    calories: '340 kcal'
  },
  {
    id: 'p2',
    name: 'Dark Chocolate Hazelnut Tart',
    category: 'pastries',
    price: 6.50,
    rating: 4.85,
    reviews: 94,
    badge: 'Decadent',
    description: '70% Valrhona dark chocolate ganache, praline crunch, and roasted Piedmont hazelnuts.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    customizable: false,
    calories: '410 kcal'
  },
  {
    id: 'b1',
    name: 'Ethiopian Geisha Single Origin (250g)',
    category: 'whole-bean',
    price: 24.00,
    rating: 4.98,
    reviews: 58,
    badge: 'Micro-Lot',
    description: 'Exquisite notes of jasmine, bergamot, peach nectar, and wild honey. Grown at 2,100m elevation.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    customizable: false,
    roast: 'Light Roast'
  }
];

// Routes
// 1. Get Menu
app.get('/api/menu', (req, res) => {
  const { category, search } = req.query;
  let result = [...MENU];

  if (category && category !== 'all') {
    result = result.filter(item => item.category === category);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.description.toLowerCase().includes(term)
    );
  }

  res.json({ success: true, count: result.length, data: result });
});

// 2. Submit Order
app.post('/api/orders', (req, res) => {
  const { items, customer, promoCode } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Cart cannot be empty' });
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = promoCode === 'COFFEE10' ? subtotal * 0.10 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const order = {
    orderId: 'AURA-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    itemsCount: items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    estimatedTime: '12 - 15 mins',
    status: 'Confirmed'
  };

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order
  });
});

// 3. Table Reservation
app.post('/api/reservations', (req, res) => {
  const { name, email, phone, date, time, guests, area, specialRequests } = req.body;

  if (!name || !date || !time || !guests) {
    return res.status(400).json({ success: false, error: 'Please provide all required fields' });
  }

  const reservation = {
    reservationId: 'RES-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    phone,
    date,
    time,
    guests,
    area: area || 'Main Lounge',
    specialRequests: specialRequests || 'None',
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: `Table reserved for ${guests} guests on ${date} at ${time}.`,
    reservation
  });
});

// 4. Roast Finder Quiz
app.post('/api/quiz-match', (req, res) => {
  const { taste, brewMethod, intensity } = req.body;

  // Matching logic
  let match = MENU.find(i => i.id === 'b1'); // default Ethiopian Geisha
  if (intensity === 'Dark' || taste === 'Bold & Chocolatey') {
    match = MENU.find(i => i.id === 'c2');
  } else if (taste === 'Sweet & Creamy') {
    match = MENU.find(i => i.id === 'c1');
  }

  res.json({
    success: true,
    recommendedItem: match,
    reason: `Based on your love for ${taste.toLowerCase()} flavor profiles and ${brewMethod.toLowerCase()} brewing, this is your perfect artisanal match!`
  });
});

// 5. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
  }
  res.json({
    success: true,
    message: 'Thank you for subscribing to Aura Blend Coffee Club! Check your inbox for your 15% welcome voucher.'
  });
});

app.listen(PORT, () => {
  console.log(`☕ Aura Blend Express Backend running on http://localhost:${PORT}`);
});

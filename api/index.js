import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Indian Starbucks Style Menu Database
const MENU = [
  {
    id: 'c1',
    name: 'Royal Saffron Cardamom Latte',
    category: 'signatures',
    price: 345,
    rating: 4.95,
    reviews: 284,
    badge: 'Reserve Special',
    description: 'Double shot dark roast espresso infused with Kashmiri saffron, crushed green cardamom, and silky oat milk.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Dark Roast',
    calories: '210 kcal'
  },
  {
    id: 'c2',
    name: 'Kapi Nirvan Nitro Cold Brew',
    category: 'cold-brews',
    price: 320,
    rating: 4.88,
    reviews: 192,
    badge: 'Popular',
    description: 'Slow steeped for 24 hours from Chikmagalur Arabica beans, infused with nitrogen for a velvety cascade foam.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Medium-Dark Roast',
    calories: '20 kcal'
  },
  {
    id: 'c3',
    name: 'Malai Kulfi Pistachio Latte',
    category: 'signatures',
    price: 375,
    rating: 4.98,
    reviews: 310,
    badge: 'Chef Choice',
    description: 'Espresso poured over house-made rabri cream, roasted pistachio drizzle, and crushed green cardamom.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Medium Roast',
    calories: '290 kcal'
  },
  {
    id: 'c4',
    name: 'Authentic South Indian Filter Kaapi',
    category: 'espresso',
    price: 245,
    rating: 4.9,
    reviews: 420,
    badge: 'Heritage Classic',
    description: 'Traditional brass filter brew of Coorg Arabica & Robusta, froth-whipped with steaming hot milk in a brass dabarah.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Dark Roast',
    calories: '110 kcal'
  },
  {
    id: 'c5',
    name: 'Smoked Jaggery Sea Salt Macchiato',
    category: 'signatures',
    price: 355,
    rating: 4.85,
    reviews: 145,
    badge: 'Limited',
    description: 'Single-origin espresso layered over organic palm jaggery caramel, velvet foam, and sea salt.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Medium Roast',
    calories: '185 kcal'
  },
  {
    id: 'c6',
    name: 'Spiced Alphonso Mango Cold Brew',
    category: 'cold-brews',
    price: 335,
    rating: 4.8,
    reviews: 112,
    badge: 'Refreshing',
    description: 'Cold brew infused with Ratnagiri Alphonso mango nectar, mint sprig, and a hint of star anise.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    customizable: true,
    roast: 'Light Roast',
    calories: '95 kcal'
  },
  {
    id: 'p1',
    name: 'Paneer & Black Truffle Croissant',
    category: 'pastries',
    price: 265,
    rating: 4.92,
    reviews: 210,
    badge: 'Fresh Baked',
    description: 'French butter croissant stuffed with spiced cottage cheese, herbs, and black truffle drizzle.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    customizable: false,
    calories: '360 kcal'
  },
  {
    id: 'p2',
    name: 'Dark Chocolate Hazelnut Tart',
    category: 'pastries',
    price: 295,
    rating: 4.87,
    reviews: 168,
    badge: 'Decadent',
    description: '70% Valrhona dark chocolate ganache tart infused with crushed roasted hazelnut praline.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    customizable: false,
    calories: '420 kcal'
  },
  {
    id: 'b1',
    name: 'Monsooned Malabar AA Single Origin (250g)',
    category: 'whole-bean',
    price: 890,
    rating: 4.99,
    reviews: 94,
    badge: 'Heritage Estate',
    description: 'Exquisite monsooned beans from Western Ghats with deep notes of dark chocolate, spice, and earth.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    customizable: false,
    roast: 'Dark Roast'
  }
];

// Routes
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

app.post('/api/orders', (req, res) => {
  const { items, promoCode } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Cart cannot be empty' });
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = (promoCode === 'INDIANSTAR10' || promoCode === 'COFFEE10') ? subtotal * 0.10 : 0;
  const tax = (subtotal - discount) * 0.05; // 5% GST
  const total = subtotal - discount + tax;

  const order = {
    orderId: 'SB-IND-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    itemsCount: items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: subtotal.toFixed(0),
    discount: discount.toFixed(0),
    tax: tax.toFixed(0),
    total: total.toFixed(0),
    estimatedTime: '10 - 15 mins',
    status: 'Confirmed'
  };

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order
  });
});

app.post('/api/reservations', (req, res) => {
  const { name, email, phone, date, time, guests, area, specialRequests } = req.body;

  if (!name || !date || !time || !guests) {
    return res.status(400).json({ success: false, error: 'Please provide all required fields' });
  }

  const reservation = {
    reservationId: 'SB-RES-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    phone,
    date,
    time,
    guests,
    area: area || 'Starbucks Reserve Lounge',
    specialRequests: specialRequests || 'None',
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: `Table reserved for ${guests} guests on ${date} at ${time}.`,
    reservation
  });
});

app.post('/api/quiz-match', (req, res) => {
  const { taste, brewMethod, intensity } = req.body;

  let match = MENU.find(i => i.id === 'b1');
  if (intensity === 'Dark' || taste === 'Bold & Chocolatey') {
    match = MENU.find(i => i.id === 'c4');
  } else if (taste === 'Sweet & Creamy') {
    match = MENU.find(i => i.id === 'c3');
  }

  res.json({
    success: true,
    recommendedItem: match,
    reason: `Based on your love for ${taste.toLowerCase()} and traditional Indian coffee craft, this is your signature Starbucks match!`
  });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
  }
  res.json({
    success: true,
    message: 'Welcome to Starbucks India Rewards! Enjoy ₹150 off your first coffee experience.'
  });
});

export default app;

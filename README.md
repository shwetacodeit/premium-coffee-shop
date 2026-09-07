# ☕ Aura Blend — Premium Artisanal Coffee & Lounge

> **A luxury, full-stack web application built with React, Vite, and Node.js Express. Features an obsidian & gold design aesthetic, live interactive coffee customizer, roast recommendation quiz, table reservation system, and complete online checkout API.**

---

## 🌟 Key Features

- **☕ Artisanal Menu & Filter**: Search, filter by category (Signature Craft, Espresso Bar, Cold Brews, Pastries, Whole Bean), and browse high-definition coffee selections with calorie and roast badges.
- **🎨 Interactive Brew Builder ("Brew Lab")**: Customize coffee size (Solo, Double, Grand Reserve), roast intensity, milk choice (Oatly Oat, Almond, Sicilian Pistachio, Organic Dairy), artisanal syrups, and 24K edible gold dust with real-time price calculations.
- **🎯 "Find Your Roast" Interactive Quiz**: 3-step questionnaire matching user taste profiles to single-origin bean recommendations via Express backend logic.
- **📅 Table Reservation System**: Interactive booking modal allowing guests to pick date, time slots, guest count slider, and seating area (Outdoor Sunlit Patio, VIP Lounge, Barista Counter).
- **🛒 Cart & Checkout Drawer**: Slide-out cart drawer with quantity adjustment, promo code voucher support (`COFFEE10` for 10% off), real-time tax/subtotal calculation, and instant API order submission.
- **✨ Luxury Obsidian & Gold Aesthetics**: Designed with Google Fonts (`Playfair Display` + `Outfit`), glassmorphic frosted cards, smooth keyframe animations, glowing accents, and responsive layout.

---

## 🏗️ Architecture & Technology Stack

```
                               ┌─────────────────────────────────────────┐
                               │       AURA BLEND COFFEE WEB APP         │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 │                                                                     │
                 ▼                                                                     ▼
   ┌──────────────────────────┐                                           ┌──────────────────────────┐
   │     REACT (Vite Frontend)│                                           │   NODE.JS (Express API)  │
   ├──────────────────────────┤                                           ├──────────────────────────┤
   │ - App.jsx                │ ◄──────────────── HTTP /api ────────────► │ - server/index.js        │
   │ - Navbar & Hero          │                                           │ - GET  /api/menu         │
   │ - Menu & Cards           │                                           │ - POST /api/orders       │
   │ - BrewCustomizerModal    │                                           │ - POST /api/reservations │
   │ - RoastQuizModal         │                                           │ - POST /api/quiz-match   │
   │ - ReservationModal       │                                           │ - POST /api/newsletter   │
   │ - CartDrawer & Toast     │                                           └──────────────────────────┘
   └──────────────────────────┘
```

- **Frontend**: React 18, Vite, Lucide Icons, Vanilla CSS Design System with CSS variables and Glassmorphism.
- **Backend**: Node.js, Express, CORS.
- **Database / State**: In-memory RESTful data structure with real-time total order calculations and order reference generation.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shwetacodeit/premium-coffee-shop.git
   cd premium-coffee-shop
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Backend Express Server**:
   ```bash
   npm run server
   ```
   *The server runs at `http://localhost:5000`*

4. **Run the Frontend Development Server** (in a separate terminal window):
   ```bash
   npm run dev
   ```
   *The frontend runs at `http://localhost:3000`*

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/menu` | Fetch complete coffee & pastry menu items (supports `?category=` & `?search=`) |
| `POST` | `/api/orders` | Submit cart order, calculate discount (`COFFEE10`), tax, and total |
| `POST` | `/api/reservations` | Reserve table with date, time, party count, and seating area choice |
| `POST` | `/api/quiz-match` | Submit quiz answers and return recommended roast item |
| `POST` | `/api/newsletter` | Subscribe email to VIP coffee club |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Crafted with passion for Coffee Lovers by **shwetacodeit**.*

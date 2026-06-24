# NOUR ÉSSENCE

**L'art de la beauté naturelle** — Luxury cinematic 3D beauty brand website built with React Three Fiber + Three.js.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18 + Vite 5
- React Three Fiber + Three.js (real 3D objects, glass materials, particles)
- Framer Motion (entrance animations)
- Lazy loading + code splitting

## Structure

```
src/
  components/
    Hero.jsx          — 3D cinematic scene, mouse parallax
    Categories.jsx    — 6 interactive category cards with 3D orbs
    ProductGrid.jsx   — 96 products, filters, pagination
    ProductModal.jsx  — Full-screen 3D product detail
    Featured.jsx      — Rotating 3D product showcases
    Benefits.jsx      — Particle effects, glass-morphism cards
    Atmosphere.jsx    — Immersive fog/light rays section
    Contact.jsx       — Form + social links
    Navigation.jsx    — Fixed luxury nav bar
    LoadingScreen.jsx — Animated loading state
  App.jsx
  main.jsx
  styles.css
public/
  data/             — All product data (96 products, 6 categories)
```

## Data

All content sourced from structured PDF catalogs — no invented products. 96 products across 6 categories: Skincare, Oils, Makeup, Perfumes, Body Care, Home Fragrances.

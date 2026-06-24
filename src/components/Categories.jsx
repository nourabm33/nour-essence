import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CATEGORY_LABELS = {
  'Skincare': 'Peptilux Skincare',
  'Oils': 'Les Huiles',
  'Makeup': 'Maquillage',
  'Perfumes': 'Parfums',
  'Body & Personal Care': 'Soins du Corps',
  'Home Fragrances': "Parfums d'Intérieur"
}

function CategoryCard({ category, index }) {
  const [hovered, setHovered] = useState(false)
  const label = CATEGORY_LABELS[category.name] || category.name
  const color = category.accent_color || '#C8A96B'

  return (
    <motion.div
      className="category-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: '1000px' }}
    >
      <div style={{ 
        height: 120, 
        borderRadius: 8, 
        overflow: 'hidden', 
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`
      }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10)`,
          border: `1px solid ${color}30`,
          transform: hovered ? 'scale(1.15) rotate(15deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          boxShadow: hovered 
            ? `0 0 30px ${color}30, inset 0 0 20px ${color}15` 
            : `0 0 15px ${color}10`,
        }} />
        <div style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: `1px solid ${color}15`,
          transform: hovered ? 'scale(1.3)' : 'scale(1)',
          transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        }} />
      </div>
      <span className="count">{category.product_count} products</span>
      <h3>{label}</h3>
      <p>{category.description}</p>
      <div style={{ 
        marginTop: 12, 
        fontSize: '0.7rem', 
        color: 'var(--gold)', 
        letterSpacing: '0.1em' 
      }}>
        {category.price_range}
      </div>
    </motion.div>
  )
}

export default function Categories({ data }) {
  if (!data || data.length === 0) return null

  return (
    <section className="section" id="categories">
      <h2 className="section-title">Collections</h2>
      <p className="section-subtitle">Discover our world of luxury beauty</p>
      <div className="categories-grid">
        {data.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}

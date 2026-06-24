import React from 'react'
import { motion } from 'framer-motion'

function FeaturedItem({ item, index }) {
  const color = item.accent_color || '#C8A96B'

  return (
    <motion.div
      className="featured-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div style={{ 
        height: 180, 
        borderRadius: 8, 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 70%)`
      }}>
        <div className="featured-bottle" style={{
          width: 40,
          height: 90,
          borderRadius: '8px 8px 12px 12px',
          background: `linear-gradient(135deg, ${color}20, ${color}08)`,
          border: `1px solid ${color}25`,
          position: 'relative',
          boxShadow: `0 10px 40px ${color}15`,
          animation: `floatSlow ${3 + index * 0.5}s ease-in-out infinite`,
        }}>
          <div style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 18,
            height: 14,
            borderRadius: '4px 4px 2px 2px',
            background: 'linear-gradient(135deg, #C8A96B, #9B7B4B)',
          }} />
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `1px solid ${color}30`,
          }} />
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 80%, ${color}08 0%, transparent 50%)`,
        }} />
      </div>
      <h4>{item.name}</h4>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: '4px 0' }}>
        {item.tagline}
      </div>
      <div className="feat-price">{item.price}</div>
    </motion.div>
  )
}

export default function Featured({ data }) {
  if (!data || data.length === 0) return null

  return (
    <section className="section" id="featured">
      <h2 className="section-title">Featured</h2>
      <p className="section-subtitle">Curated luxury essentials</p>
      
      <div className="featured-track" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        {data.map((item, i) => (
          <FeaturedItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

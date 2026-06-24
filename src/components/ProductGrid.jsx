import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS_PER_PAGE = 12

function ProductCard({ product, onClick, index }) {
  return (
    <motion.div
      className="product-card"
      onClick={() => onClick(product)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="product-image">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.4">
          <rect x="14" y="4" width="12" height="28" rx="4" stroke="#C8A96B" strokeWidth="1"/>
          <rect x="16" y="2" width="8" height="4" rx="2" stroke="#C8A96B" strokeWidth="1"/>
          <circle cx="20" cy="18" r="4" stroke="#C8A96B" strokeWidth="1"/>
        </svg>
      </div>
      <div className="product-brand">{product.brand}</div>
      <h4>{product.name}</h4>
      {product.price && <div className="product-price">{product.price}</div>}
      {product.has_variants && (
        <div style={{ fontSize: '0.65rem', color: 'var(--gold)', marginTop: 4, letterSpacing: '0.1em' }}>
          MULTIPLE OPTIONS
        </div>
      )}
    </motion.div>
  )
}

export default function ProductGrid({ cards, onProductClick }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [page, setPage] = useState(1)

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(cards.map(c => c.category))]
    return cats
  }, [cards])

  const filteredCards = useMemo(() => {
    if (activeFilter === 'All') return cards
    return cards.filter(c => c.category === activeFilter)
  }, [cards, activeFilter])

  const paginatedCards = useMemo(() => {
    return filteredCards.slice(0, page * ITEMS_PER_PAGE)
  }, [filteredCards, page])

  const hasMore = paginatedCards.length < filteredCards.length

  const handleFilter = useCallback((cat) => {
    setActiveFilter(cat)
    setPage(1)
  }, [])

  if (!cards || cards.length === 0) return null

  return (
    <section className="section" id="products" style={{ alignItems: 'stretch' }}>
      <h2 className="section-title">All Products</h2>
      <p className="section-subtitle">{filteredCards.length} products in collection</p>
      
      <div className="products-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid" style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <AnimatePresence mode="popLayout">
          {paginatedCards.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
              index={i % ITEMS_PER_PAGE}
            />
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.button
          className="filter-btn"
          onClick={() => setPage(p => p + 1)}
          style={{ marginTop: 40, padding: '14px 40px' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </motion.button>
      )}
    </section>
  )
}

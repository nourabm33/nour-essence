import React, { useState, useEffect, Suspense, lazy } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'

const Categories = lazy(() => import('./components/Categories'))
const ProductGrid = lazy(() => import('./components/ProductGrid'))
const ProductModal = lazy(() => import('./components/ProductModal'))
const Featured = lazy(() => import('./components/Featured'))
const Benefits = lazy(() => import('./components/Benefits'))
const Atmosphere = lazy(() => import('./components/Atmosphere'))
const Contact = lazy(() => import('./components/Contact'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const [heroData, setHeroData] = useState([])
  const [categories, setCategories] = useState([])
  const [cards, setCards] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [detailData, setDetailData] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('/data/hero.json').then(r => r.json()),
      fetch('/data/categories.json').then(r => r.json()),
      fetch('/data/cards.json').then(r => r.json())
    ]).then(([hero, cats, cardData]) => {
      setHeroData(hero)
      setCategories(cats)
      setCards(cardData)
      setTimeout(() => setLoading(false), 1200)
    })
  }, [])

  const openProduct = async (product) => {
    setSelectedProduct(product)
    const catId = product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
    try {
      const res = await fetch(`/data/details/${catId}.json`)
      const details = await res.json()
      const detail = details.find(d => d.id === product.id)
      setDetailData(detail || product)
    } catch {
      setDetailData(product)
    }
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setDetailData(null)
  }

  return (
    <>
      <LoadingScreen visible={loading} />
      <Navigation />
      <Hero data={heroData} />
      <Suspense fallback={null}>
        <Categories data={categories} />
        <Featured data={heroData} />
        <ProductGrid cards={cards} onProductClick={openProduct} />
        <Benefits />
        <Atmosphere />
        <Contact />
        {selectedProduct && detailData && (
          <ProductModal product={detailData} onClose={closeModal} />
        )}
      </Suspense>
    </>
  )
}

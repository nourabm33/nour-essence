import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, MeshTransmissionMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'

const CATEGORY_LABELS = {
  'Skincare': 'Peptilux Skincare',
  'Oils': 'Les Huiles',
  'Makeup': 'Maquillage',
  'Perfumes': 'Parfums',
  'Body & Personal Care': 'Soins du Corps',
  'Home Fragrances': "Parfums d'Intérieur"
}

function CategoryOrb({ color, hovered }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.3
    ref.current.scale.setScalar(hovered ? 1.15 : 1)
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.8, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.3}
          chromaticAberration={0.03}
          color={color}
          transmission={0.9}
          roughness={0.1}
          distortion={hovered ? 0.4 : 0.1}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  )
}

function CategoryCard({ category, index }) {
  const [hovered, setHovered] = useState(false)
  const label = CATEGORY_LABELS[category.name] || category.name

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
      <div style={{ height: 120, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
        <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={0.8} color={category.accent_color} />
          <CategoryOrb color={category.accent_color} hovered={hovered} />
        </Canvas>
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

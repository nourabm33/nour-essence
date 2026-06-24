import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'

function ParticleFlow() {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.1
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1
  })

  return (
    <group ref={ref}>
      <Sparkles count={40} scale={8} size={1.5} speed={0.3} color="#C8A96B" opacity={0.5} />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <MeshDistortMaterial
          color="#C8A96B"
          speed={1.5}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.15}
          roughness={0}
        />
      </mesh>
    </group>
  )
}

const benefits = [
  { title: "Pure Natural Ingredients", desc: "Cold-pressed oils, organic extracts, and peptide complexes sourced from nature" },
  { title: "Scientific Innovation", desc: "Advanced anti-aging formulations with clinically proven peptide technologies" },
  { title: "Cruelty-Free & Vegan", desc: "Ethical beauty without compromise — never tested on animals" },
  { title: "Luxury Craftsmanship", desc: "Italian artisanal production with meticulous attention to quality" },
]

function useInView(ref, margin = '100px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, margin])
  return inView
}

export default function Benefits() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef)

  return (
    <section className="section" id="benefits" style={{ position: 'relative' }} ref={sectionRef}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.2]}
            gl={{ powerPreference: 'high-performance' }}
            frameloop="always"
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[3, 3, 3]} intensity={0.5} color="#C8A96B" />
            <ParticleFlow />
          </Canvas>
        )}
      </div>
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, width: '100%' }}>
        <h2 className="section-title">Propriétés et Bienfaits</h2>
        <p className="section-subtitle">The science of natural luxury</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 30, 
          marginTop: 40 
        }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(13, 13, 13, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 12,
                padding: 30,
              }}
            >
              <div style={{ 
                width: 6, height: 6, borderRadius: '50%', 
                background: 'var(--gold)', marginBottom: 16 
              }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: 8, fontWeight: 400 }}>{b.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.7 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

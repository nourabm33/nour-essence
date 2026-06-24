import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'

function RotatingShowcase({ color, index }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.4 + index
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={0.7} color={color || "#C8A96B"} />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={ref}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.35, 1.1, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.4}
              chromaticAberration={0.02}
              color={color || "#f0e8d8"}
              transmission={0.93}
              roughness={0.05}
            />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 0.25, 16]} />
            <meshStandardMaterial color="#C8A96B" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </Float>
      
      <Sparkles count={15} scale={3} size={1} speed={0.2} color="#C8A96B" opacity={0.3} />
    </>
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
          <motion.div
            key={item.id}
            className="featured-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div style={{ height: 180, borderRadius: 8, overflow: 'hidden' }}>
              <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 1.5]}>
                <RotatingShowcase color={item.accent_color} index={i} />
              </Canvas>
            </div>
            <h4>{item.name}</h4>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: '4px 0' }}>
              {item.tagline}
            </div>
            <div className="feat-price">{item.price}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

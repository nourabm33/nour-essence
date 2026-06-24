import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'

function ModalProduct({ color }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.5
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color={color || "#C8A96B"} />
      <pointLight position={[-3, -1, 2]} intensity={0.3} color="#FAF8F5" />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={ref}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.45, 1.5, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={6}
              thickness={0.5}
              chromaticAberration={0.03}
              color={color || "#f0e8d8"}
              transmission={0.92}
              roughness={0.05}
              distortion={0.1}
              distortionScale={0.2}
            />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.35, 16]} />
            <meshStandardMaterial color="#C8A96B" metalness={0.95} roughness={0.05} />
          </mesh>
          {/* Label */}
          <mesh position={[0, -0.1, 0.46]}>
            <planeGeometry args={[0.5, 0.3]} />
            <meshStandardMaterial color="#FAF8F5" metalness={0} roughness={0.8} opacity={0.9} transparent />
          </mesh>
        </group>
      </Float>
      
      <Sparkles count={30} scale={4} size={1} speed={0.2} color="#C8A96B" opacity={0.3} />
      <Environment preset="studio" environmentIntensity={0.2} />
    </>
  )
}

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative' }}
      >
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-3d">
          <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 1.5]}>
            <ModalProduct color={product.accent_color} />
          </Canvas>
        </div>

        <div className="modal-info">
          <div className="modal-brand">{product.brand}</div>
          <h2>{product.name}</h2>
          
          {product.description && (
            <p className="modal-desc">{product.description}</p>
          )}

          {product.benefits && product.benefits.length > 0 && (
            <ul className="modal-benefits">
              {product.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {product.volume && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 12 }}>
              {product.volume}
            </div>
          )}

          {product.price && (
            <div className="modal-price">{product.price}</div>
          )}

          {product.variants && Array.isArray(product.variants) && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', letterSpacing: '0.1em', marginBottom: 8 }}>
                AVAILABLE IN
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.variants.slice(0, 8).map((v, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '4px 10px',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 20,
                    color: 'var(--ivory)'
                  }}>
                    {v}
                  </span>
                ))}
                {product.variants.length > 8 && (
                  <span style={{ fontSize: '0.7rem', padding: '4px 10px', color: 'var(--gold)' }}>
                    +{product.variants.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

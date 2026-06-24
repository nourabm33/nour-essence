import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function FogScene() {
  const groupRef = useRef()
  const lightRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.05
    lightRef.current.position.x = Math.sin(t * 0.3) * 4
    lightRef.current.position.z = Math.cos(t * 0.3) * 4
  })

  return (
    <>
      <fog attach="fog" args={['#0D0D0D', 3, 12]} />
      <ambientLight intensity={0.1} />
      <pointLight ref={lightRef} position={[3, 2, 3]} intensity={0.8} color="#C8A96B" distance={10} />
      
      <group ref={groupRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[
            Math.sin(i * Math.PI / 2) * 3,
            Math.cos(i * 0.7) * 0.5,
            Math.cos(i * Math.PI / 2) * 3
          ]} rotation={[0, i * Math.PI / 2, Math.PI / 6]}>
            <planeGeometry args={[0.05, 4]} />
            <meshBasicMaterial color="#C8A96B" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
        ))}
        
        <mesh>
          <sphereGeometry args={[2, 20, 20]} />
          <MeshDistortMaterial
            color="#1a1510"
            speed={0.8}
            distort={0.4}
            radius={1}
            transparent
            opacity={0.3}
            roughness={1}
          />
        </mesh>
      </group>
      
      <Sparkles count={30} scale={10} size={1.2} speed={0.15} color="#C8A96B" opacity={0.3} />
    </>
  )
}

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

export default function Atmosphere() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef)

  return (
    <section className="atmosphere" ref={sectionRef}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.2]}
            gl={{ powerPreference: 'high-performance' }}
          >
            <FogScene />
          </Canvas>
        )}
      </div>
      
      <motion.div
        className="atmosphere-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>L'Essence du Luxe</h2>
        <p>
          Each fragrance tells a story. From the sun-drenched Mediterranean gardens
          to the ancient alchemy of natural oils, our essences capture moments of
          pure beauty. Close your eyes, breathe, and let the journey begin.
        </p>
        <div style={{ 
          marginTop: 40, 
          display: 'flex', 
          gap: 40, 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {[
            { num: '100+', label: 'Fragrances' },
            { num: '1,038', label: 'Products' },
            { num: '6', label: 'Collections' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: '2.5rem', 
                color: 'var(--gold)',
                fontWeight: 300 
              }}>
                {stat.num}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                color: 'var(--text-light)' 
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

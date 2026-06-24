import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingBottle({ position, scale, color, speed }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.y = Math.sin(t) * 0.3
    ref.current.rotation.x = Math.cos(t * 0.5) * 0.1
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.35, 1.2, 16]} />
          <meshPhysicalMaterial
            color={color}
            transmission={0.9}
            thickness={0.5}
            roughness={0.05}
            ior={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 12]} />
          <meshStandardMaterial color="#C8A96B" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

function OilDrop({ position, color }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 1.2 + position[0]) * 0.3
    ref.current.scale.setScalar(0.8 + Math.sin(t * 0.8) * 0.1)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.3}
        radius={1}
        transparent
        opacity={0.7}
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  )
}

function MouseParallax({ children }) {
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.02
    target.current.y += (mouse.current.y - target.current.y) * 0.02
    groupRef.current.rotation.y = target.current.x * 0.15
    groupRef.current.rotation.x = target.current.y * 0.08
  })

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return <group ref={groupRef}>{children}</group>
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#C8A96B" />
      <pointLight position={[-5, 3, -5]} intensity={0.4} color="#FAF8F5" />
      
      <MouseParallax>
        <FloatingBottle position={[-2, 0.5, 0]} scale={1.2} color="#f8f0e0" speed={0.4} />
        <FloatingBottle position={[2.5, -0.3, -1]} scale={0.9} color="#e8dfd0" speed={0.6} />
        <FloatingBottle position={[0.5, 1, -2]} scale={0.7} color="#d4c8b0" speed={0.5} />
        
        <OilDrop position={[-1, -0.5, 1]} color="#D4A853" />
        <OilDrop position={[1.5, 0.8, 0.5]} color="#C8A96B" />
        <OilDrop position={[-2.5, 1.2, -0.5]} color="#B8956B" />
        
        <Sparkles count={40} scale={10} size={1.2} speed={0.3} color="#C8A96B" opacity={0.4} />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
        </mesh>
      </MouseParallax>
      
    </>
  )
}

function useInView(ref, margin = '100px') {
  const [inView, setInView] = useState(true)
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

export default function Hero() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef, '200px')

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-content">
        <h1 className="hero-brand">NOUR ÉSSENCE</h1>
        <p className="hero-tagline">L'art de la beauté naturelle</p>
      </div>
      <div className="hero-canvas">
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
          >
            <HeroScene />
          </Canvas>
        )}
      </div>
    </section>
  )
}

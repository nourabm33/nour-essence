import React, { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="nav" style={{ opacity: scrolled ? 1 : 0.9 }}>
      <div className="nav-logo">NOUR ÉSSENCE</div>
      <ul className="nav-links">
        <li><a href="#categories">Collections</a></li>
        <li><a href="#featured">Featured</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#benefits">Benefits</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

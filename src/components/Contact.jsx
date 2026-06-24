import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Get in touch for orders & inquiries</p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message" />
          <button type="submit">Send Message</button>
        </form>

        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>

        <div style={{ 
          marginTop: 60, 
          fontSize: '0.7rem', 
          color: 'var(--text-light)', 
          letterSpacing: '0.1em',
          textAlign: 'center'
        }}>
          NOUR ÉSSENCE — L'art de la beauté naturelle
        </div>
      </motion.div>
    </section>
  )
}

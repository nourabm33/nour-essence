import React from 'react'

export default function LoadingScreen({ visible }) {
  return (
    <div className={`loading-screen ${!visible ? 'fade-out' : ''}`}>
      <div className="loading-brand">NOUR ÉSSENCE</div>
      <div className="loading-bar" />
    </div>
  )
}

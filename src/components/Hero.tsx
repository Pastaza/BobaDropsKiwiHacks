import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import CloudScene from './CloudScene'
import FloatingDataPanel from './FloatingDataPanel'

const dataPoints = [
  { label: 'Altitude', value: '6,500', unit: 'ft', position: 'top-left' as const },
  { label: 'Moisture', value: '87', unit: '%', position: 'top-right' as const },
  { label: 'Temperature', value: '-12', unit: '°C', position: 'bottom-left' as const },
  { label: 'Formation', value: 'Cumulus', position: 'bottom-right' as const },
]

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window
    setMouse({
      x: (e.clientX / innerWidth - 0.5) * 2,
      y: (e.clientY / innerHeight - 0.5) * 2,
    })
  }, [])
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #0f2040 0%, #050a1a 70%)',
        }}
      />
      <div className="absolute inset-0 grid-overlay" aria-hidden="true" />
      
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #4488bb, transparent)' }}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="relative w-full h-full">
          <CloudScene
            mouseX={mouse.x}
            mouseY={mouse.y}
            className="w-full h-full"
          />
          {dataPoints.map((dp, i) => (
            <FloatingDataPanel
              key={dp.label}
              data={{ label: dp.label, value: dp.value, unit: dp.unit }}
              position={dp.position}
              delay={0.5 + i * 0.15}
              className="z-10"
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
          <span className="text-xs text-blue-300/80 uppercase tracking-widest font-medium">
            Atmospheric Sciences
          </span>
        </motion.div>
        
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-gradient mb-6 leading-none"
        >
          Cloud
          <br />
          Atlas
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/50 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Explore the sky's floating architecture. Discover how clouds shape weather, climate, and life on Earth.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#clouds"
            className="px-8 py-3 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-200 font-semibold text-sm hover:bg-blue-500/30 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            Explore Clouds
          </a>
          <a
            href="#layers"
            className="px-8 py-3 rounded-full glass border-white/10 text-white/70 font-semibold text-sm hover:text-white hover:border-white/20 transition-all duration-300"
          >
            View Cloud Layers
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

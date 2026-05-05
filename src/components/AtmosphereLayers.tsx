import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { atmosphereLayers } from '../data/atmosphereLayers'

export default function AtmosphereLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      id="layers"
      className="relative py-32 overflow-hidden"
      aria-labelledby="layers-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" aria-hidden="true" />
      <div className="absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-blue-300/60 text-sm uppercase tracking-widest mb-4 font-medium">
            Atmospheric Science
          </p>
          <h2 id="layers-heading" className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Layers of the Atmosphere
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Earth's atmosphere is divided into distinct layers, each with unique properties.
            Clouds inhabit only the lowest layer — the troposphere.
          </p>
        </motion.div>
        
        <div className="relative flex gap-12">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-px bg-white/10 relative" style={{ height: '100%', minHeight: '600px' }}>
              <motion.div
                style={{ height: lineHeight }}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400/50 to-transparent"
              />
              {['600 km', '85 km', '50 km', '12 km', '0 km'].map((label, i) => (
                <div
                  key={label}
                  className="absolute left-4 flex items-center gap-2"
                  style={{ top: `${i * 25}%` }}
                >
                  <div className="w-2 h-px bg-white/20" />
                  <span className="text-[10px] text-white/30 whitespace-nowrap font-mono">{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            {atmosphereLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all duration-300">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        {layer.cloudPresence && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            ☁ Clouds Present
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Altitude</p>
                      <p className="text-sm font-mono font-semibold text-blue-300">{layer.altitudeRange}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{layer.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="glass rounded-lg px-3 py-1.5">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Temperature</p>
                      <p className="text-sm font-mono text-amber-300/80">{layer.temperature}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {layer.features.map((feature) => (
                        <span key={feature} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

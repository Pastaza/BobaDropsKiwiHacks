import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface FormationStep {
  icon: string
  title: string
  description: string
  detail: string
}

const steps: FormationStep[] = [
  {
    icon: '💧',
    title: 'Evaporation',
    description: 'The sun heats surface water, transforming liquid into water vapor that rises invisibly into the atmosphere.',
    detail: 'Oceans, lakes, and rivers release billions of tons of water vapor daily.',
  },
  {
    icon: '↑',
    title: 'Rising Air',
    description: 'Warm, moist air is less dense than cool dry air, so it rises through the atmosphere in invisible columns.',
    detail: 'Rising air cools at approximately 6.5°C for every 1,000 meters of altitude.',
  },
  {
    icon: '❄',
    title: 'Condensation',
    description: 'As rising air cools, water vapor condenses onto tiny dust and salt particles called cloud condensation nuclei.',
    detail: 'Millions of microscopic droplets form, each just 1–100 micrometers wide.',
  },
  {
    icon: '☁',
    title: 'Cloud Formation',
    description: 'Billions of water droplets cluster together, becoming visible as a cloud. The cloud\'s shape depends on atmospheric conditions.',
    detail: 'A single cumulus cloud can contain over 500 million kilograms of water.',
  },
  {
    icon: '🌧',
    title: 'Precipitation',
    description: 'When droplets collide and grow large enough, gravity pulls them down as rain, snow, sleet, or hail.',
    detail: 'Raindrops fall at 9 m/s; snowflakes drift down at just 1.5 m/s.',
  },
]

function ParticleRise() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-300/30"
          style={{ left: `${10 + i * 7}%`, bottom: 0 }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export default function FormationSteps() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      id="formation"
      className="relative py-32 overflow-hidden"
      aria-labelledby="formation-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a1a] to-[#0a1628]" aria-hidden="true" />
      <ParticleRise />
      
      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-blue-300/60 text-sm uppercase tracking-widest mb-4 font-medium">
            Meteorology
          </p>
          <h2 id="formation-heading" className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            How Clouds Form
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Cloud formation is an elegant cycle driven by solar energy, gravity, and the invisible physics of water.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 hidden md:block" aria-hidden="true">
            <motion.div
              style={{ height: progressHeight }}
              className="absolute top-0 w-full bg-gradient-to-b from-blue-400/60 to-transparent"
            />
          </div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative md:pl-24"
              >
                <div
                  className="hidden md:flex absolute left-0 w-16 h-16 rounded-full glass items-center justify-center text-2xl border border-white/10"
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                
                <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-colors duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="md:hidden text-2xl" aria-hidden="true">{step.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono text-white/30">STEP {String(index + 1).padStart(2, '0')}</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">{step.description}</p>
                      <p className="text-xs text-blue-300/50 italic">{step.detail}</p>
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

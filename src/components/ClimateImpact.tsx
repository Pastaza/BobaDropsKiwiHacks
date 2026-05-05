import { motion } from 'framer-motion'

interface ImpactMetric {
  label: string
  value: number
  unit: string
  description: string
  color: string
}

const metrics: ImpactMetric[] = [
  {
    label: 'Solar Reflection',
    value: 30,
    unit: '%',
    description: 'Clouds reflect approximately 30% of incoming solar radiation back into space',
    color: '#60a5fa',
  },
  {
    label: 'Earth Coverage',
    value: 67,
    unit: '%',
    description: 'At any given moment, roughly 67% of Earth\'s surface is covered by clouds',
    color: '#818cf8',
  },
  {
    label: 'Rainfall Source',
    value: 78,
    unit: '%',
    description: 'Nearly 78% of global precipitation originates from cumulus-type clouds',
    color: '#34d399',
  },
  {
    label: 'Heat Trapping',
    value: 25,
    unit: '%',
    description: 'Low clouds trap 25% more heat than high clouds, affecting surface temperatures',
    color: '#fbbf24',
  },
]

interface CircularMeterProps {
  value: number
  color: string
  size?: number
}

function CircularMeter({ value, color, size = 80 }: CircularMeterProps) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference
  
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-sm font-bold font-mono"
          style={{ color }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {value}%
        </motion.span>
      </div>
    </div>
  )
}

export default function ClimateImpact() {
  const impacts = [
    {
      title: 'Rain & Storms',
      icon: '🌧',
      description: 'Clouds are the primary vehicles of precipitation. Deep convective clouds spawn thunderstorms capable of producing 50,000 lightning strikes per day.',
    },
    {
      title: 'Temperature Regulation',
      icon: '🌡',
      description: 'Clouds act as both shields and blankets. High thin clouds warm the surface; low thick clouds cool it by reflecting sunlight.',
    },
    {
      title: 'Climate Feedback',
      icon: '🔄',
      description: 'As the planet warms, cloud patterns shift — creating complex feedback loops that scientists are still working to fully understand.',
    },
  ]

  return (
    <section
      id="climate"
      className="relative py-32 overflow-hidden"
      aria-labelledby="climate-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#050a1a]" aria-hidden="true" />
      <div className="absolute inset-0 grid-overlay" aria-hidden="true" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-blue-300/60 text-sm uppercase tracking-widest mb-4 font-medium">
            Climate Science
          </p>
          <h2 id="climate-heading" className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Weather & Climate Impact
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Clouds are powerful regulators of Earth's energy balance, influencing temperature, precipitation, and the global climate system.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 mb-12 border border-white/5"
        >
          <h3 className="text-lg font-semibold text-white/80 mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
            Cloud Impact Index
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <CircularMeter value={metric.value} color={metric.color} />
                <div>
                  <p className="text-sm font-semibold text-white/80 mb-1">{metric.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-colors duration-300"
            >
              <div className="text-3xl mb-4" aria-hidden="true">{impact.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3">{impact.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{impact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

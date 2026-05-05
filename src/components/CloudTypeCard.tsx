import { motion } from 'framer-motion'
import type { CloudType } from '../data/cloudTypes'

interface CloudTypeCardProps {
  cloud: CloudType
  index: number
}

function MiniCloudSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 50" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id={`blur-${color.replace('#', '')}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <ellipse cx="40" cy="32" rx="28" ry="14" fill="white" opacity="0.12" filter={`url(#blur-${color.replace('#', '')})`} />
      <ellipse cx="40" cy="28" rx="22" ry="12" fill="white" opacity="0.18" />
      <ellipse cx="30" cy="26" rx="14" ry="10" fill="white" opacity="0.22" />
      <ellipse cx="50" cy="27" rx="12" ry="9" fill="white" opacity="0.20" />
      <ellipse cx="40" cy="23" rx="10" ry="9" fill="white" opacity="0.25" />
    </svg>
  )
}

export default function CloudTypeCard({ cloud, index }: CloudTypeCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative"
      aria-labelledby={`cloud-name-${cloud.id}`}
    >
      <div className="glass rounded-2xl p-5 h-full border border-white/5 hover:border-white/15 transition-colors duration-300 overflow-hidden">
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${cloud.accentColor}10 0%, transparent 70%)` }}
          aria-hidden="true"
        />
        
        <div className="relative w-full h-20 mb-4 overflow-hidden rounded-lg" aria-hidden="true">
          <div
            className="absolute inset-0 rounded-lg"
            style={{ background: `linear-gradient(135deg, ${cloud.color}80, ${cloud.color}40)` }}
          />
          <div className="absolute inset-0 p-2">
            <MiniCloudSVG color={cloud.accentColor} />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest font-medium text-blue-300/60">
            Altitude
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: cloud.accentColor, borderColor: `${cloud.accentColor}40`, background: `${cloud.accentColor}10` }}
          >
            {cloud.altitude}
          </span>
        </div>
        
        <h3
          id={`cloud-name-${cloud.id}`}
          className="text-lg font-bold text-white mb-2"
        >
          {cloud.name}
        </h3>
        
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          {cloud.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cloud.characteristics.map((char) => (
            <span
              key={char}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/8"
            >
              {char}
            </span>
          ))}
        </div>
        
        <div className="pt-3 border-t border-white/5">
          <p className="text-[11px] text-white/40 italic">{cloud.weatherImpact}</p>
        </div>
      </div>
    </motion.article>
  )
}

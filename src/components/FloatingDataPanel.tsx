import { motion } from 'framer-motion'

interface DataPoint {
  label: string
  value: string
  unit?: string
}

interface FloatingDataPanelProps {
  data: DataPoint
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  delay?: number
  className?: string
}

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
}

export default function FloatingDataPanel({
  data,
  position = 'top-left',
  delay = 0,
  className = '',
}: FloatingDataPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={`absolute ${positionClasses[position]} ${className}`}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="glass rounded-lg px-3 py-2 min-w-[100px]"
      >
        <p className="text-[10px] font-medium text-blue-300/70 uppercase tracking-widest mb-0.5">
          {data.label}
        </p>
        <p className="text-sm font-semibold text-white/90">
          {data.value}
          {data.unit && (
            <span className="text-xs font-normal text-white/50 ml-1">{data.unit}</span>
          )}
        </p>
        <div className="mt-1.5 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: delay + 0.5, duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-blue-400/50 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

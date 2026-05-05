import { motion } from 'framer-motion'
import CloudScene from './CloudScene'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" role="contentinfo">
      <section className="relative py-40" aria-labelledby="cta-heading">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <CloudScene className="w-full h-full" />
        </div>
        
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(15, 32, 64, 0.5) 0%, rgba(5, 10, 26, 0.9) 70%)',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-gradient leading-tight mb-6 tracking-tight"
          >
            Look up.
            <br />
            The atmosphere is alive.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/40 mb-10"
          >
            Every cloud tells a story about the invisible forces that shape our world.
          </motion.p>
          
          <motion.a
            href="#"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-200 font-semibold text-base hover:bg-blue-500/30 transition-all duration-300"
          >
            <span>☁</span>
            Start Exploring
          </motion.a>
        </div>
      </section>
      
      <div className="relative glass border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">☁</span>
            <span className="font-bold text-white/70">Cloud Atlas</span>
          </div>
          <p className="text-sm text-white/30">
            An interactive journey through Earth's atmosphere.
          </p>
          <p className="text-xs text-white/20">
            Built with React, Three.js &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}

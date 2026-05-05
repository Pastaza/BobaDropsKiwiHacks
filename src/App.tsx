import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CloudTypeCard from './components/CloudTypeCard'
import AtmosphereLayers from './components/AtmosphereLayers'
import FormationSteps from './components/FormationSteps'
import ClimateImpact from './components/ClimateImpact'
import Footer from './components/Footer'
import { cloudTypes } from './data/cloudTypes'

function CloudTypesSection() {
  return (
    <section id="clouds" className="relative py-32" aria-labelledby="cloud-types-heading">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, #050a1a 0%, #0a1628 50%, #050a1a 100%)' }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-blue-300/60 text-sm uppercase tracking-widest mb-4 font-medium">
            Cloud Classification
          </p>
          <h2 id="cloud-types-heading" className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Types of Clouds
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Each cloud formation tells a unique story about the atmosphere's temperature, humidity, and energy.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cloudTypes.map((cloud, index) => (
            <CloudTypeCard key={cloud.id} cloud={cloud} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    return scrollYProgress.on('change', (v) => setProgress(v * 100))
  }, [scrollYProgress])
  
  return (
    <div className="min-h-screen bg-[#050a1a] text-white">
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <CloudTypesSection />
        <AtmosphereLayers />
        <FormationSteps />
        <ClimateImpact />
      </main>
      
      <Footer />
    </div>
  )
}

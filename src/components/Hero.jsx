"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const Hero = ({ onNav, hideHero }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      return () => section.removeEventListener("mousemove", handleMouseMove)
    }
  }, [sectionRef])

  return (
    <>
      {/* Hero Content - Hide when hideHero is true */}
      {!hideHero && (
        <section
          id="hero"
          ref={sectionRef}
          className="relative overflow-hidden bg-gray-950 min-h-screen flex items-center justify-center pt-20 md:pt-24"
        >
          {/* Interactive Mouse Glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/30 blur-[120px] opacity-50"
            animate={{ x: mousePosition.x - 250, y: mousePosition.y - 250 }}
            transition={{ type: "spring", damping: 60, stiffness: 40 }}
          />

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-white"
            >
              Innovative <span className="text-emerald-400">Software</span> <br />
              Tailored for Your Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              We design powerful websites, apps, and AI-driven solutions that
              bring ideas to life and help businesses grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-10 flex justify-center gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/40 transition-all"
              >
                Let&apos;s Talk
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 border border-emerald-400 text-white rounded-lg hover:bg-emerald-400/10 transition-all"
              >
                Our Services
              </motion.a>
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}

export default Hero

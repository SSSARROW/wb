"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  }

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-emerald-950/80 backdrop-blur-lg shadow-lg"
            : "py-6 bg-emerald-950/40 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 lg:px-16">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <img
              src="/src/assets/White.png"
              alt="Logo"
              className="w-36 md:w-48 hover:scale-110 transition-transform duration-300"
            />
          </motion.a>

          {/* Desktop Menu */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden xl:flex justify-end gap-10 font-medium text-base ml-auto"
          >
            {["About", "Why Us?", "Services"].map((item, index) => (
              <motion.li
                key={item}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="relative group"
              >
                <a
                  href="#"
                  className="p-2 text-white hover:text-emerald-400 transition-colors duration-300"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
            <motion.li custom={100} initial="hidden" animate="visible" variants={fadeIn}>
              <a
                href="#contact"
                className="px-5 py-2 bg-emerald-500 text-white rounded-lg font-semibold shadow-md hover:shadow-emerald-500/40 transition-all duration-300"
              >
                Contact Us
              </a>
            </motion.li>
          </motion.ul>

          {/* Mobile Menu Toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden relative z-10 p-2 rounded-md hover:bg-emerald-800 transition-colors"
          >
            <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"} text-3xl text-white`}></i>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="xl:hidden overflow-hidden bg-emerald-950 text-white w-full shadow-lg"
        >
          <div className="container mx-auto px-6 py-4">
            <ul className="flex flex-col space-y-3">
              {["About", "Why Us?", "Services"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href="#"
                    className="block p-3 rounded-md hover:bg-emerald-500/20 transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <a
                  href="#contact"
                  className="block p-3 bg-emerald-500 rounded-md text-center font-semibold"
                >
                  Contact Us
                </a>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-gray-950 min-h-screen flex items-center justify-center"
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
              href="#"
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
    </>
  )
}

export default Hero

"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle mouse movement for interactive background
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  }

  return (
    <>
      {/* Nav Bar */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "py-2 bg-white/95 backdrop-blur-sm shadow-md" : "py-4 bg-white"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-24">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <img
              src="/src/assets/White.png"
              alt="SRSM3dia Logo"
              className="w-40 md:w-52 hover:scale-105 transition-all duration-300"
            />
          </motion.a>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden xl:flex justify-end gap-8 font-medium text-base ml-auto"
          >
            {["About", "Why Us?", "Services", "Our Process"].map((item, index) => (
              <motion.li
                key={item}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="relative group"
              >
                <a href="#" className="p-3 inline-block hover:text-sky-400 transition-colors duration-300">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden relative z-10 p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"} text-3xl`}></i>
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
          className={`xl:hidden overflow-hidden bg-white w-full shadow-lg`}
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-2">
              {["About", "Why Us?", "Services", "Our Process"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -10,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="w-full"
                >
                  <a
                    href="#"
                    className="block w-full p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all duration-200"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section ref={sectionRef} className="relative overflow-hidden bg-black min-h-screen flex items-center pt-24">
        {/* Interactive Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white/5 h-full"></div>
              ))}
            </div>
            <div className="grid grid-rows-12 w-full absolute top-0 left-0 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-b border-white/5 w-full"></div>
              ))}
            </div>
          </div>

          {/* Interactive Glow - Only outside the text area */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-sky-600/20 to-fuchsia-600/20 blur-[100px] opacity-50"
            animate={{
              x: mousePosition.x - 250,
              y: mousePosition.y - 250,
            }}
            transition={{
              type: "spring",
              damping: 50, // Increased damping for slower movement
              stiffness: 30, // Reduced stiffness for slower movement
              mass: 1,
            }}
          />

          {/* Fixed Glows */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-sky-600/10 blur-[80px]"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-fuchsia-600/10 blur-[80px]"></div>

          {/* Fixed glow behind the "Solutions" text */}
          <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/4 w-96 h-96 rounded-full bg-sky-600/15 blur-[80px]"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center py-14 md:py-0"
          >
            <div className="text-center md:text-left space-y-6 relative">
              {/* Fixed glow specifically for the text area */}
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-full h-full rounded-full bg-sky-600/10 blur-[80px] pointer-events-none"></div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white relative z-10"
              >
                We Provide Software <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-sky-400"
                >
                  Solutions
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-gray-400 text-lg max-w-[500px] mx-auto md:mx-0 relative z-10"
              >
                We are a team of talented developers making websites and apps
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center md:justify-start mt-8 relative z-10"
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-emerald-400 text-black font-semibold rounded-md hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300"
                >
                  Let&apos;s Talk
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex justify-center md:justify-end items-center relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <img
                src="/src/assets/girl.png"
                alt="Developer"
                className="w-[300px] md:w-[400px] lg:w-[500px] max-w-full drop-shadow-2xl hover:scale-[1.02] transition-all duration-500"
              />
            </motion.div>
          </motion.div>
        </div>

        

        {/* Code Lines */}
        <div className="absolute right-0 top-1/4 w-1/3 h-1/2 pointer-events-none opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
              style={{
                width: `${Math.random() * 30 + 20}%`,
                top: `${i * 12}%`,
                left: `${Math.random() * 40}%`,
                opacity: Math.random() * 0.5 + 0.5,
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Hero


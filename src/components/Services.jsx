"use client"

import { useEffect, useRef, useState } from "react"
import { FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { SiOpenai } from "react-icons/si";
import { RiCodeSSlashFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

const Services = () => {
  const cardsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)

  // Enhanced card data with more details and links
  const cardData = [
    {
      title: "Web Development",
      description: "Building responsive and interactive web applications using modern frameworks and libraries.",
      icon: <FaLaptopCode className="text-white"/>,
      link: "/services/web-development",
      color: "from-purple-500/20 to-blue-500/20",
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces with attention to detail and user research.",
      icon: <MdDesignServices className="text-white"/>,
      link: "/services/design",
      color: "from-pink-500/20 to-purple-500/20",
    },
    {
      title: "Mobile Apps",
      description: "Developing cross-platform mobile applications for iOS and Android with native performance.",
      icon: <FaMobileAlt className="text-white"/>,
      link: "/services/mobile-apps",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Web Apps",
      description: "Developing cross-platform mobile applications for iOS and Android with native performance.",
      icon: <BiWorld className="text-white"/>,
      link: "/services/mobile-apps",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "AI Solutions",
      description: "Developing cross-platform mobile applications for iOS and Android with native performance.",
      icon: <SiOpenai className="text-white"/>,
      link: "/services/mobile-apps",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Software Development",
      description: "Developing cross-platform mobile applications for iOS and Android with native performance.",
      icon: <RiCodeSSlashFill className="text-white"/>,
      link: "/services/mobile-apps",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    
  ]

  useEffect(() => {
    // More efficient event handling with refs
    const handleMouseMove = (e, index) => {
      const card = cardsRef.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    }

    // Set up event listeners for each card
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, index))
      }
    })

    // Cleanup
    return () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleMouseMove(e, index))
        }
      })
    }
  }, [])

  const handleCardClick = (link) => {
    console.log(`Navigating to: ${link}`)
    // You would typically use router.push(link) here
  }

  return (
  <div className="relative min-h-screen w-full overflow-hidden">
      {/* Glassmorphism & colorful blurred gradients */}
      <div className="absolute inset-0 z-[-2]">
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

        {/* Blurred Colorful Glows */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-sky-600/20 to-fuchsia-600/20 blur-[100px] opacity-40 left-1/4 top-1/4"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-sky-600/10 blur-[80px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-fuchsia-600/10 blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/4 w-96 h-96 rounded-full bg-sky-600/15 blur-[80px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-20 px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-600 text-transparent bg-clip-text">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our range of professional services designed to help your business grow and succeed in the digital
            landscape.
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-8 justify-center items-center max-w-7xl mx-auto">
          {cardData.map((card, index) => (
            <div key={index} className="p-[2px] rounded-2xl bg-gradient-to-r from-green-400 to-blue-500">
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className={`card group relative h-[280px] w-[400px] bg-[#18181b] backdrop-blur-sm rounded-2xl overflow-hidden
                          transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleCardClick(card.link)}
                role="button"
                tabIndex={0}
                aria-label={`Learn more about ${card.title}`}
                onKeyDown={(e) => e.key === "Enter" && handleCardClick(card.link)}
              >
                {/* Spotlight effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-2xl pointer-events-none group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.1), transparent 40%)",
                  }}
                />

                {/* Background gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                {/* Card content with unique details */}
                <div className="relative z-10 p-7 flex flex-col h-full">
                  <div className="mb-5 flex items-center justify-center">
                    <div className="bg-green-400 rounded-xl p-4 flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                      <span className="text-5xl text-white">{card.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">{card.title}</h3>
                  <p className="mt-1 text-gray-300 text-sm leading-relaxed">{card.description}</p>
                  <div className="mt-auto pt-4 flex justify-center">
                    <a
                      href="#contact"
                      className="mt-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium text-white group-hover:translate-x-1 cursor-pointer"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Border glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default Services


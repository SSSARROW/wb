import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"
import Why from "./components/Why"
import Footer from "./components/Footer"
import Process from "./components/Process"
import Careers from "./components/Careers"
import JobDetail from "./pages/careers/[job]"
import ApplyForm from "./pages/careers/ApplyForm"
import Portfolio from "./pages/Portfolio"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import Seo from "./components/Seo"

const App = () => {
  const [showCareers, setShowCareers] = useState(false)

  // Handler for navigation (if still needed for Hero)
  const handleNav = (section) => {
    if (section === "careers") {
      setShowCareers(true)
    } else {
      setShowCareers(false)
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Seo
              title="SenXDev | Custom Software, Web & AI Development Agency"
              description="SenXDev designs and builds custom software, websites, mobile apps, and AI-driven solutions that help businesses grow. Get a free consultation today."
              path="/"
            />
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950"> {/* Removed pt-20 md:pt-24 */}
               <Hero onNav={handleNav} hideHero={showCareers} />
               {!showCareers && (
                 <>
                   <Services />
                   <Why />
                   <Contact />
                   <Footer />
                 </>
               )}
               {showCareers && <Careers />}
             </div>
           </>
         } />
        <Route path="/careers" element={
          <>
            <Seo
              title="Careers at SenXDev | Join Our Team"
              description="Explore open positions at SenXDev and help us build innovative software, web, and AI solutions. Remote roles available."
              path="/careers"
            />
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950 pt-20 md:pt-24">
               <Careers />
            </div>
          </>
        } />

        <Route path="/portfolio" element={
          <>
            <Seo
              title="Portfolio | SenXDev Digital Design Showcase"
              description="Browse SenXDev's portfolio of web design and development projects spanning e-commerce, hospitality, fitness, and luxury brands."
              path="/portfolio"
            />
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950 pt-20 md:pt-24">
               <Portfolio />
               <Footer />
            </div>
          </>
        } />

        {/* Wrapped job detail with Navbar so header stays visible */}
        <Route path="/careers/:job" element={
          <>
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950 pt-20 md:pt-24">
               <JobDetail />
            </div>
          </>
        } />

        {/* Wrapped apply form with Navbar as well */}
        <Route path="/careers/:job/apply" element={
          <>
            <Seo
              title="Apply | SenXDev Careers"
              description="Submit your application for an open role at SenXDev."
              path="/careers/apply"
              noindex
            />
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950 pt-20 md:pt-24">
               <ApplyForm />
            </div>
          </>
        } />
      </Routes>
      {/* Add the floating WhatsApp button */}
      <FloatingWhatsApp />
    </BrowserRouter>
  )
}

export default App
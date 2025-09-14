import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"  // Add this import
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
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950"> {/* Removed pt-20 md:pt-24 */}
               <Hero onNav={handleNav} hideHero={showCareers} />
               {!showCareers && (
                 <>
                   <Services />
                   <Why />
                   <Process />
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
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950 pt-20 md:pt-24">
               <Careers />
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
            <Navbar />
            <div className="overflow-x-hidden scrollbar-hide min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-950 pt-20 md:pt-24">
               <ApplyForm />
            </div>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Why from './components/Why'
import Footer from './components/Footer'
import Process from './components/Process'
const App = () => {
  return (
    <div className='overflow-x-hidden scrollbar-hide' >
      <Hero />
      <Services />
      <Why />
      <Process />
      
      
      <Contact />
      <Footer />
    </div>
  )
}

export default App
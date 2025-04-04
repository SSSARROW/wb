"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Mail, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react"

const ContactInfo = ({ icon, title, content, delay }) => {
  return (
    <motion.div
      className="flex items-start mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.2 + delay * 0.1,
        },
      }}
    >
      <div className="p-3 rounded-full bg-blue-500/20 text-green-500 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <p className="text-zinc-400">{content}</p>
      </div>
    </motion.div>
  )
}

const SocialLink = ({ icon, href, delay }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-zinc-800 text-zinc-400 hover:bg-purple-500/20 hover:text-purple-500 transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          delay: 0.5 + delay * 0.1,
        },
      }}
    >
      {icon}
    </motion.a>
  )
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })
  const titleControls = useAnimation()
  const subtitleControls = useAnimation()

  useEffect(() => {
    if (isTitleInView) {
      titleControls.start("visible")
      subtitleControls.start("visible")
    }
  }, [isTitleInView, titleControls, subtitleControls])

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
    alert("Thank you for your message! We will get back to you soon.")
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section className="py-20 bg-black" id="contact">
      <div className="text-center mb-16">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-600 text-transparent bg-clip-text">
            Get In Touch
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={subtitleControls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut",
              },
            },
          }}
        >
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Reach out and let's create something amazing together.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                delay: 0.3,
              },
            }}
          >
            <div className="bg-[#0A0F1C]/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-zinc-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Nick Martin"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-zinc-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="nick@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-zinc-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <span>Send Message</span>
                  <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                delay: 0.3,
              },
            }}
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <ContactInfo icon={<Mail size={20} />} title="Email Us" content="info@yourcompany.com" delay={0} />
              <ContactInfo icon={<Phone size={20} />} title="Call Us" content="+94 76 6232337" delay={1} />

              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <SocialLink icon={<Github size={20} />} href="https://github.com" delay={0} />
                  <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com" delay={1} />
                  <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" delay={2} />
                  <SocialLink icon={<Instagram size={20} />} href="https://instagram.com" delay={3} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


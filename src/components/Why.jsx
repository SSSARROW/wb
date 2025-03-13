"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Code, Rocket, Users, Clock, Shield, HeartHandshake,Infinity  } from "lucide-react"

const FeatureCard = ({ icon, title, description, delay }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay * 0.1,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }}
      className="h-full"
    >
      <div className="h-full p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] group">
        <div className="flex flex-col h-full">
          <div className="mb-4 p-3 rounded-full bg-zinc-800 w-fit group-hover:bg-blue-500/20 transition-colors duration-300">
            <div className="text-green-500">{icon}</div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-zinc-400 flex-grow">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyUsSection() {
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

  const features = [
    {
      icon: <Infinity size={24} />,
      title: "We craft Solutions, not just Software.",
      description:
        "We develop innovative, impact-driven software that solves real problems and fuels business growth.",
    },
    {
      icon: <Code size={24} />,
      title: "Cutting-Edge Technology",
      description:
        "We leverage the latest technologies and frameworks to build modern, scalable, and high-performance applications.",
    },
    {
      icon: <Rocket size={24} />,
      title: "Rapid Development",
      description:
        "Our agile methodology and experienced team ensure quick turnaround times without compromising on quality.",
    },
    {
      icon: <Users size={24} />,
      title: "Dedicated Team",
      description:
        "Work with a team of passionate developers, designers, and project managers committed to your success.",
    },
    {
      icon: <Clock size={24} />,
      title: "On-Time Delivery",
      description: "We pride ourselves on meeting deadlines and delivering projects on schedule, every time.",
    },
    
    {
      icon: <HeartHandshake size={24} />,
      title: "Client-Centric Approach",
      description: "We build lasting relationships through transparent communication and exceptional support.",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
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
              Why Choose Us?
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
              We deliver exceptional software solutions that drive innovation and business growth. Here's what sets us
              apart:
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.8,
              duration: 0.6,
            },
          }}
        >
          <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-700 hover:to-greem-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-purple-500/20 transition-all duration-300 font-medium">
            Start Your Project
          </button>
        </motion.div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl" />
          <motion.div
            className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 1,
                duration: 0.5,
              },
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Ready to transform your ideas into reality?</h3>
                <p className="text-zinc-400 mb-6">
                  Our team of experts is ready to help you build the software solution your business needs. Let's create
                  something amazing together.
                </p>
                <button className="border border-green-500 text-white hover:bg-purple-500/10 px-6 py-2 rounded-md transition-colors duration-300">
                  Contact Us Today
                </button>
              </div>
              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <span className="text-green-500 font-bold">1</span>
                    </div>
                    <p className="text-zinc-300">Schedule a free consultation</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <span className="text-green-500 font-bold">2</span>
                    </div>
                    <p className="text-zinc-300">Get a detailed project proposal</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <span className="text-green-500 font-bold">3</span>
                    </div>
                    <p className="text-zinc-300">Watch your vision come to life</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
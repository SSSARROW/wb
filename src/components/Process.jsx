"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Lightbulb, Code, Rocket, MessageSquare, ArrowRight } from "lucide-react"

const ProcessStep = ({ icon, title, description, step, isLast }) => {
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
            delay: step * 0.1,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }}
      className="relative"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 relative">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-green-500 z-10 relative">
            {icon}
          </div>
          {!isLast && (
            <div className="absolute left-8 top-16 w-1 h-[calc(100%+2rem)] bg-gradient-to-b from-green-500 to-green-500/20 z-0"></div>
          )}
        </div>
        <div className="ml-6">
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-green-600 font-bold text-sm mr-3">
              {step + 1}
            </span>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          <p className="mt-3 text-zinc-400 max-w-lg">{description}</p>
          {!isLast && (
            <div className="mt-6 mb-12 hidden md:block">
              <ArrowRight className="text-green-500/50 ml-4" size={20} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function OurProcess() {
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

  const processSteps = [
    {
      icon: <Lightbulb size={28} />,
      title: "Planning",
      description:
        "We begin by understanding your vision, goals, and requirements. Our team conducts thorough research and analysis to create a detailed roadmap for your project, ensuring all stakeholders are aligned on objectives, timeline, and deliverables.",
    },
    {
      icon: <Code size={28} />,
      title: "Development",
      description:
        "Our skilled developers bring your vision to life using cutting-edge technologies and best practices. We follow agile methodologies with regular sprints and check-ins to ensure transparency and flexibility throughout the development process.",
    },
    {
      icon: <Rocket size={28} />,
      title: "Launch",
      description:
        "Once development is complete, we conduct rigorous testing to ensure your solution is robust, secure, and user-friendly. We then handle the deployment process, ensuring a smooth transition to production with minimal downtime.",
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Feedback & Communication",
      description:
        "We believe in continuous improvement. After launch, we gather user feedback and performance metrics to identify opportunities for enhancement. Our team remains available for ongoing support, maintenance, and future iterations of your product.",
    },
  ]

  return (
    <section className="py-20 bg-black" id="process">
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
            Our Process
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
            We follow a structured approach to deliver exceptional results for every project
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
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
        <div className="inline-block p-0.5 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
          <button className="bg-zinc-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors duration-300">
            Learn More About Our Approach
          </button>
        </div>
      </motion.div>
    </section>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"  // Added useInView and useAnimation
import { Briefcase } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"  // Changed from next/link
import { jobOpenings } from "../data/jobs" // <- use centralized job list

const JobCard = ({ job, delay }) => (
    <Link to={`/careers/${job.slug}`}>  
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { delay: delay * 0.1, duration: 0.6 } }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 shadow-md hover:border-green-500 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center gap-3 mb-2">
                <Briefcase className="text-green-400" size={22} />
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
            </div>
            <div className="flex gap-4 text-sm text-zinc-400 mb-3">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
            </div>
            <p className="text-zinc-400 mb-4">{job.description}</p>
            <span className="text-green-400 font-medium hover:underline">View Details & Apply</span>
        </motion.div>
    </Link>
)

export default function Careers() {
    const titleRef = useRef(null)
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })
    const titleControls = useAnimation()
    const subtitleControls = useAnimation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const navigate = useNavigate()

    useEffect(() => {
        if (isTitleInView) {
            titleControls.start("visible")
            subtitleControls.start("visible")
        }
    }, [isTitleInView, titleControls, subtitleControls])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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

    // Helper to navigate to home page and scroll to a section
    const navigateToSection = (sectionId) => {
        navigate(`/#${sectionId}`)
        setTimeout(() => {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        }, 100) // Small delay to ensure page loads
        setIsMenuOpen(false) // Close mobile menu
    }

    // Helper for logo click: Always go to home and scroll to hero
    const handleLogoClick = () => {
        navigate("/#hero")
        setTimeout(() => {
            const element = document.getElementById("hero")
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        }, 100)
    }

    const categories = ["All", "Development", "Marketing", "Sales", "Designer"]
    const filteredJobs = selectedCategory === "All" ? jobOpenings : jobOpenings.filter(job => job.category === selectedCategory)

    return (
        <section id="careers" className="py-24 min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
                <div className="text-center mb-16">
                    <motion.div
                        ref={titleRef}
                        initial="hidden"
                        animate={titleControls}
                        variants={{
                            hidden: { opacity: 0, y: -20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                        }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-600 text-transparent bg-clip-text">
                            Careers at SRSM3dia
                        </h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate={subtitleControls}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
                        }}
                    >
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            Join our passionate team and help us build the future of software. Explore open positions and apply below!
                        </p>
                    </motion.div>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    selectedCategory === category
                                        ? "bg-emerald-500 text-white shadow-lg"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Job Openings */}
                <div className="max-w-3xl mx-auto mb-20">
                    {filteredJobs.map((job, i) => (
                        <JobCard key={job.title} job={job} delay={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
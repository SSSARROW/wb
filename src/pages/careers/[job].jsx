import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"  // Already imported
import { Briefcase, Send } from "lucide-react"
import { jobOpenings } from "../../data/jobs"  // Update the import path

export default function JobPage() {
    const { job: jobSlug } = useParams()
    const navigate = useNavigate()
    const job = jobOpenings.find((j) => j.slug === jobSlug)

    useEffect(() => {
        if (!job) {
            navigate('/careers')
        }
    }, [job, navigate])

    if (!job) return <div>Loading...</div>

    // Render helper: split into paragraphs on double-newline and preserve single newlines as <br/>
    const renderDescription = (text) => {
        if (!text) return null
        return text
            .split(/\n\s*\n/) // split paragraphs
            .map((para, idx) => {
                const lines = para.split('\n')
                return (
                    <p key={idx} className="text-zinc-400 mt-4 leading-relaxed">
                        {lines.map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < lines.length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                )
            })
    }

    return (
        <section className="py-24 min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Briefcase className="text-green-400" size={24} />
                        <h1 className="text-3xl font-bold text-white">{job.title}</h1>
                    </div>
                    <div className="flex gap-4 text-sm text-zinc-400 mb-4">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{job.title}</h1>
                        {/* Use renderer for better formatting */}
                        {renderDescription(job.fullDescription ? job.fullDescription : job.description)}
                    </div>
                </motion.div>

                {/* Apply Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    className="text-center"
                >
                    <button
                        onClick={() => navigate(`/careers/${job.slug}/apply`)}
                        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center"
                    >
                        <span>Apply Now</span>
                        <Send size={18} className="ml-2" />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
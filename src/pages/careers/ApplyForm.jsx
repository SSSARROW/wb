import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { Briefcase } from "lucide-react"
import { jobOpenings } from "../../data/jobs"

export default function ApplyForm() {
    const { job: jobSlug } = useParams()
    const navigate = useNavigate()
    const [iframeSrc, setIframeSrc] = useState(null)
    const [loaded, setLoaded] = useState(false)

    const job = jobOpenings.find((j) => j.slug === jobSlug)

    useEffect(() => {
        if (!job) navigate("/careers")
    }, [job, navigate])

    useEffect(() => {
        const rawId = import.meta.env.VITE_TALLY_FORM_ID || ""
        // prefer a per-job tallyFormId if provided; otherwise use env var or fallback
        const perJobId = job?.tallyFormId && !job.tallyFormId.includes("REPLACE_WITH") ? job.tallyFormId : ""
        const chosenId = perJobId || (rawId && !rawId.includes("VITE_TALLY_FORM_ID") ? rawId : "3jKg1R")
        if (!rawId && !perJobId) {
            console.warn("No Tally form id found — using fallback id:", chosenId)
        }
        const params = new URLSearchParams({
            transparentBackground: "1",
            originPage: typeof window !== "undefined" ? window.location.pathname : "/",
        })
        setIframeSrc(`https://tally.so/r/${chosenId}?${params.toString()}`)
    }, [job])

    useEffect(() => {
        if (typeof window === "undefined") return
        if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) return
        const s = document.createElement("script")
        s.src = "https://tally.so/widgets/embed.js"
        s.async = true
        document.body.appendChild(s)
    }, [])

    if (!job) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Loading…</div>

    return (
        <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950">
            {/* Sticky header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-zinc-300 hover:text-white px-2 py-1"
                            aria-label="Back"
                        >
                            ← Back
                        </button>
                        <div className="flex items-baseline gap-3">
                            <Briefcase className="text-green-400" size={18} />
                            <div>
                                <div className="text-lg font-semibold text-white leading-tight">{job.title}</div>
                                <div className="text-xs text-zinc-400 mt-1">{job.location} • {job.type}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.open(iframeSrc || "#", "_blank")}
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
                        >
                            Open form in new tab
                        </button>
                    </div>
                </div>
            </header>

            {/* Spacer so content sits below header */}
            <div className="pt-[64px]"></div>

            {/* Iframe area */}
            <div className="w-full h-[calc(100vh-64px)]">
                <div className="relative w-full h-full bg-zinc-900">
                    {!loaded && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
                                <div className="text-zinc-300 text-sm">Loading form…</div>
                            </div>
                        </div>
                    )}

                    {iframeSrc ? (
                        <iframe
                            title={`Apply — ${job.title}`}
                            src={iframeSrc}
                            className="absolute inset-0 w-full h-full border-0"
                            onLoad={() => setLoaded(true)}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400">Preparing form…</div>
                    )}
                </div>
            </div>
        </section>
    )
}
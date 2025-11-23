"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Code, Rocket, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

const processSteps = [
	{
		icon: <Lightbulb size={24} />,
		title: "Discovery & Planning",
		description:
			"We dive deep into your goals to create a clear, actionable roadmap. Our team aligns with your vision to ensure every step is purpose-driven.",
	},
	{
		icon: <Code size={24} />,
		title: "Design & Development",
		description:
			"Using modern frameworks, our developers build your solution with agile sprints, ensuring a transparent and flexible workflow from start to finish.",
	},
	{
		icon: <Rocket size={24} />,
		title: "Testing & Deployment",
		description:
			"Before launch, we rigorously test your product to ensure it's bug-free, secure, and ready for the world. We handle the deployment for a seamless transition.",
	},
	{
		icon: <MessageSquare size={24} />,
		title: "Support & Iteration",
		description:
			"Our partnership doesn't end at launch. We provide ongoing support, gather user feedback, and continuously improve the product based on real-world data.",
	},
];

const OurProcess = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const scrollContainerRef = useRef(null);
	const isScrolling = useRef(false);
	const touchStartX = useRef(null);

	// Handle wheel events with debouncing
	useEffect(() => {
		const handleWheel = (e) => {
			e.preventDefault();
			if (isScrolling.current) return;

			isScrolling.current = true;
			setTimeout(() => {
				isScrolling.current = false;
			}, 1200);

			if (e.deltaY > 0) {
				setCurrentStep((prev) => Math.min(prev + 1, processSteps.length - 1));
			} else {
				setCurrentStep((prev) => Math.max(prev - 1, 0));
			}
		};

		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener("wheel", handleWheel, { passive: false });
		}

		return () => {
			if (container) {
				container.removeEventListener("wheel", handleWheel);
			}
		};
	}, []);

	// Improved touch events for better mobile sensitivity
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleTouchStart = (e) => {
			touchStartX.current = e.touches[0].clientX;
		};

		const handleTouchMove = (e) => {
			if (!touchStartX.current || isScrolling.current) return;

			const touchEndX = e.touches[0].clientX;
			const deltaX = touchStartX.current - touchEndX;

			if (Math.abs(deltaX) > 30) {
				isScrolling.current = true;
				setTimeout(() => {
					isScrolling.current = false;
				}, 800);

				if (deltaX > 0) {
					setCurrentStep((prev) => Math.min(prev + 1, processSteps.length - 1));
				} else {
					setCurrentStep((prev) => Math.max(prev - 1, 0));
				}
				touchStartX.current = null;
			}
		};

		container.addEventListener("touchstart", handleTouchStart, { passive: true });
		container.addEventListener("touchmove", handleTouchMove, { passive: true });

		return () => {
			container.removeEventListener("touchstart", handleTouchStart);
			container.removeEventListener("touchmove", handleTouchMove);
		};
	}, []);

	// Navigation helpers for mobile buttons
	const goToPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
	const goToNext = () => setCurrentStep((prev) => Math.min(prev + 1, processSteps.length - 1));

	return (
		<section className="text-white relative py-20" id="process">
			{/* Centered Heading */}
			<div className="text-center mb-16 px-4">
				<h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-600 text-transparent bg-clip-text">
					Our Process
				</h2>
				<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
					We turn your ideas into reality through a proven, step-by-step approach.
				</p>
			</div>

			<div className="relative max-w-7xl mx-auto px-4">
				{/* Horizontal progress bar indicator */}
				<div className="w-full flex flex-col md:flex-row items-center justify-center mb-8 pt-8">
					<div className="relative w-full max-w-xl h-4 flex items-center">
						<div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full"></div>
						<motion.div
							className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
							style={{
								width: `${
									(currentStep / (processSteps.length - 1)) * 100
								}%`,
							}}
							transition={{
								type: "spring",
								stiffness: 120,
								damping: 25,
								duration: 1.2,
							}}
						></motion.div>
						{processSteps.map((step, idx) => (
							<motion.div
								key={idx}
								className={`absolute top-1/2 -translate-y-1/2 rounded-full border-2 ${
									idx <= currentStep
										? "border-green-500 bg-green-500"
										: "border-zinc-400 bg-zinc-800"
								}`}
								style={{
									left: `calc(${
										(idx / (processSteps.length - 1)) * 100
									}% - 10px)`,
									width: "20px",
									height: "20px",
									zIndex: 2,
								}}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 25,
									duration: 1.2,
								}}
							>
								<span className="block w-full h-full flex items-center justify-center text-xs text-white font-bold">
									{idx + 1}
								</span>
							</motion.div>
						))}
					</div>
					<div className="mt-4 md:mt-0 md:ml-4 text-xs text-zinc-400 font-semibold whitespace-nowrap">
						Step {currentStep + 1} / {processSteps.length}
					</div>
				</div>

				{/* Cards container - switched to CSS Grid for better mobile flow */}
				<div
					ref={scrollContainerRef}
					className="relative w-full overflow-hidden py-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
					style={{ minHeight: "300px" }}
				>
					{processSteps.map((step, idx) => {
						const isActive = idx === currentStep;
						const isPrevious = idx === currentStep - 1;
						const isNext = idx === currentStep + 1;
						const isVisible = isActive || isPrevious || isNext;

						return (
							<motion.div
								key={idx}
								className={`flex flex-col items-center justify-center text-center border-2 transition-all duration-1000 ease-in-out ${
									isActive
										? "w-full md:w-[600px] h-auto md:h-[320px] scale-100 opacity-100 bg-gradient-to-br from-zinc-800 to-zinc-900 border-green-500 shadow-[0_12px_48px_rgba(0,255,128,0.3)]"
										: isVisible
										? "w-full md:w-[200px] h-auto md:h-[120px] scale-95 opacity-70 bg-zinc-800 border-transparent shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
										: "w-full md:w-[200px] h-auto md:h-[120px] scale-90 opacity-0 bg-zinc-800 border-transparent"
								} ${!isVisible ? "hidden md:block" : ""}`}
								style={{
									borderRadius: "16px",
									zIndex: isActive ? 10 : 1,
								}}
								aria-live={isActive ? "polite" : "off"}
							>
								<div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-green-500">
									{step.icon}
								</div>
								<AnimatePresence mode="wait">
									{isActive && (
										<motion.div
											key={`content-${idx}`}
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -30 }}
											transition={{
												type: "spring",
												stiffness: 80,
												damping: 18,
												duration: 0.8,
												ease: "easeInOut",
											}}
											className="mt-6 px-4"
										>
											<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
												{step.title}
											</h3>
											<p className="text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
												{step.description}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
				</div>

				{/* Mobile navigation buttons */}
				<div className="flex justify-center gap-4 mt-8 md:hidden">
					<button
						onClick={goToPrevious}
						disabled={currentStep === 0}
						className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white disabled:opacity-50"
						aria-label="Previous step"
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={goToNext}
						disabled={currentStep === processSteps.length - 1}
						className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white disabled:opacity-50"
						aria-label="Next step"
					>
						<ChevronRight size={24} />
					</button>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="mt-16 text-center">
				<p className="mb-6 font-semibold text-green-400">
					Swipe or use your mouse wheel to explore.
				</p>
				<div className="inline-block p-0.5 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
					<a
						href="#contact"
						className="bg-zinc-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors duration-300 cursor-pointer inline-block"
					>
						Let's Start Your Project Today
					</a>
				</div>
			</div>
		</section>
	);
};

export default OurProcess;
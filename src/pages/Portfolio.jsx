import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';

const projects = [
  {
    id: 1,
    title: "The Cinematic Epicurean",
    category: "Culinary Experience",
    description: "A multisensory dining platform that treats every signature dish as a performance, blending the art of fine dining with cinematic storytelling.",
    image: img1,
    color: "#eab308",
    url: "/projects/epicurean/index.html"
  },
  {
    id: 2,
    title: "Kinetic Athletics",
    category: "Fitness & Performance",
    description: "Unleash the power of performance. A high-impact digital showcase for the next generation of athletic apparel and gear.",
    image: img2,
    color: "#f97316",
    url: "/projects/kinetic/index.html"
  },
  {
    id: 3,
    title: "Curator Architecture",
    category: "Global Landmarks",
    description: "Crafting modern landmarks that redefine urban skylines. A dedicated showcase of architectural excellence and visionary design.",
    image: img3,
    color: "#a8a29e",
    url: "/projects/architecture/index.html"
  },
  {
    id: 4,
    title: "The Obsidian Eterna",
    category: "Luxury Horology",
    description: "The peak of watchmaking where timeless craftsmanship meets avant-garde mechanical engineering and precision.",
    image: img4,
    color: "#d4af37",
    url: "/projects/horologe/index.html"
  },
  {
    id: 6,
    title: "Obsidian Velocity",
    category: "Performance Automotive",
    description: "Mastering the road with the apex of velocity. A premium digital showroom for high-performance vehicles designed for pure speed and elegance.",
    image: img6,
    color: "#ef4444",
    url: "/projects/velocity/index.html"
  },
  {
    id: 7,
    title: "Luminous Atelier",
    category: "Wellness & Skincare",
    description: "Radiance reimagined. a bespoke skincare and wellness platform focusing on pure, uncompromising luxury and scientific skin health for the modern soul.",
    image: img7,
    color: "#ec4899",
    url: "/projects/luminous/index.html"
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-transparent text-white pb-20">
      <section className="container mx-auto px-6 py-12 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-400 to-emerald-600 text-transparent bg-clip-text leading-tight">
            Our Digital <br /> Masterpieces
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
            Witness the fusion of innovation and elegance. Each project is a testament to our commitment to excellence and high-end digital craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Decorative background element */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
    </div>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.2 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-gray-900 border border-white/10 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-all duration-500">
          <div>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-emerald-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 block"
            >
              {project.category}
            </motion.span>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300"
            >
              {project.title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-xs md:text-sm leading-relaxed opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 group-hover:translate-y-0 line-clamp-3"
            >
              {project.description}
            </motion.p>
          </div>
        </div>

        {/* Action Button */}
        <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 cursor-pointer border border-white/20 hover:bg-emerald-500 hover:border-emerald-500">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Subtle outer glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-zinc-950/80 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-3xl"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all transform hover:rotate-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:min-h-[600px]">
          {/* Image Side */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Content Side */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <span className="text-emerald-400 font-bold tracking-[0.3em] text-sm uppercase mb-6 block">
              {project.category}
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              {project.title}
            </h2>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-zinc-500 bg-zinc-800/30 px-4 py-2 rounded-xl w-fit border border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Interactive Design Showcase</span>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => window.open(project.url, '_blank')}
                  className="px-10 py-4 bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all flex items-center gap-2"
                >
                  Explore Design <ExternalLink className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed max-w-[200px]">
                  Note: This is a high-fidelity design concept for visual demonstration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;

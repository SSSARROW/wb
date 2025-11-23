"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "94763581264";
    const message = "Hello! I'm interested in your services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={24} />

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
        </div>
      </button>
    </motion.div>
  );
}
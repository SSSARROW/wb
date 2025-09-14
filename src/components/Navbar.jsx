import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/logo.png"; // Import the logo

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  };

  // Helper to navigate to home page and scroll to a section (without hash in URL)
  const navigateToSection = (sectionId) => {
    navigate("/"); // Navigate to home page without hash
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Small delay to ensure page loads
    setIsMenuOpen(false); // Close mobile menu
  };

  // Helper for logo click: Always go to home and scroll to hero (without hash in URL)
  const handleLogoClick = () => {
    navigate("/"); // Navigate to home page without hash
    setTimeout(() => {
      const element = document.getElementById("hero");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "h-16 bg-emerald-950 shadow-lg backdrop-blur-sm"
          : "h-20 bg-emerald-950 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-16 h-full">
        {/* Logo */}
        <motion.a
          onClick={handleLogoClick}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 cursor-pointer flex items-center h-full"
        >
          <img
            src={logo} // Use the imported logo
            alt="Logo"
            className="w-36 md:w-48 hover:scale-110 transition-transform duration-300"
          />
        </motion.a>

        {/* Desktop Menu */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden xl:flex justify-end gap-10 font-medium text-base ml-auto"
        >
          {["Why Us?", "Services", "Process", "Careers"].map((item, index) => {
            const sectionId = item === "Why Us?" ? "why" : item.toLowerCase();
            return (
              <motion.li
                key={item}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="relative group"
              >
                <a
                  onClick={() => {
                    if (item === "Careers") {
                      navigate("/careers"); // Navigate to careers page
                      setIsMenuOpen(false);
                    } else {
                      navigateToSection(sectionId); // Scroll to section on home page without hash
                    }
                  }}
                  className="p-2 text-white hover:text-emerald-400 transition-colors duration-300 cursor-pointer"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            );
          })}
          <motion.li custom={4} initial="hidden" animate="visible" variants={fadeIn}>
            <a
              onClick={() => navigateToSection("contact")}
              className="px-5 py-2 bg-emerald-500 text-white rounded-lg font-semibold shadow-md hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer"
            >
              Contact Us
            </a>
          </motion.li>
        </motion.ul>

        {/* Mobile Menu Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden relative z-10 p-2 rounded-md hover:bg-emerald-800 transition-colors"
        >
          <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"} text-3xl text-white`}></i>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="xl:hidden overflow-hidden bg-emerald-950 text-white w-full shadow-lg"
      >
        <div className="container mx-auto px-6 py-4">
          <ul className="flex flex-col space-y-3">
            {["Why Us?", "Services", "Process", "Careers"].map((item, index) => {
              const sectionId = item === "Why Us?" ? "why" : item.toLowerCase();
              return (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    onClick={() => {
                      if (item === "Careers") {
                        navigate("/careers"); // Navigate to careers page
                        setIsMenuOpen(false);
                      } else {
                        navigateToSection(sectionId); // Scroll to section on home page without hash
                      }
                    }}
                    className="block p-3 rounded-md hover:bg-emerald-500/20 transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </motion.li>
              );
            })}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <a
                onClick={() => navigateToSection("contact")}
                className="block p-3 bg-emerald-500 rounded-md text-center font-semibold cursor-pointer"
              >
                Contact Us
              </a>
            </motion.li>
          </ul>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
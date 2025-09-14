"use client"
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Our Process", href: "#process" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
        { name: "Mobile Apps", href: "#services" },
        { name: "Custom Software", href: "#services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/senxdev" },
    { icon: <Instagram size={18} />, href: "https://instagram.com/senxdev/" },
  ]

  return (
  <footer className="border-t border-green-500/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              SRSM3dia
            </div>
            <p className="text-gray-400 max-w-xs">
              We create innovative software solutions that drive business growth and transform ideas into reality.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 rounded-md text-gray-400 hover:bg-green-500/20 hover:text-green-400 transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-white font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight
                        size={14}
                        className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center text-gray-400">
              <Mail size={18} className="mr-3 text-green-400" />
              <span>support@senxdev.com</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone size={18} className="mr-3 text-green-400" />
              <span>+94 76 358 1264</span>
            </div>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© {currentYear} SenXDev. All rights reserved.</p>
        </div>

        {/* Newsletter (Optional) */}
        
      </div>
    </footer>
  )
}

export default Footer


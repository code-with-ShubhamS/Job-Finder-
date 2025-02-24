import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiGithub } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="border-t border-gray-800 text-white py-10 px-4 md:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold  mb-2"><span className="text-blue-500">Job</span>Finder</h2>
          <p className="text-sm opacity-90">
            © 2025 JobFinder. Created by Shubham
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center md:justify-start">
          <a
            href="https://github.com/code-with-ShubhamS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl transition-all duration-300 hover:text-[#3b5998] hover:-translate-y-1"
            aria-label="Facebook"
          >
            <FiGithub/>
          </a>
          <a
            href="https://twitter.com/Shubham_code12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl transition-all duration-300 hover:text-[#1da1f2] hover:-translate-y-1"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-semwal-4080962b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl transition-all duration-300 hover:text-[#0077b5] hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/s_semwal_ji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl transition-all duration-300 hover:text-[#e1306c] hover:-translate-y-1"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer

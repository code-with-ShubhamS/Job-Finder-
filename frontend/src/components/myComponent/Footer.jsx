import { Link } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-white">
            {/* Logo Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-blue-500">Job</span>Finder
              </h2>
              <p className="text-gray-400">Connecting talent with opportunity.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-blue-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-blue-500">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/post" className="hover:text-blue-500">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@jobfinder.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Business Street, NY 10001</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-blue-500">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-500">
                  LinkedIn
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-500">
                  Facebook
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 JobFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer

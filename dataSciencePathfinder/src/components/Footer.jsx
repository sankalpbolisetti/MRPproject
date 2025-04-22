import React from 'react';
import ContactForm from './ContactForm';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Footer = ({ darkMode }) => {
  const location = useLocation();
  return (
    <footer className={`py-4 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} relative z-10`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              DataSciencePathFinder
            </h3>
            <ul className="space-y-2">
      <li>
        <a href="#about" className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          About Us
        </a>
      </li>
      <li>
        <a href="#team" className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Our Team
        </a>
      </li>
      {/* <li>
        <a href="#careers" className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Careers
        </a>
      </li>
      <li>
        <a href="#blog" className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Blog
        </a>
      </li> */}
      <li>
        <Link 
          to="/powerbidashboard" 
          className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Dashboard
        </Link>
      </li>
    </ul>
          </div>
          
          
          {/* Contact Form Column - Takes up more space */}
          {/* {location.pathname === '/' && (
        <div className="lg:col-span-1 md:col-span-2">
          <ContactForm darkMode={darkMode} />
        </div>
      )} */}
        </div>
        
        <div className={`pt-4 mt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} flex flex-col md:flex-row justify-between items-center`}>
          <p>&copy; {new Date().getFullYear()} DataSciencePathFinder. All rights reserved.</p>
          
          {/* Social Links */}
          {/* <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className={`text-${darkMode ? 'gray-400 hover:text-white' : 'gray-600 hover:text-gray-900'} transition-colors`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
              </svg>
            </a>
            <a href="#" className={`text-${darkMode ? 'gray-400 hover:text-white' : 'gray-600 hover:text-gray-900'} transition-colors`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className={`text-${darkMode ? 'gray-400 hover:text-white' : 'gray-600 hover:text-gray-900'} transition-colors`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className={`text-${darkMode ? 'gray-400 hover:text-white' : 'gray-600 hover:text-gray-900'} transition-colors`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
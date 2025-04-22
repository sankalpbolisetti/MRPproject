import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import GoogleAuthModal from "./GoogleAuthModal";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/authService";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Open auth modal
  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  // Close auth modal
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false); // Close menu after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Common link class for desktop navigation
  const desktopLinkClass = `font-medium ${
    darkMode
      ? "text-gray-300 hover:text-blue-400"
      : "text-gray-700 hover:text-indigo-600"
  } transition-colors`;

  // Common link class for dropdown items
  const dropdownItemClass = `block px-4 py-2 text-sm ${
    darkMode
      ? "text-gray-300 hover:bg-gray-700"
      : "text-gray-700 hover:bg-gray-100"
  }`;

  // Common link class for mobile navigation
  const mobileLinkClass = `py-3 px-2 rounded-lg font-medium ${
    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
  }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full ${
          darkMode
            ? "bg-gray-800/90 border-gray-700"
            : "bg-white/90 border-gray-200"
        } border-b backdrop-blur-md z-50 transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {/* Using an img element for the SVG logo from public folder */}
            <img 
              src="/logo.svg" 
              alt="DataScience Pathfinder Logo" 
              className={`w-16 h-16 mr-3 ${darkMode ? 'invert' : ''}`}
            />
            <span
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              DataScience
              <span className={darkMode ? "text-blue-400" : "text-indigo-600"}>
                Pathfinder
              </span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {location.pathname==="/" && (<a href="#" className={desktopLinkClass}>
              Home
            </a>)}
            {location.pathname==="/" && ( <a href="/#aboutUs" className={desktopLinkClass}>
              About Us
            </a>)}
            {location.pathname==="/" && (<a href="/#team" className={desktopLinkClass}>
              Leadership
            </a>)}
            <Link to="/powerbidashboard" className={desktopLinkClass}>
              Dashboard
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className={`px-5 py-2 rounded-full ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white transition-colors flex items-center gap-2`}
                >
                  {currentUser?.displayName ||
                    currentUser?.email?.split("@")[0] ||
                    "Account"}
                </button>
                <div
                  className={`absolute right-0 mt-2 w-48 py-2 rounded-md shadow-xl hidden group-hover:block ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <Link to="/applied-jobs" className={dropdownItemClass}>
                    Applied Jobs
                  </Link>
                  <Link to="/powerbidashboard" className={dropdownItemClass}>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`${dropdownItemClass} w-full text-left`}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className={`px-5 py-2 rounded-full ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors`}
              >
                Sign In / Sign Up
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>

          {/* Mobile Controls - Only show menu toggle and theme toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide down when open */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } shadow-lg`}
        >
          <nav className="flex flex-col space-y-1 px-4 py-2">
            <a href="#" className={mobileLinkClass}>
              Home
            </a>
            <a href="#" className={mobileLinkClass}>
              About Us
            </a>
            <Link to="/powerbidashboard" className={mobileLinkClass}>
              Dashboard
            </Link>

            {isAuthenticated ? (
              <>
                <div
                  className={`my-2 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                ></div>
                <Link to="/profile" className={mobileLinkClass}>
                  Profile
                </Link>
                <Link to="/applied-jobs" className={mobileLinkClass}>
                  Applied Jobs
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${mobileLinkClass} text-left w-full ${
                    darkMode ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                  setIsMenuOpen(false);
                }}
                className={`mt-2 mb-2 py-3 px-4 rounded-lg font-medium text-center ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors`}
              >
                Sign In / Sign Up
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Auth Modal */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        darkMode={darkMode}
      />
    </>
  );
};

export default Header;
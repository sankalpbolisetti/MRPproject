import {React,useState} from "react";
import { ChevronRight, Brain, BarChart2, MessageSquare,Code,X } from "lucide-react";
import GoogleAuthModal from './GoogleAuthModal';
import { useNavigate } from 'react-router-dom';  
import TeamSection from "./TeamSection";
import ContactForm from "./ContactForm";    
const MainContent = ({ darkMode }) => {
const navigate = useNavigate();
const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  // Close auth modal
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };
    // Toggle contact form
    const toggleContactForm = () => {
        setIsContactFormOpen(!isContactFormOpen);
      };
    
      // Inline shake animation style
      const shakeButtonStyle = {
        animation: 'shake 1.5s cubic-bezier(.36,.07,.19,.97) infinite',
      };
    
      const hoverStyle = {
        animation: 'none',
      };
    
      // State to track hover
      const [isHovered, setIsHovered] = useState(false);
  return (
    <main>
      {/* Hero Section */}
      <section id="#" className="relative pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Find Your Perfect{" "}
              <span className={darkMode ? "text-blue-400" : "text-indigo-600"}>
                Data Science
              </span>{" "}
              Match
            </h1>
            <p
              className={`text-lg md:text-xl mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Match your skills with industry requirements and discover the
              perfect data science opportunities tailored specifically for you.
              
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
              onClick={openAuthModal}
                className={`px-6 py-3 rounded-full ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode ? "focus:ring-blue-500" : "focus:ring-indigo-500"
                }`}
              >
                Get Started Now
              </button>
              {/* <button
                onClick={() => navigate('/powerbidashboard')}
                className={`px-6 py-3 rounded-full ${
                  darkMode
                    ? "bg-transparent text-blue-400 border border-blue-400 hover:bg-blue-900/20"
                    : "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                } font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none`}
              >
                Explore Skills
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="aboutUs"
        className={`py-20 ${
          darkMode ? "bg-gray-800/50" : "bg-white/80"
        } relative z-10`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose DatasciencePathFinder
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover how our platform can transform your data science career
              journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-white hover:bg-gray-50 border border-indigo-100 hover:border-indigo-200"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600/20 text-blue-400"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <Brain className="w-7 h-7" />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Personalized Learning Paths
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Select your current proficiency and get a tailored list of
                skills to master.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600/20 text-blue-400"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <BarChart2 className="w-7 h-7" />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Quality Learning Resources
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Curated videos, articles, and courses to learn efficiently — no
                fluff.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600/20 text-blue-400"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <Code className="w-7 h-7" />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Skill Tracking
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Track your progress and mark skills as complete as you go
              </p>
            </div>
            <div
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600/20 text-blue-400"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <Code className="w-7 h-7" />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Job Matching
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Once you complete your learning path, we connect you to real job
                listings relevant to your new skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-20 ${
          darkMode ? "bg-gray-800/50" : "bg-white/80"
        } relative z-10`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              How It Works
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Five simple steps to find your perfect data science match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines (Desktop Only) */}
            <div className="absolute top-24 left-0 w-full h-1 hidden lg:block">
              {/* <div
                className={`h-full ${
                  darkMode ? "bg-blue-600/30" : "bg-indigo-600/30"
                }`}
              ></div> */}
            </div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-indigo-600 text-white"
                } shadow-lg`}
              >
                1
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Sign Up & Set Your Proficiency
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Choose whether you're a Beginner, Mid Level, or Proffesional in
                your field.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-indigo-600 text-white"
                } shadow-lg`}
              >
                2
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Discover Skills You Need
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Get a customized roadmap of skills based on your level and
                target role.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-indigo-600 text-white"
                } shadow-lg`}
              >
                3
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Learn With Curated Resources
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Access high-quality learning material handpicked for each skill
                — videos, tutorials, articles, and projects.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-indigo-600 text-white"
                } shadow-lg`}
              >
                4
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Track Progress & Skill Completion
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Mark skills as “Completed” as you finish learning them. Get
                visual feedback on your journey.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-indigo-600 text-white"
                } shadow-lg`}
              >
                5
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Unlock Job Opportunities
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Once you've completed your roadmap, get redirected to job
                listings tailored to your skills and career goals.
              </p>
            </div>
          </div>

          {/* <div className="mt-16 text-center">
            <button
              className={`px-6 py-3 rounded-full ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-medium transition-all duration-300 flex items-center mx-auto`}
            >
              Learn More <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div> */}
        </div>
      </section>
      
            <section id="team">
              <TeamSection  darkMode={darkMode} />
              </section>
      {/* Call to Action Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div
            className={`rounded-2xl ${
              darkMode
                ? "bg-gradient-to-r from-blue-900/50 to-indigo-900/50"
                : "bg-gradient-to-r from-indigo-50 to-blue-50"
            } p-10 md:p-16 shadow-xl`}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ready to Advance Your Data Science Career?
              </h2>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Join thousands of data professionals who have found their
                perfect skill match. Start your journey today.
              </p>
              <button
               onClick={openAuthModal} 
                className={`px-8 py-4 rounded-full ${
                  darkMode
                    ? "bg-white text-blue-700"
                    : "bg-indigo-600 text-white"
                } font-medium text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={toggleContactForm}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={isHovered ? hoverStyle : shakeButtonStyle}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg 
        ${darkMode ? "bg-blue-600 text-white" : "bg-indigo-600 text-white"}
        transition-all duration-300 flex items-center justify-center`}
        title="Contact Us"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleContactForm} // Close when clicking the overlay
          ></div>
          <div className={`relative max-w-md w-full rounded-lg overflow-hidden shadow-xl transition-all transform duration-300 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                Contact Us
              </h3>
              <button 
                onClick={toggleContactForm}
                className={`rounded-full p-1 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <X className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
              </button>
            </div>
            <div className="p-4">
              <ContactForm darkMode={darkMode} />
            </div>
          </div>
        </div>
      )}
      <GoogleAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        darkMode={darkMode}
      />
    </main>
  );
};

export default MainContent;

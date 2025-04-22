import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from "@emailjs/browser";

const ContactForm = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .send(
        "service_8g8uv5r", // Replace with your EmailJS Service ID
        "template_n9jkeua", // Replace with your EmailJS Template ID
        formData,
        "twBmEt6JjSuspvFn3" // Replace with your EmailJS Key
      )
      .then(
        (response) => {
          console.log("Success:", response);
          setSubmitStatus("success");
          setIsSubmitting(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => {
            setSubmitStatus("");
          }, 2000);
        },
        (error) => {
          console.log("Error:", error);
          setSubmitStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-800/80' : 'bg-white shadow-md'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Contact Us <span className={darkMode ? 'text-blue-400' : 'text-indigo-600'}>/</span> Have a Suggestion?
      </h3>
      
      {submitStatus === 'success' && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-green-900/30 text-green-200' : 'bg-green-50 text-green-700'}`}>
          <CheckCircle className="w-5 h-5" />
          <p>Message sent successfully! We'll get back to you soon.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-red-900/30 text-red-200' : 'bg-red-50 text-red-700'}`}>
          <AlertCircle className="w-5 h-5" />
          <p>Failed to send message. Please try again later.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Name and Email in one row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border border-gray-600 text-white focus:ring-blue-500' 
                  : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500'
              }`}
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border border-gray-600 text-white focus:ring-blue-500' 
                  : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500'
              }`}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 border border-gray-600 text-white focus:ring-blue-500' 
                : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500'
            }`}
          />
        </div>
        
        <div>
          <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            required
            rows="4"
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 resize-none ${
              darkMode 
                ? 'bg-gray-700 border border-gray-600 text-white focus:ring-blue-500' 
                : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500'
            }`}
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50' 
              : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400'
          } disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
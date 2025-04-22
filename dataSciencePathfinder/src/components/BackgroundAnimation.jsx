import React from 'react';
import { Database, BarChart2, Brain, GitBranch, PieChart, Code } from 'lucide-react';

const BackgroundAnimation = ({ darkMode }) => {
  return (
    <>
      {/* Data Science Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated gradients */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-transparent via-blue-600/30 to-transparent animate-gradient-shift" 
            style={{ animationDuration: '15s' }}></div>
          <div className="absolute w-full h-full bg-gradient-to-tr from-transparent via-indigo-600/20 to-transparent animate-gradient-shift-reverse" 
            style={{ animationDuration: '18s' }}></div>
          {darkMode && (
            <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-purple-600/20 to-transparent animate-gradient-shift" 
              style={{ animationDuration: '20s' }}></div>
          )}
        </div>
        
        {/* Animated nodes and connections */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Animated circles */}
            <circle cx="20" cy="20" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse-slow" />
            <circle cx="80" cy="15" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse-slower" />
            <circle cx="40" cy="80" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse" />
            <circle cx="65" cy="60" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse-slow" />
            <circle cx="75" cy="75" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse-slower" />
            <circle cx="25" cy="60" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse" />
            <circle cx="15" cy="85" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse-slow" />
            <circle cx="90" cy="50" r="1" fill={darkMode ? "#60a5fa" : "#4338ca"} className="animate-pulse-slower" />
            
            {/* Animated lines */}
            <path d="M20,20 L80,15 L65,60 L40,80 Z" fill="none" stroke={darkMode ? "#3b82f6" : "#4f46e5"} strokeWidth="0.2" strokeDasharray="1" className="animate-line-draw" />
            <path d="M25,60 L40,80 L75,75 L90,50" fill="none" stroke={darkMode ? "#3b82f6" : "#4f46e5"} strokeWidth="0.2" strokeDasharray="1" className="animate-line-draw-reverse" />
            <path d="M15,85 L25,60 L65,60 L80,15" fill="none" stroke={darkMode ? "#3b82f6" : "#4f46e5"} strokeWidth="0.2" strokeDasharray="1" className="animate-line-draw-slow" />
          </svg>
        </div>
        
        {/* Moving particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute rounded-full ${i % 3 === 0 ? 'animate-particle1' : i % 3 === 1 ? 'animate-particle2' : 'animate-particle3'}`}
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.4,
                backgroundColor: darkMode ? 
                  ['#60a5fa', '#818cf8', '#a78bfa'][Math.floor(Math.random() * 3)] : 
                  ['#4f46e5', '#4338ca', '#3730a3'][Math.floor(Math.random() * 3)],
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating data elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i + 'icon'}
              className={`absolute opacity-20`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${15 + Math.random() * 15}s infinite ease-in-out, spin ${30 + Math.random() * 40}s infinite linear`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              {i % 6 === 0 && <Database className={`w-10 h-10 text-${darkMode ? 'blue-500' : 'indigo-600'}`} />}
              {i % 6 === 1 && <BarChart2 className={`w-12 h-12 text-${darkMode ? 'blue-500' : 'indigo-600'}`} />}
              {i % 6 === 2 && <Brain className={`w-14 h-14 text-${darkMode ? 'blue-400' : 'indigo-500'}`} />}
              {i % 6 === 3 && <GitBranch className={`w-16 h-16 text-${darkMode ? 'blue-500' : 'indigo-600'}`} />}
              {i % 6 === 4 && <PieChart className={`w-8 h-8 text-${darkMode ? 'blue-400' : 'indigo-500'}`} />}
              {i % 6 === 5 && <Code className={`w-10 h-10 text-${darkMode ? 'blue-500' : 'indigo-600'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Animation definitions */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradientShift {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          50% {
            transform: translate(0%, 0%) rotate(180deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0% {
            r: 1;
            opacity: 0.3;
          }
          50% {
            r: 1.5;
            opacity: 0.8;
          }
          100% {
            r: 1;
            opacity: 0.3;
          }
        }
        
        @keyframes lineDraw {
          0% {
            stroke-dashoffset: 200;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
        
        @keyframes particle1 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-200px) translateX(-50px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-300px) translateX(100px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-400px) translateX(0);
            opacity: 0.2;
          }
        }
        
        @keyframes particle2 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-100px) translateX(-100px);
            opacity: 0.6;
          }
          66% {
            transform: translateY(-200px) translateX(80px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-400px) translateX(-50px);
            opacity: 0.2;
          }
        }
        
        @keyframes particle3 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          20% {
            transform: translateY(-80px) translateX(20px);
            opacity: 0.2;
          }
          40% {
            transform: translateY(-160px) translateX(-40px);
            opacity: 0.6;
          }
          60% {
            transform: translateY(-240px) translateX(60px);
            opacity: 0.4;
          }
          80% {
            transform: translateY(-320px) translateX(-30px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-400px) translateX(10px);
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        
        .animate-gradient-shift {
          animation: gradientShift 15s infinite ease-in-out;
        }
        
        .animate-gradient-shift-reverse {
          animation: gradientShift 15s infinite ease-in-out reverse;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s infinite ease-in-out;
        }
        
        .animate-pulse-slower {
          animation: pulse 6s infinite ease-in-out;
        }
        
        .animate-line-draw {
          animation: lineDraw 20s infinite linear;
        }
        
        .animate-line-draw-reverse {
          animation: lineDraw 15s infinite linear reverse;
        }
        
        .animate-line-draw-slow {
          animation: lineDraw 25s infinite linear;
        }
        
        .animate-particle1 {
          animation: particle1 20s infinite linear;
        }
        
        .animate-particle2 {
          animation: particle2 18s infinite linear;
        }
        
        .animate-particle3 {
          animation: particle3 25s infinite linear;
        }
      `}</style>
    </>
  );
};

export default BackgroundAnimation;
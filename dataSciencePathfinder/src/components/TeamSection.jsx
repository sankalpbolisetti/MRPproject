import { React } from "react";
import { Users, Database, Code, LineChart, Brain, Lightbulb } from "lucide-react";

const TeamSection = ({ darkMode }) => {
  // Team members data array
  const teamMembers = [
    {
      name: "Sankalp Bolisetti",
      role: "Project Manager",
      description: "Responsible for planning, executing, and overseeing projects to ensure they are completed on time, within scope",
      icon: "/Man.jpg"
    },
    {
      name: "Mohan Jayaram Krishna Bojanapalli",
      role: "Front end Developer",
      description: "Responsible for creating and implementing the visual and interactive elements of a website or application that users engage with directly",
      icon: "/Man.jpg"
    },
    {
      name: "Anil Kumar Bekkam",
      role: "Backend Developer",
      description: "Responsible for building and maintaining the server-side logic, databases, and APIs that power the functionality of web applications",
      icon: "/Man.jpg"
    },
    {
      name: "Charan Reddy Marri",
      role: "Dashboard developer",
      description: "Responsible for designing and implementing interactive data visualizations and dashboards to present key metrics and insights for informed decision-making",
      icon: "/Man.jpg"
    },
    {
      name: "Manasa maram",
      role: "Tester",
      description: "Responsible for evaluating software applications to identify bugs, ensure functionality, and verify that the product meets specified requirements and quality standards",
      icon: "/women.jpg"
    },
    {
      name: "Rahul Boini",
      role: "Front end developer",
      description: "Responsible for ensuring a seamless and responsive user experience by translating design mockups into functional web interfaces using HTML, CSS, and JavaScript",
      icon: "/Man.jpg"
    }
  ];

  return (
    <section
        className={`py-20 ${
          darkMode ? "bg-gray-800/50" : "bg-white/80"
        } relative z-10`}
      >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Meet Our Team
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            The experts behind DatasciencePathFinder dedicated to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 "
                  : "bg-white hover:bg-gray-50 border border-indigo-100 hover:border-indigo-200"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center`}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                <img 
                  src={member.icon} 
                  alt={`${member.name} - ${member.role}`}
                  className={`w-full h-full object-cover rounded-full ${
                    darkMode 
                      ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800" 
                      : "ring-2 ring-indigo-200 ring-offset-2 ring-offset-white"
                  }`}
                />
              </div>
              <h3 className={`text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {member.name}
              </h3>
              <p className={`font-medium mb-3 ${darkMode ? "text-blue-400" : "text-indigo-600"}`}>
                {member.role}
              </p>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
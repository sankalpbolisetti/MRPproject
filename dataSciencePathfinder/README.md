# Datascience Pathfinder Application 🚀 - Team 08
## Empowering Career Decisions in Data Science

### 📝 Project Description
The Employability Analytics Application is a comprehensive platform designed to help aspiring data scientists navigate their career journey. By leveraging big data and personalized insights, the application addresses critical challenges in data science career preparation, including:
- Overwhelming resource availability
- Skill definition and development
- Practical experience acquisition
- Career path uncertainty

### 🎯 Key Objectives
- Create confidence in career readiness
- Provide portfolio and interview preparation support
- Close skill requirement gaps
- Offer an efficient learning pathway for data science aspirants

### ✨ Key Features

1. **Comprehensive Job Market Analysis**
   - Interactive charts and graphs
   - Industry trends exploration
   - Growth projections
   - Emerging and declining sectors

2. **Skill Gap Analyzer**
   - Assess current skills against desired roles
   - Personalized skill development recommendations
   - Courses and certification suggestions

3. **Salary Insights**
   - Detailed salary information
   - Role-based earnings potential
   - Location and experience level comparisons

4. **Career Path Simulator**
   - Visualize potential career trajectories
   - Progression path exploration
   - Key career milestones mapping

5. **Geographic Opportunity Explorer**
   - Job opportunities across locations
   - Cost of living considerations
   - Industry concentration analysis


### 👥 Target Users
- Recent graduates
- Professionals transitioning to data science
- Career explorers interested in data science

### 🛠 Technology Stack
Frontend
React.js – JavaScript library for building user interfaces
Tailwind CSS – Utility-first CSS framework for styling
Axios – Promise-based HTTP client for API requests
Vite – Fast build tool and development server

🔹 Backend
Spring Boot – Framework for rapid backend development
Spring Data JPA – ORM (Object-Relational Mapping) for managing database interactions
Spring Security – Security framework to protect and authorize API endpoints
Maven – Project and dependency management build tool
Project Lombok – Reduces boilerplate code with annotations for model classes

🔹 Database
MySQL – Relational database management system for data storage

🔹 Development Tools
Postman – API testing and data seeding tool
VS Code – Code editor used for frontend development
IntelliJ IDEA – IDE used for backend development with Spring Boot

🔹 API Used
Rapid API (To Fetch jobs posted within 24 hrs)

🔹 Services Used
Firebase (Used for Authentication)
EmailJS (Used for contact support)

### 🚀 How to Run the Application
Follow the steps below to run both the frontend and backend applications locally:

🔸 1. Start the Frontend Application
Open VS Code
Navigate to the project folder (if not already there):
cd dataSciencePathFinder
Run the development server:
npm install  # Only required for first-time setup
npm run dev
Note: The frontend runs by default on http://localhost:5173. If this port is changed, make sure to update the CORS configuration in the backend accordingly.

🔸 2. Ensure MySQL is Running
Open MySQL Workbench or your preferred DB management tool.

Make sure the MySQL server is running before starting the backend.

Confirm database configurations in the backend application.properties file (host, port, user, password, DB name).

🔸 3. Start the Backend Application
Open IntelliJ IDEA

Load the backend project

Locate and run the main class: DatasciencepathfinderApplication.java
The backend server will start on port 1616 (configured in application.properties).
🔧 Default Spring Boot port is 8080, but it's customized to run on 1616 for this project.

🔸 4. Open the Application
Once both frontend and backend servers are running, open your browser and navigate to:
http://localhost:5173

### 🤝 Contributing
We welcome contributions! If you're interested in improving the Employability Analytics Application, please reach out to the project team.

### 📚 References
- Coursera. (2023). Data Science Career Roadmap
- Dar, P. (2020). Transitioning into Data Science
- Eliacik, E. (2023). Is Data Science a Good Career?
- Dataset: glassdoor_datascience_skills_with_udemy.csv
This dataset contains extracted and combined information related to data science job skills listed on Glassdoor and matched with relevant Udemy courses. It was curated for educational and analytical purposes to explore industry demand and learning resources alignment.

### 🙏 Acknowledgements
Project developed by Team 08 for IS-5960-Masters Research Project at Saint Louis University's School of Professional Studies.

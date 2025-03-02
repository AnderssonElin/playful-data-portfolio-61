
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProjectDetails from "../pages/ProjectDetails";
import { useIsMobile } from "@/hooks/use-mobile";

const projectsData = [
  {
    id: 1,
    title: "Power BI report in Sales",
    description: "A Power BI solution integrating data modeling, advanced DAX calculations, and interactive dashboards for real-time business insights.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_HR.png?raw=true",
    slug: "powerbi"
  },
  {
    id: 2,
    title: "ETL in SQL",
    description: "A complete ETL pipeline in SQL, integrating data extraction, transformation, and loading into a Power BI dashboard for business analytics and decision-making",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SQL_first_pic.png?raw=true",
    slug: "sql"
  },
  {
    id: 3,
    title: "Banking System Data Model",
    description: "A comprehensive database design for a banking system, including conceptual, logical, and physical modeling to ensure structured data management and scalability.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Bank_konceptuell%20ERD.jpg?raw=true",
    slug: "draw.io"
  },
  {
    id: 4,
    title: "Data ETL & Analysis in SSIS and SSAS",
    description: "Designed an SSIS ETL pipeline for flight data cleansing, built an SSAS tabular model for efficient analysis.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_first_pic.png?raw=true",
    slug: "SSIS"
  },
  {
    id: 5,
    title: "Machine Learning & Predictive Modeling in R",
    description: "Developed a machine learning pipeline in R, using K-means clustering for data segmentation and random forest regression for predictive modeling.",
    imageUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/R_first_pic.png?raw=true",
    slug: "R-studio"
  },
  {
    id: 6,
    title: "AI Analytics Engine",
    description: "AI-powered analytics engine for predictive insights",
    imageUrl: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
    slug: "ai-analytics"
  }
];

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [touchedId, setTouchedId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (touchedId !== null) {
      const timer = setTimeout(() => {
        setTouchedId(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [touchedId]);

  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
      const projects = document.querySelectorAll('.project-card');
      
      projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const isVisible = (
          rect.top < window.innerHeight * 0.8 && 
          rect.bottom > window.innerHeight * 0.2
        );
        
        if (isVisible && touchedId !== projectsData[index].id) {
          setTouchedId(projectsData[index].id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, touchedId]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-white">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            className="group cursor-pointer project-card"
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => setSelectedProject(project.slug)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg p-3 bg-primary/20 backdrop-blur-sm border border-accent/10 shadow-lg overflow-hidden">
              <div className="flex gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-900/30"></div>
                <div className="w-3 h-3 rounded-full bg-purple-900/30"></div>
                <div className="w-3 h-3 rounded-full bg-purple-900/30"></div>
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-md bg-black/40">
                {/* Purple overlay that disappears on hover */}
                <motion.div 
                  className="absolute inset-0 bg-purple-500/30 z-10 pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ 
                    opacity: (hoveredId === project.id || touchedId === project.id) ? 0 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="absolute inset-0 border border-accent/10 group-hover:border-accent/30 transition-all duration-300 z-10 rounded-md"
                  animate={{
                    borderColor: (hoveredId === project.id || touchedId === project.id) ? "rgba(155, 135, 245, 0.3)" : "rgba(155, 135, 245, 0.1)"
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={{
                    scale: (hoveredId === project.id || touchedId === project.id) ? 1.1 : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-black/10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (hoveredId === project.id || touchedId === project.id) ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm">{project.description}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {selectedProject && (
        <ProjectDetails 
          projectId={selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;


import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ExternalLink, Github } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  year: string;
  tech: string[];
  description: string;
  role: string;
  images: string[];
  githubUrl?: string;
}

const projectsData: Record<string, ProjectData> = {
  "powerbi": {
    id: 1,
    title: "Power BI report in Sales",
    year: "2023",
    tech: ["Power BI", "Power Query", "DAX"],
    description: "This Power BI solution integrates and visualizes key business data across multiple departments, enabling data-driven decision-making and performance tracking. The project involved data modeling, ETL processes, advanced DAX calculations, and interactive dashboards to support strategic analysis in HR, Sales, Campaigns, and Finance.",
    role: "As a BI Analyst, I designed and built the data architecture, implemented optimized DAX calculations, and configured data pipelines to ensure accuracy and scalability. I worked closely with business stakeholders to define key performance indicators and tailored dashboards to improve analytics adoption across departments.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_S%C3%A4lj.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_HR.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_Kampanj.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/HimalayaK&V_Ekonomi.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  "sql": {
    id: 2,
    title: "ETL in SQL",
    year: "2024",
    tech: ["SQL", "SSMS", "Power BI"],
    description: "This project is a complete ETL pipeline designed to extract, transform, and load (ETL) data into a structured data warehouse (DW). The implementation integrates raw data from AdventureWorks2019, processes it through a staging layer, and transforms it into a star schema model for analytics and reporting in Power BI. The solution includes: Data extraction & bulk loading using SQL BULK INSERT procedures, Data transformation & modeling with stored procedures and T-SQL operations, Dimensional modeling (Kimball approach) to optimize query performance, Fact & Dimension table relationships enabling efficient BI analysis, Automated data integration for Power BI reporting.",
    role: "In my role as a BI Analyst, I designed and implemented the ETL architecture, structured data pipelines, and created stored procedures for automated transformations. I developed a scalable star schema, ensuring optimized performance and seamless Power BI integration. Additionally, I built SQL views to provide end-users with easy access to business insights without complex queries.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SQL_code.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  "draw.io": {
    id: 3,
    title: "Banking System Data Model",
    year: "2023",
    tech: ["draw.io", "SQL", "SSMS"],
    description: "This project involved the modeling and design of a structured banking database system, ensuring a well-defined structure with clear relationships between entities. The process began with a thorough needs analysis and data collection to identify essential business processes and data elements. A conceptual data model was created to map out the overarching structure, followed by a logical data model that detailed tables, columns, data types, and key business concepts. The database design was developed visually in draw.io, incorporating all relevant entities, defining relationships between columns, and establishing primary keys. The logical model was further refined into a physical data model, considering constraints and optimizations for database management systems. The final step included comprehensive documentation of the database schema, specifying table structures, column attributes, and relationship definitions to facilitate future implementation and development.",
    role: "I was responsible for developing the data architecture and ensuring a well-structured and efficient relational model. I created and refined the conceptual, logical, and physical data models, aligning them with real-world banking operations. Additionally, I documented the entire schema, ensuring clarity and ease of implementation in SQL Server while maintaining relational integrity and scalability.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Bank_konceptuell%20ERD.jpg?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Bank_fysisk%20ERD.jpg?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Modellering_databas_diagram.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/Modellering_sql.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  "SSIS": {
    id: 4,
    title: "Data ETL & Analysis in SSIS and SSAS",
    year: "2024",
    tech: ["SSIS", "SSAS", "Visual Studio", "SSMS"],
    description: "This project involved designing and implementing an ETL pipeline in SQL Server Integration Services (SSIS) to clean and transform flight data for analytical processing. The pipeline extracted raw flight records, performed data cleansing operations such as handling null values and formatting timestamps, and then loaded the refined data into a staging area before populating dimension and fact tables. A tabular model was created in SQL Server Analysis Services (SSAS) to simplify complex analytical queries and improve reporting performance. The cube was designed with well-structured relationships between fact and dimension tables, allowing for efficient aggregations and analysis. ",
    role: "As the ETL Developer, I designed and implemented the SSIS pipeline, ensuring efficient data transformation and error handling throughout the process. I developed the tabular cube in SSAS, structuring the model to enhance analytical capabilities while optimizing query performance.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_fl%C3%B6de1.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_fl%C3%B6de2.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_tabular_cube.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/SSIS_tabular_table.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  "R-studio": {
    id: 5,
    title: "Machine Learning & Predictive Modeling in R",
    year: "2024",
    tech: ["Machine Learning", "R", "RStudio", "Random Forest", "K-means Clustering"],
    description: "This project was developed as part of a team effort, focusing on machine learning-based predictive modeling and clustering using R. The dataset was cleaned and prepared by handling missing values and outliers before selecting relevant features for analysis. We applied unsupervised learning techniques, specifically K-means clustering, to segment companies based on workforce size and salary distribution, using the Elbow Method and Silhouette Score to determine the optimal number of clusters. In the predictive modeling phase, we implemented supervised machine learning techniques, training linear regression and random forest models to predict company financial performance. The models were evaluated using Mean Absolute Error (MAE), Mean Squared Error (MSE), and Root Mean Squared Error (RMSE) to compare predictive accuracy. We also tested whether incorporating cluster membership as a feature improved prediction performance.",
    role: "As part of the team, I contributed to data preprocessing, feature selection, and model development. I worked on K-means clustering and visualization, ensuring the segmentation was meaningful and interpretable. Additionally, I played a key role in designing, implementing, and evaluating the machine learning models, including training the random forest and regression models, tuning hyperparameters, and analyzing performance metrics. My contributions helped refine the predictive approach, making the insights more actionable for financial decision-making.",
    images: [
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/R_first_pic.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/R_kod.png?raw=true",
      "https://github.com/AnderssonElin/playful-data-portfolio-61/blob/main/images/R_tabell.png?raw=true"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  },
  "ai-analytics": {
    id: 6,
    title: "AI Analytics Engine",
    year: "2023",
    tech: ["Python", "PyTorch", "NLP", "AWS Sagemaker", "React"],
    description: "An AI-powered analytics engine that uses natural language processing to automatically identify trends, anomalies, and insights in large datasets. The system can generate narrative explanations of data changes and recommend actions based on historical patterns.",
    role: "I led the feature specification process, defined the insight generation algorithms, and developed the integration with existing BI tools. I also conducted A/B testing to validate the system's recommendations against expert analyst decisions.",
    images: [
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    ],
    githubUrl: "https://github.com/AnderssonElin/playful-data-portfolio-61"
  }
};

interface ProjectDetailsProps {
  projectId: string;
  onClose: () => void;
}

const ProjectDetails = ({ projectId, onClose }: ProjectDetailsProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData[projectId];
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [projectId]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = containerRef.current.scrollTop;
      if (scrollPosition > 300) {
        setShowHeader(false);
        setShowScrollIndicator(false);
      } else {
        setShowHeader(true);
        setShowScrollIndicator(true);
      }
    };
    
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => containerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImageClick = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
  };
  
  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-secondary rounded-lg shadow-xl p-8 max-w-lg w-full">
          <h1 className="text-2xl text-accent mb-4">Project Not Found</h1>
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 bg-accent hover:bg-accent/80 px-4 py-2 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      >
        <motion.div 
          ref={containerRef}
          className="bg-secondary rounded-lg shadow-xl w-full h-full md:w-11/12 md:h-[90%] md:max-w-6xl overflow-y-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 35, 
            stiffness: 350, 
            duration: 0.15 
          }}
        >
          <motion.div
            className="py-6 px-4 md:px-8 sticky top-0 z-10 bg-primary/90 backdrop-blur-sm flex justify-between items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex-grow text-center relative">
              <h1 className="text-xl md:text-2xl font-bold text-accent line-clamp-1">{project.title}</h1>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2 hover:bg-accent/10 rounded-full transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github size={20} className="text-accent" />
                </a>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
          
          <div className="px-4 md:px-8 py-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">Year</h2>
                  <p className="text-gray-300">{project.year}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">Tech & Technique</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-primary/50 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">Description</h2>
                  <p className="text-gray-300">{project.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-accent mb-3">My Role</h2>
                  <p className="text-gray-300">{project.role}</p>
                </div>
              </div>
            </motion.div>
            
            {project.images.length > 0 && (
              <motion.div 
                className="flex justify-center mt-8 mb-16"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: showScrollIndicator ? 1 : 0, 
                  y: showScrollIndicator ? 0 : -10 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={scrollToGallery}
                  className="text-gray-400 hover:text-accent transition-colors flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="mb-2 text-sm">View Images</p>
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
            
            {project.images.length > 0 && (
              <div ref={galleryRef} className="min-h-[50vh] md:min-h-[80vh]">
                <motion.div 
                  className="mt-16 pb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: !showHeader ? 1 : 0.3, y: !showHeader ? 0 : 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-12">
                    {project.images.map((image, index) => (
                      <motion.div 
                        key={index} 
                        className="flex justify-center relative group"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                        whileInView={{ 
                          scale: 1.01,
                          transition: { duration: 0.3 }
                        }}
                        viewport={{ once: false, margin: "-100px" }}
                      >
                        <div className="relative cursor-pointer" onClick={() => handleImageClick(image)}>
                          <img 
                            src={image} 
                            alt={`${project.title} screenshot ${index + 1}`} 
                            className="object-cover rounded-lg shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ maxWidth: "800px", maxHeight: "800px", width: "100%" }}
                          />
                          
                          <a 
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 p-2 bg-accent hover:bg-accent/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Open image in new tab"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {fullscreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
              onClick={() => setFullscreenImage(null)}
            >
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen view"
                className="max-w-[95vw] max-h-[95vh] object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                onClick={() => setFullscreenImage(null)}
              >
                <X size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;

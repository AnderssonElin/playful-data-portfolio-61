
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import BackgroundRain from "./BackgroundRain";
import WaveSection from "./WaveSection";

const Hero = () => {
  const sqlCode = `/* Booting Up My Profile */ 
SELECT 
     'Hello, my name is ' || 'Elin' AS Greeting, 
     'BI Analyst' AS Role, 
     'Transforming raw data into golden insights' AS Tagline 
FROM experience;`;

  // Function to determine color based on specific text content
  const getColor = (text: string, char: string, index: number): string => {
    // Green for comment line
    if (text.includes("/* Booting Up My Profile */") && index <= text.indexOf("*/") + 2) {
      return "text-green-400";
    }
    
    // Blue for SQL keywords
    if ((text.includes("SELECT") && text.indexOf("SELECT") <= index && index < text.indexOf("SELECT") + 6) ||
        (text.indexOf("AS") === index || text.indexOf("AS") === index - 1) ||
        (text.includes("FROM") && text.indexOf("FROM") <= index && index < text.indexOf("FROM") + 4)) {
      return "text-blue-400";
    }
    
    // Orange for quoted strings
    const singleQuotes = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "'") {
        singleQuotes.push(i);
      }
    }
    
    for (let i = 0; i < singleQuotes.length; i += 2) {
      if (i + 1 < singleQuotes.length && index >= singleQuotes[i] && index <= singleQuotes[i + 1]) {
        return "text-orange-400";
      }
    }
    
    // White for specific words and symbols
    if ((text.includes("||") && (index === text.indexOf("||") || index === text.indexOf("||") + 1)) ||
        (text.includes("Greeting") && text.indexOf("Greeting") <= index && index < text.indexOf("Greeting") + 8) ||
        (text.includes("Role") && text.indexOf("Role") <= index && index < text.indexOf("Role") + 4) ||
        (text.includes("Tagline") && text.indexOf("Tagline") <= index && index < text.indexOf("Tagline") + 7) ||
        (text.includes("experience") && text.indexOf("experience") <= index && index < text.indexOf("experience") + 10)) {
      return "text-white";
    }
    
    // Default color
    return "text-gray-300";
  };

  // Calculate total animation delay for each character with 50% slower animation
  const calculateAnimationDelay = () => {
    let totalChars = 0;
    const lines = sqlCode.split('\n');
    const charDelays: Record<string, number> = {};
    
    lines.forEach((line, lineIndex) => {
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const globalIndex = totalChars;
        // Increase delay by 50% (0.02 -> 0.03)
        charDelays[`${lineIndex}-${charIndex}`] = globalIndex * 0.03;
        totalChars++;
      }
      // Add a small delay between lines
      totalChars += 2;
    });
    
    return charDelays;
  };
  
  const charDelays = calculateAnimationDelay();

  const colorizedSQL = sqlCode.split('\n').map((line, lineIndex) => (
    <motion.div
      key={lineIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: lineIndex * 0.15, // Slow down line appearance by 50%
      }}
      className="flex whitespace-pre overflow-hidden text-[0.6rem] xs:text-xs sm:text-sm md:text-sm"
    >
      {line.split('').map((char, charIndex) => (
        <motion.span
          key={`${lineIndex}-${charIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: charDelays[`${lineIndex}-${charIndex}`],
          }}
          className={getColor(line, char, charIndex)}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  ));

  const handleExecute = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F5') {
        event.preventDefault();
        handleExecute();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-secondary px-2 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden" id="hero">
      {/* Background rain animation */}
      <BackgroundRain />
      
      <div className="w-full max-w-3xl mx-auto relative z-10">
        <motion.div
          className="bg-primary/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg backdrop-blur-sm font-sql overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="space-y-2">
            {colorizedSQL}
          </pre>
        </motion.div>
        
        <motion.button
          onClick={handleExecute}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            delay: sqlCode.length * 0.03 + 0.5, // Adjust for slower animation
            duration: 0.5 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-4 sm:mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-sql flex items-center gap-2 mx-auto transition-colors text-sm sm:text-base group"
        >
          <motion.div
            className="absolute -inset-0.5 rounded-md bg-emerald-400/20"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="relative flex items-center gap-2">
            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
            Execute (F5)
          </span>
        </motion.button>
      </div>
      
      {/* Wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <WaveSection position="bottom" fillColor="#1A1F2C" backgroundColor="#151823" />
      </div>
    </section>
  );
};

export default Hero;

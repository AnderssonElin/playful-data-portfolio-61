
import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkle, X } from "lucide-react";

type AskMeContextType = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const AskMeContext = createContext<AskMeContextType | undefined>(undefined);

const funResponses = [
  "According to my BI crystal ball, the answer is 42! 🔮",
  "Let me check my magical dashboard... *bleep bloop* 📊",
  "One moment while I consult with my data fairies! 🧚‍♂️",
  "Hmm, my algorithms are dancing salsa right now, but they say yes! 💃",
  "My Advanced Predictive Insights Engine says... absolutely! 🤖",
  "Let me run that through my neural network... result: fascinating! 🧠",
  "The data lake whispers... it shall be done! 🌊",
  "My quantum probability calculator is giving this a 97.3% chance of success! ⚛️",
  "According to my trend analysis, this idea is about to go viral! 📈",
  "My sentiment analysis is detecting extreme positivity about this! 😁",
  "The data clusters have spoken - proceed with confidence! 🌟",
  "My machine learning model just evolved to answer this question perfectly! 🦋",
];

const Firework = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1 }}
    animate={{
      scale: [0, 1.5],
      opacity: [1, 0],
    }}
    transition={{
      duration: 0.5,
      ease: "easeOut",
    }}
    className="absolute w-4 h-4"
    style={{
      background: "radial-gradient(circle, var(--tw-colors-accent) 0%, transparent 70%)",
      ...style,
    }}
  />
);

const Star = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1 }}
    animate={{
      scale: [0, 1],
      opacity: [1, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 0.6,
      ease: "easeOut",
    }}
    className="absolute text-yellow-400"
    style={style}
  >
    <Sparkle className="w-6 h-6" />
  </motion.div>
);

const Bubble = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    initial={{ y: 0, opacity: 1 }}
    animate={{
      y: -100,
      opacity: [1, 0],
    }}
    transition={{
      duration: 1,
      ease: "easeOut",
    }}
    className="absolute w-2 h-2 bg-yellow-200 rounded-full"
    style={style}
  />
);

const Glitter = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 1,
      ease: "easeInOut",
      repeat: 3
    }}
    className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-glitter"
    style={style}
  />
);

export const AskMeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <AskMeContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </AskMeContext.Provider>
  );
};

export const useAskMeVisibility = () => {
  const context = useContext(AskMeContext);
  if (context === undefined) {
    throw new Error("useAskMeVisibility must be used within an AskMeProvider");
  }
  return context;
};

const AskMe = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { isVisible, setIsVisible } = useAskMeVisibility();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsAnimating(true);
    setShowCelebration(true);
    
    setTimeout(() => {
      const randomResponse = funResponses[Math.floor(Math.random() * funResponses.length)];
      setResponse(randomResponse);
      setIsAnimating(false);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-30">
        <motion.button
          onClick={() => setIsVisible(true)}
          className="bg-accent bg-opacity-70 shadow-lg hover:bg-opacity-100 text-white p-3 rounded-full flex items-center justify-center transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 12, // Långsammare rotation
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <Bot className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsVisible(false);
              }
            }}
          >
            <motion.div
              className="w-full max-w-2xl bg-secondary p-8 rounded-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-bold text-center text-white mb-8">Ask the BI Oracle</h2>
              
              <div className="relative">
                <AnimatePresence>
                  {showCelebration && (
                    <>
                      {[...Array(12)].map((_, i) => (
                        <Firework
                          key={`firework-${i}`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                      
                      {[...Array(30)].map((_, i) => (
                        <Glitter
                          key={`glitter-${i}`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                      
                      {[...Array(8)].map((_, i) => (
                        <Star
                          key={`star-${i}`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.3}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask about BI..."
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-accent text-white p-3 rounded-xl flex items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </form>

                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-white/5 p-6 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/20 p-2 rounded-lg">
                        <Bot className="w-6 h-6 text-accent" />
                      </div>
                      <p className="text-white">{response}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskMe;

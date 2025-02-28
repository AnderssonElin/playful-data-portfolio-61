
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setEmail("");
    setMessage("");
  };

  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-transparent flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 bg-secondary/50 backdrop-blur-sm p-6 rounded-lg mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;


import { useEffect } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Dashboard from "@/components/Dashboard";
import AskMe from "@/components/AskMe";

const Index = () => {
  // Smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        const element = document.getElementById(id || "");
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <main className="bg-secondary">
      <Hero />
      <Timeline />
      <Dashboard />
      <AskMe />
    </main>
  );
};

export default Index;

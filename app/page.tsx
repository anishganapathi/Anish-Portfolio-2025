
import { Hero } from "@/components/hero";
import AboutScroll from "@/components/AboutScroll";
import ProjectsSection from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="bg-black">
   
      <Hero />
      <AboutScroll />
      <ProjectsSection />
    </div>
  );
}

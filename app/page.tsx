
import { Hero } from "@/components/hero";
import AboutScroll from "@/components/AboutScroll";
import ProjectsSection from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="">
   
      <Hero />
      <AboutScroll />
      <ProjectsSection />
    </div>
  );
}
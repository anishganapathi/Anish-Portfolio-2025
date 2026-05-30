
import { Hero } from "@/components/hero";
import BentoGallery from "@/components/BentoGallery";
import AboutScroll from "@/components/AboutScroll";
import ProjectsSection from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <BentoGallery />
      <AboutScroll />
      <ProjectsSection />
    </div>
  );
}

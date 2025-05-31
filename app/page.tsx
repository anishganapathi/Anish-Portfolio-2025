import Nav from "@/components/nav";
import Hero from "@/components/hero";
import AboutScroll from "@/components/AboutScroll";
import ProjectsSection from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <Hero />
      <AboutScroll />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
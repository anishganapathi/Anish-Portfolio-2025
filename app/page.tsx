import Nav from "@/components/nav";
import Hero from "@/components/hero";
import AboutScroll from "@/components/AboutScroll";
import BentoProject from "@/components/BentoProject";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <Hero />
      <AboutScroll />
      <BentoProject />
    </div>
  );
}
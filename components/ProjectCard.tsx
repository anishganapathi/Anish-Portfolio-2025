import Image from 'next/image';
import { PinContainer } from './ui/3d-pin';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'] });

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProjectCard = ({ title, description, imageUrl, link }: ProjectCardProps) => {
  return (
    <PinContainer title={link} href={link}>
      <div className="flex flex-col w-[20rem] h-[25rem] bg-[#000000] rounded-xl p-4">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#8F8F8F] text-sm">{description}</p>
      </div>
    </PinContainer>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Traviz",
      description: " A crowd detection using image processing techniques by implementing AI algorithms for reducing costs and delay in trasportation. TRAVIZ predicts and suggests the optimal cost- effective travel plans for travelling from point A to B using public transportation. ",
      imageUrl: "/Traviz.png",
      link: "github.com/Team-NEXT-INDIA/Traviz"
    },
    {
      title: "Aceternity UI",
      description: "Customizable Tailwind CSS and Framer Motion Components.",
      imageUrl: "/MyAbout.jpg",
      link: "ui.aceternity.com"
    },
    {
      title: "Aceternity UI",
      description: "Customizable Tailwind CSS and Framer Motion Components.",
      imageUrl: "/MyAbout.jpg",
      link: "ui.aceternity.com"
    },
  ];

  return (
    <section className="py-20">
      <h2 className={`${dmSans.className} text-xl md:text-3xl font-semibold text-white text-center mb-16`}>-- MY PROJECTS --</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto px-4">
        {projects.map((project, index) => (
          <div key={index} className={`${index >= 3 ? 'lg:col-span-1.5 lg:col-start-2' : ''} flex justify-center`}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

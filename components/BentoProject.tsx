'use client';

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { 
  RocketIcon, 
  MonitorIcon, 
  BrushIcon, 
  MessageSquareIcon,
  GraduationCapIcon 
} from "lucide-react";
import Image from "next/image";

const BentoProject = () => {
  return (
    <div className="w-full px-4 py-12">
      <BentoGrid className="mx-auto max-w-7xl">
        {/* The Dawn of Innovation */}
        <BentoGridItem
          title="The Dawn of Innovation"
          description="Explore the birth of groundbreaking ideas and inventions."
          icon={<RocketIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />}
          className="md:col-span-1"
          header={
            <div className="flex w-full h-[200px] relative rounded-xl overflow-hidden">
              <Image
                src="/MyAbout.jpg"
                alt="Innovation"
                fill
                className="object-cover"
              />
            </div>
          }
        />

        {/* The Digital Revolution */}
        <BentoGridItem
          title="The Digital Revolution"
          description="Dive into the transformative power of technology."
          icon={<MonitorIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />}
          className="md:col-span-1"
          header={
            <div className="flex w-full h-[200px] relative rounded-xl overflow-hidden">
              <Image
                src="/MyAbout.jpg"
                alt="Digital"
                fill
                className="object-cover"
              />
            </div>
          }
        />

        {/* The Art of Design */}
        <BentoGridItem
          title="The Art of Design"
          description="Discover the beauty of thoughtful and functional design."
          icon={<BrushIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />}
          className="md:col-span-1"
          header={
            <div className="flex w-full h-[200px] relative rounded-xl overflow-hidden">
              <Image
                src="/MyAbout.jpg"
                alt="Design"
                fill
                className="object-cover"
              />
            </div>
          }
        />

        {/* The Power of Communication */}
        <BentoGridItem
          title="The Power of Communication"
          description="Understand the impact of effective communication in our lives."
          icon={<MessageSquareIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />}
          className="md:col-span-2"
          header={
            <div className="flex w-full h-[200px] relative rounded-xl overflow-hidden">
              <Image
                src="/MyAbout.jpg"
                alt="Communication"
                fill
                className="object-cover"
              />
            </div>
          }
        />

        {/* The Pursuit of Knowledge */}
        <BentoGridItem
          title="The Pursuit of Knowledge"
          description="Join the quest for understanding and enlightenment."
          icon={<GraduationCapIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />}
          className="md:col-span-1"
          header={
            <div className="flex w-full h-[200px] relative rounded-xl overflow-hidden">
              <Image
                src="/MyAbout.jpg"
                alt="Knowledge"
                fill
                className="object-cover"
              />
            </div>
          }
        />
      </BentoGrid>
    </div>
  );
};

export default BentoProject; 
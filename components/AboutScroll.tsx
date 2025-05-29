'use client';

import React from 'react';
import {ContainerScroll} from "@/components/ui/container-scroll-animation";
import Image from "next/image";

const AboutScroll = () => {
  return (
    <ContainerScroll
      titleComponent={
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Unleash the power of
          <br />
          <span className="text-5xl md:text-8xl mt-1 leading-none">vision and versatility</span>
        </h1>
      }
    >
      <div className="w-full h-full flex items-center justify-center">
        <Image 
          src="/MyAbout.jpg"
          alt="Project Interface"
          width={1200}
          height={800}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </ContainerScroll>
  );
};

export default AboutScroll;

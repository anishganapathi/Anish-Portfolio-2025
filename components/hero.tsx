'use client';

import React from 'react';
import { BackgroundBeams } from './ui/background-beams';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="h-screen w-full relative flex flex-col items-start justify-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="relative z-10 max-w-[800px] mx-auto sm:mx-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4">
          Hey - I&apos;m
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#8F8F8F] mb-4 sm:mb-8">
          Anish Ganapathi
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#8F8F8F] max-w-3xl mb-4 sm:mb-8 leading-relaxed">
          I&apos;m a Computer Science grad student at Stevens Institute of Technology who loves to design, develop, and build things that make a difference. With a background in full-stack development and UI design, I enjoy creating clean, user-friendly experiences that look as good as they work. Lately, I&apos;ve been exploring how AI and machine learning can take those experiences even further. I&apos;m all about turning ideas into beautiful, functional products.
        </p>
        <p className="text-white text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
          Know more about me --)
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors hover:cursor-pointer">
              Contact
            </button>
          </Link>
          <Link href="/resume" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1C1C1C] text-white font-medium border border-[#2A2A2A] hover:bg-[#2A2A2A] transition-colors hover:cursor-pointer">
              Resume
            </button>
          </Link>
        </div>
      </div>
      
      {/* Background animation with negative z-index */}
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default Hero;

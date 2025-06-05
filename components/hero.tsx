'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import BlurText from "@/components/ui/heroblurtext";
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { motion } from "framer-motion";

const inter = Inter({ subsets: ['latin'] });

export function Hero() {
  return (
    <div className="w-full h-screen relative">
      <Spotlight className="absolute inset-0" />
      <Card className="w-full h-full bg-[#0a0a0a] relative overflow-hidden border-0">
        <div className="flex flex-col lg:flex-row h-full relative z-20">
          {/* Left content */}
          <div className="flex-1 px-6 pt-20 pb-8 sm:p-8 md:p-12 lg:p-16 relative flex flex-col justify-center">
            <div className="flex flex-col">
              <div className="mt-2">
                <BlurText 
                  text="I'm Anish Ganapathi"
                  className={`${inter.className} text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold text-white leading-[1.1] sm:leading-[0.9] tracking-tighter`}
                  delay={200}
                  direction="bottom"
                  animateBy="words"
                />
              </div>
            </div>

            <div className="mt-6 sm:mt-8 max-w-2xl">
              <BlurText 
                text="I'm a Computer Science grad student at Stevens Institute of Technology who loves to design, develop, and build things that make a difference."
                className={`${inter.className} text-base sm:text-xl md:text-2xl text-[#666666] leading-relaxed`}
                delay={100}
                direction="bottom"
                animateBy="words"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link href="/contact" className="block w-full">
                  <button className={`${inter.className} w-full sm:w-[180px] px-6 sm:px-8 py-3.5 sm:py-4 text-base rounded-full bg-white text-black font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer`}>
                    Contact
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link href="/resume" className="block w-full">
                  <button className={`${inter.className} w-full sm:w-[180px] px-6 sm:px-8 py-3.5 sm:py-4 text-base rounded-full bg-[#1C1C1C] text-white font-medium border border-[#2A2A2A] hover:bg-[#2A2A2A] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer`}>
                    Resume
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 relative h-[350px] sm:h-[450px] lg:h-full">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
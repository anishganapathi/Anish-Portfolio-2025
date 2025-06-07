'use client';

import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const containerVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function AboutPage() {
  const timelineData = [
    {
      title: "Present",
      content: (
        <motion.div 
          variants={fadeInUp}
          className="space-y-6"
        >
          <p className="text-neutral-700 dark:text-neutral-300">
            Currently pursuing my masters in computer science at stevens institute of technology.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={fadeInUp}>
              <Image
                src="/stevens1.jpg"
                alt="stevens1"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Image
                src="/stevens2.jpg"
                alt="stevens2"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Jan 2025",
      content: (
        <motion.div 
          variants={fadeInUp}
          className="space-y-6"
        >
          <p className="text-neutral-700 dark:text-neutral-300">
            Worked on a project called "TRAVIZ" which is a cost effective application for public transportation
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={fadeInUp}>
              <Image
                src="/Traviz1.jpg"
                alt="Traviz1"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Image
                src="/Traviz2.png"
                alt="Traviz2"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Early 2024",
      content: (
        <motion.div 
          variants={fadeInUp}
          className="space-y-6"
        >
          <p className="text-neutral-700 dark:text-neutral-300">
          In early 2024, I developed my university's event website, VITOPIA, and also designed the user interface for its mobile application.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
          It is a 2-day event that includes ticket booking, merchandise purchases, and browsing the various events throughout the day. The entire application handled over 15,000 users and generated more than ₹1.5 crore in revenue for the university.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={fadeInUp}>
              <Image
                src="/Vitopia1.png"
                alt="Vitopia1"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Image
                src="/Vitopia2.jpg"
                alt="Vitopia2"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Image
                src="/Vitopia3.jpg"
                alt="Vitopia3"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Image
                src="/Vitopia4.png"
                alt="Vitopia3"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "In Between",
      content: (
        <motion.div 
          variants={fadeInUp}
          className="space-y-4"
        >
          <p className="text-neutral-700 dark:text-neutral-300">
            Developed few projects during my bachelors.
          </p>
          <motion.ul 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="list-inside space-y-2 text-neutral-700 dark:text-neutral-300"
          >
            {[
              "✅ Developed Skin cancer prediction analysis as a capstone project.",
              "✅ Completed an internship on cybersecurity (Cranes Varsity).",
              "✅ Built a website on a fashion brand.",
              "✅ Designed a User Interface for a mobile application about Tiger Reserve.",
              "✅ Completed few certifications on AI and Machine Learning."
            ].map((item, index) => (
              <motion.li 
                key={index}
                variants={fadeInUp}
                className="flex items-center"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      ),
    },
  ];

  return (
    <motion.main 
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="min-h-screen bg-white dark:bg-neutral-950"
    >
      <Timeline data={timelineData} />
    </motion.main>
  );
}

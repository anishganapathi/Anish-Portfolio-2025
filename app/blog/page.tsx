"use client";

import { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const demoData = {
  tagline: "LATEST BLOG POSTS",
  heading: "Blog Posts",
  posts: [
    {
      id: "post-1",
      title: "Initial stages of Development and Design.",
      summary:
        "When I first started working with Next.js, I was pretty much diving into uncharted waters. I leaned heavily on YouTube tutorials, and thankfully, a few really solid ones helped me get through the initial learning curve.",
      content: `
        When I first started working with Next.js, I leaned heavily on YouTube tutorials, and thankfully, a friend of mine helped me get through the initial learning curve. At the same time, I was trying to style everything with Tailwind CSS , which felt a bit chaotic at first trying to remember all those utility classes was no joke! But with time and practice, it started to click. 
        In parallel,  was also designing the UI for a mobile app. I spent hours studying mockups, pulling inspiration from Dribbble, and trying to faithfully recreate the aesthetic in my own designs. That process really helped me develop a sharper eye for design and taught me the value of prototyping and wireframing. Looking back, that blend of building and designing turned out to be one of the most rewarding parts of the project.
      `,
      label: "VITOPIA",
      author: "Anish",
      published: "25 Feb 2024",
      image: "/Vitopia.png",
    },
    {
      id: "post-2",
      title: "MATLAB and GUI based application",
      summary:
        "While exploring image classification for skin lesions trying to tell apart benign from malignant cases using CNNs, I quickly realized that getting everything to work smoothly inside MATLAB’s interface wasn’t going to be easy.",
      content: `
        While exploring image classification for skin lesions trying to tell apart benign from malignant cases using CNNs, I quickly realized that getting everything to work smoothly inside MATLAB’s interface wasn’t going to be easy. Training the models was one part of the puzzle; making the results accessible and interactive in MATLAB was a whole different challenge. I tried out several pre-trained models like GoogLeNet, AlexNet, and VGG, experimenting with different configurations to see what worked best. Each model brought its own surprises, and after a lot of trial and error, I finally got some results I was happy with. The whole experience taught me a lot not just about deep learning and transfer learning, but also about the importance of making complex models usable for others through a clean, intuitive interface.
      `,
      label: "SKIN DISEASE DIAGNOSIS",
      author: "Anish",
      published: "11 Dec 2024",
      image: "Skin.jpg",
    },
    {
      id: "post-3",
      title: "Testing and Production",
      summary:
        "Working on this project with my teammates was genuinely exciting there was this great sense of collaboration, with everyone contributing their part to bring the idea to life.",
      content: `
       Working on this project with my teammates was genuinely exciting there was this great sense of collaboration, with everyone contributing their part to bring the idea to life. But when it came time to test the application, things got a bit tricky. We had to physically carry around the device, which included a WiFi module and a camera, making the whole process a bit cumbersome. On top of that, the communication between the app and the device via the server wasn’t always consistent sometimes it worked perfectly, and other times it was frustratingly unreliable. Despite these challenges, seeing the app finally come together and perform as intended made it all worth it. The final output turned out to be something we were really proud of.
      `,
      label: "TRAVIZ",
      author: "Anish",
      published: "19 May 2025",
      image: "Traviz.png",
    },
  ],
};

// Animation variants
const overlayVariants = {
  closed: { opacity: 0 },
  open: { 
    opacity: 1,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5
    }
  },
  hover: {
    y: -5,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.3
    }
  }
};

const expandedCardVariants = {
  initial: { 
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  animate: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.3
    }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5
    }
  }
};

export default function BlogPage() {
  const [active, setActive] = useState<typeof demoData.posts[number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <main className="min-h-screen w-full py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="mb-6">
            {demoData.tagline}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{demoData.heading}</h1>
        </motion.div>

        <AnimatePresence>
          {active && (
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setActive(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {active && (
            <div className="fixed inset-0 grid place-items-center z-[60] pointer-events-none p-4">
              <motion.div
                layoutId={`card-${active.id}-${id}`}
                ref={ref}
                variants={expandedCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full max-w-[800px] pointer-events-auto bg-background border rounded-xl overflow-hidden"
              >
                <motion.div layoutId={`image-${active.id}-${id}`} className="relative">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-[300px] object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      onClick={() => setActive(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="p-6"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.div layoutId={`badge-${active.id}-${id}`}>
                        <Badge variant="secondary">{active.label}</Badge>
                      </motion.div>
                      <motion.h2
                        layoutId={`title-${active.id}-${id}`}
                        className="text-2xl font-bold mt-2"
                      >
                        {active.title}
                      </motion.h2>
                    </div>
                    <motion.p
                      layoutId={`date-${active.id}-${id}`}
                      className="text-sm text-muted-foreground"
                    >
                      {active.published}
                    </motion.p>
                  </div>

                  <motion.div
                    variants={contentVariants}
                    className="prose prose-invert max-w-none"
                  >
                    {active.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>

                  <motion.p
                    layoutId={`author-${active.id}-${id}`}
                    className="mt-6 text-sm text-muted-foreground"
                  >
                    Written by {active.author}
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {demoData.posts.map((post) => (
            <motion.div
              layoutId={`card-${post.id}-${id}`}
              key={post.id}
              onClick={() => setActive(post)}
              className="cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="overflow-hidden hover:bg-accent/50 transition-colors">
                <motion.div layoutId={`image-${post.id}-${id}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                </motion.div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <motion.div layoutId={`badge-${post.id}-${id}`}>
                      <Badge variant="secondary">{post.label}</Badge>
                    </motion.div>
                    <motion.span
                      layoutId={`date-${post.id}-${id}`}
                      className="text-sm text-muted-foreground"
                    >
                      {post.published}
                    </motion.span>
                  </div>
                  <motion.h3
                    layoutId={`title-${post.id}-${id}`}
                    className="text-lg font-semibold mt-2"
                  >
                    {post.title}
                  </motion.h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
                </CardContent>
                <CardFooter>
                  <motion.p
                    layoutId={`author-${post.id}-${id}`}
                    className="text-sm text-muted-foreground"
                  >
                    Written by {post.author}
                  </motion.p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

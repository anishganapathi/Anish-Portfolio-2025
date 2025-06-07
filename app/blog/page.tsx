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
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  posts: [
    {
      id: "post-1",
      title: "Build websites in minutes with shadcn/ui",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

        • Key Feature 1: Lorem ipsum dolor sit amet
        • Key Feature 2: Consectetur adipiscing elit
        • Key Feature 3: Sed do eiusmod tempor

        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `,
      label: "Tutorial",
      author: "Jane Doe",
      published: "1 Jan 2024",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Easily copy code to build your website",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      content: `
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
        
        Et quasi architecto beatae vitae dicta sunt explicabo:

        1. First step: Configure your development environment
        2. Second step: Install necessary dependencies
        3. Third step: Start building your components
        
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      `,
      label: "Guide",
      author: "Jane Doe",
      published: "1 Jan 2024",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "The future of web design",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      content: `
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
        
        Future Trends:
        • AI-Powered Design Tools
        • Micro-Interactions
        • Dark Mode by Default
        • Voice User Interfaces
        
        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
      `,
      label: "Trends",
      author: "Jane Doe",
      published: "1 Jan 2024",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
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
          <p className="text-white/70 max-w-2xl mx-auto">{demoData.description}</p>
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

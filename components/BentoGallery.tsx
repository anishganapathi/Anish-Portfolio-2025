"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Inter, Syne } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });

// ─── Types ───────────────────────────────────────────────────────────────────

interface MediaItemType {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  /** Tailwind col/row span classes, e.g. "col-span-2 row-span-2" */
  span: string;
}

// ─── Media data ──────────────────────────────────────────────────────────────

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "Traviz",
    desc: "AI-powered crowd-detection & travel planner",
    url: "/Traviz.png",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Vitopia Festival",
    desc: "International cultural & sports event website",
    url: "/Vitopia.png",
    span: "col-span-1 row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Skin Cancer Detection",
    desc: "CNN-based malignancy classifier in MATLAB",
    url: "/Skin.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    type: "image",
    title: "Traviz App",
    desc: "Mobile-first transit planning experience",
    url: "/Traviz1.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    type: "image",
    title: "Vitopia Moments",
    desc: "Behind the scenes of VITopia 2024",
    url: "/Vitopia2.jpg",
    span: "col-span-1 row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Stevens Campus",
    desc: "Graduate life at Stevens Institute of Technology",
    url: "/stevens1.jpg",
    span: "col-span-2 row-span-1",
  },
];

// ─── MediaItem ────────────────────────────────────────────────────────────────

const MediaItem = ({
  item,
  className,
  onClick,
}: {
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (item.type !== "video") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsInView(e.isIntersecting)),
      { rootMargin: "50px", threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [item.type]);

  useEffect(() => {
    if (item.type !== "video") return;
    let mounted = true;
    const play = async () => {
      if (!videoRef.current || !isInView || !mounted) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise<void>((r) => {
            if (videoRef.current) videoRef.current.oncanplay = () => r();
          });
          if (mounted) {
            setIsBuffering(false);
            await videoRef.current!.play();
          }
        }
      } catch (e) {
        console.warn("Video playback failed", e);
      }
    };
    if (isInView) play();
    else videoRef.current?.pause();
    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, [isInView, item.type]);

  if (item.type === "video") {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.7 : 1,
            transition: "opacity 0.3s",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-cover`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const GalleryModal = ({
  selectedItem,
  isOpen,
  onClose,
  setSelectedItem,
  items,
}: {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType) => void;
  items: MediaItemType[];
}) => {
  const [dockPos, setDockPos] = useState({ x: 0, y: 0 });

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Main card */}
      <motion.div
        className="fixed inset-4 sm:inset-8 md:inset-16 z-50 rounded-2xl overflow-hidden
                   bg-[#0d0d0d]/95 border border-white/10 shadow-2xl flex flex-col"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest">
              {selectedItem.type === "video" ? "Video" : "Photo"}
            </p>
            <h2
              className={`${inter.className} text-white text-base sm:text-lg font-semibold mt-0.5`}
            >
              {selectedItem.title}
            </h2>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Media area */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              className="relative w-full h-full max-w-4xl rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 460, damping: 30 }}
            >
              <MediaItem
                item={selectedItem}
                className="w-full h-full"
              />
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6
                              bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                <p className="text-white/70 text-xs sm:text-sm">
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-white/20 text-[10px] pb-3 tracking-wider">
          Press ESC to close
        </p>
      </motion.div>

      {/* Draggable dock strip */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        animate={{ x: dockPos.x, y: dockPos.y }}
        onDragEnd={(_, info) =>
          setDockPos((p) => ({ x: p.x + info.offset.x, y: p.y + info.offset.y }))
        }
        className="fixed z-[60] left-1/2 bottom-6 -translate-x-1/2 touch-none"
      >
        <motion.div
          className="flex items-center -space-x-2 px-3 py-2.5 rounded-2xl
                     bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl
                     cursor-grab active:cursor-grabbing"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
              }}
              style={{
                zIndex: selectedItem.id === item.id ? 30 : items.length - index,
              }}
              className={`relative group w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer
                          ${
                            selectedItem.id === item.id
                              ? "ring-2 ring-white/70 shadow-lg shadow-white/20"
                              : "hover:ring-2 hover:ring-white/30"
                          }`}
              initial={{ rotate: index % 2 === 0 ? -12 : 12 }}
              animate={{
                scale: selectedItem.id === item.id ? 1.25 : 1,
                rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -12 : 12,
                y: selectedItem.id === item.id ? -10 : 0,
              }}
              whileHover={{
                scale: 1.35,
                rotate: 0,
                y: -12,
                transition: { type: "spring", stiffness: 400, damping: 22 },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
              {selectedItem.id === item.id && (
                <motion.div
                  layoutId="dockGlow"
                  className="absolute -inset-1 rounded-xl bg-white/25 blur-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        {/* Drag handle indicator */}
        <div className="flex justify-center mt-1.5">
          <div className="w-8 h-1 rounded-full bg-white/20" />
        </div>
      </motion.div>
    </>
  );
};

// ─── Main Gallery ─────────────────────────────────────────────────────────────

const BentoGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative bg-[#0a0a0a] py-20 sm:py-28 overflow-hidden">
      {/* Subtle radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className={`${inter.className} text-xs sm:text-sm tracking-[0.25em] uppercase text-white/30 mb-3`}
          >
            A glimpse of my work
          </p>
          <h2
            className={`${syne.className} text-3xl sm:text-4xl md:text-5xl font-bold text-white`}
          >
            Gallery
          </h2>
          <p
            className={`${inter.className} mt-4 text-sm sm:text-base text-white/40 max-w-md mx-auto leading-relaxed`}
          >
            Click any tile to explore · Drag to rearrange
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[100px] sm:auto-rows-[120px] gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07 },
            },
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`bento-${item.id}`}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.92 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 26,
                    delay: index * 0.04,
                  },
                },
              }}
              whileHover={{ scale: 1.015, zIndex: 10 }}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => !isDragging && setSelectedItem(item)}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.9}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                const dist = info.offset.x + info.offset.y;
                if (Math.abs(dist) > 60) {
                  const newItems = [...items];
                  const [dragged] = newItems.splice(index, 1);
                  const target =
                    dist > 0
                      ? Math.min(index + 1, items.length - 1)
                      : Math.max(index - 1, 0);
                  newItems.splice(target, 0, dragged);
                  setItems(newItems);
                }
              }}
              style={{ cursor: isDragging ? "grabbing" : "pointer" }}
            >
              {/* Image / video */}
              <MediaItem
                item={item}
                className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Gradient + text overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative px-3.5 pb-3.5 pt-6">
                  <h3
                    className={`${inter.className} text-white text-xs sm:text-sm font-semibold leading-snug`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>

              {/* Zoom icon on hover */}
              <motion.div
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: hoveredId === item.id ? 1 : 0,
                  scale: hoveredId === item.id ? 1 : 0.7,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </motion.div>

              {/* Subtle inner border on hover */}
              <div
                className={`absolute inset-0 rounded-2xl ring-1 ring-inset pointer-events-none transition-all duration-300 ${
                  hoveredId === item.id ? "ring-white/20" : "ring-white/0"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            items={items}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BentoGallery;

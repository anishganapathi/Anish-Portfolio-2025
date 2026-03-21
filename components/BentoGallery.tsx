"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Inter, Syne } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaItemType {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
}

// ─── Portfolio items ──────────────────────────────────────────────────────────

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "JoyConf",
    desc: "Attended Storyblok's JoyConf 2025 as Hackathon Winner.",
    url: "/joyconf.png",
  },
  {
    id: 2,
    type: "image",
    title: "Vitopia Festival",
    desc: "International cultural & sports event website — VITopia 2024.",
    url: "/Vitopia.png",
  },
  {
    id: 3,
    type: "image",
    title: "Skin Cancer Detection",
    desc: "CNN-based malignancy classifier built in MATLAB.",
    url: "/Skin.jpg",
  },
  {
    id: 4,
    type: "image",
    title: "Traviz App",
    desc: "Mobile-first AI transit planning experience.",
    url: "/Traviz1.jpg",
  },
  {
    id: 5,
    type: "image",
    title: "Vitopia Moments",
    desc: "Behind the scenes of VITopia 2024.",
    url: "/Vitopia2.jpg",
  },
  {
    id: 6,
    type: "image",
    title: "Stevens Campus",
    desc: "Graduate life at Stevens Institute of Technology.",
    url: "/stevens1.jpg",
  },
];

// ─── Bento grid layout (4 columns × 3 rows) ──────────────────────────────────
//
//   Col:  1        2        3        4
//   ┌─────────────────────┬─────────────────────┐  Row 1 (240px)
//   │    item 1           │    item 2            │
//   │    (2col × 2row)    │    (2col × 1row)     │
//   │                     ├──────────┬───────────┤  Row 2 (190px)
//   │    item 1 cont.     │  item 3  │  item 4   │
//   ├─────────────────────┴──────────┴───────────┤
//   │   item 5  (2col × 1row)  │  item 6 (2col)  │  Row 3 (160px)
//   └──────────────────────────┴─────────────────┘
//
// 12 grid units total — all filled, zero gaps, zero overlaps.
//
const CELL_STYLES: React.CSSProperties[] = [
  { gridColumn: "1 / 3", gridRow: "1 / 3" }, // item1 — big square hero
  { gridColumn: "3 / 5", gridRow: "1 / 2" }, // item2 — wide landscape top-right
  { gridColumn: "3 / 4", gridRow: "2 / 3" }, // item3 — small square mid-right
  { gridColumn: "4 / 5", gridRow: "2 / 3" }, // item4 — small square mid-far-right
  { gridColumn: "1 / 3", gridRow: "3 / 4" }, // item5 — wide landscape bottom-left
  { gridColumn: "3 / 5", gridRow: "3 / 4" }, // item6 — wide landscape bottom-right
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          await new Promise<void>((res) => {
            if (videoRef.current) videoRef.current.oncanplay = () => res();
          });
          if (mounted) { setIsBuffering(false); await videoRef.current!.play(); }
        }
      } catch (e) { console.warn("Video playback failed", e); }
    };
    if (isInView) play(); else videoRef.current?.pause();
    return () => {
      mounted = false;
      if (videoRef.current) { videoRef.current.pause(); videoRef.current.removeAttribute("src"); videoRef.current.load(); }
    };
  }, [isInView, item.type]);

  if (item.type === "video") {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video ref={videoRef} className="w-full h-full object-cover" onClick={onClick}
          playsInline muted loop preload="auto"
          style={{ opacity: isBuffering ? 0.7 : 1, transition: "opacity 0.3s", transform: "translateZ(0)" }}>
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
    <img src={item.url} alt={item.title}
      className={`${className} object-cover`}
      onClick={onClick} loading="lazy" decoding="async" />
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const GalleryModal = ({
  selectedItem, isOpen, onClose, setSelectedItem, items,
}: {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType) => void;
  items: MediaItemType[];
}) => {
  const [dockPos, setDockPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <motion.div className="fixed inset-0 bg-black/80 z-40 backdrop-blur-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} />

      <motion.div
        className="fixed inset-4 sm:inset-8 md:inset-14 z-50 rounded-2xl overflow-hidden
                   bg-[#0c0c0c]/96 border border-white/[0.08] shadow-2xl flex flex-col"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.06] shrink-0">
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">Portfolio</p>
            <h2 className={`${inter.className} text-white text-base sm:text-xl font-semibold mt-0.5 leading-tight`}>
              {selectedItem.title}
            </h2>
          </div>
          <motion.button onClick={onClose}
            whileHover={{ scale: 1.12, rotate: 90 }} whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white/50 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Media */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={selectedItem.id}
              className="relative w-full h-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            >
              <MediaItem item={selectedItem} className="w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6
                              bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none">
                <p className={`${inter.className} text-white/70 text-sm`}>{selectedItem.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-white/15 text-[10px] pb-3 tracking-widest shrink-0">ESC to close</p>
      </motion.div>

      {/* Draggable dock */}
      <motion.div drag dragMomentum={false} dragElastic={0.08}
        animate={{ x: dockPos.x, y: dockPos.y }}
        onDragEnd={(_, info) => setDockPos((p) => ({ x: p.x + info.offset.x, y: p.y + info.offset.y }))}
        className="fixed z-[60] left-1/2 bottom-6 -translate-x-1/2 touch-none select-none">
        <div className="flex items-center -space-x-2 px-3 py-2.5 rounded-2xl
                        bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-2xl
                        cursor-grab active:cursor-grabbing">
          {items.map((item, index) => (
            <motion.div key={item.id}
              onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
              style={{ zIndex: selectedItem.id === item.id ? 30 : items.length - index }}
              className={`relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer
                ${selectedItem.id === item.id ? "ring-2 ring-white/60" : "hover:ring-1 hover:ring-white/25"}`}
              initial={{ rotate: index % 2 === 0 ? -10 : 10 }}
              animate={{
                scale: selectedItem.id === item.id ? 1.25 : 1,
                rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -10 : 10,
                y: selectedItem.id === item.id ? -10 : 0,
              }}
              whileHover={{ scale: 1.32, rotate: 0, y: -11, transition: { type: "spring", stiffness: 400, damping: 22 } }}
              transition={{ type: "spring", stiffness: 340, damping: 25 }}>
              <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
              {selectedItem.id === item.id && (
                <motion.div layoutId="dockGlow"
                  className="absolute -inset-1 rounded-xl bg-white/20 blur-md pointer-events-none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }} />
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-1.5">
          <div className="w-8 h-1 rounded-full bg-white/15" />
        </div>
      </motion.div>
    </>
  );
};

// ─── BentoCell ────────────────────────────────────────────────────────────────

const BentoCell = ({
  item, index, onSelect,
}: {
  item: MediaItemType;
  index: number;
  onSelect: (item: MediaItemType) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const isHero = index === 0; // largest tile gets slightly different treatment

  return (
    <motion.div
      style={CELL_STYLES[index]}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.96 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { type: "spring", stiffness: 280, damping: 26, delay: index * 0.08 },
        },
      }}
      whileHover={{ scale: isHero ? 1.012 : 1.018, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(item)}
    >
      {/* Media */}
      <MediaItem
        item={item}
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.07]"
      />

      {/* Persistent subtle gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

      {/* Hover overlay with title */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="relative px-4 sm:px-5 pb-4 sm:pb-5">
          <h3 className={`${inter.className} text-white font-semibold text-sm sm:text-base leading-snug`}>
            {item.title}
          </h3>
          <p className="text-white/55 text-[11px] sm:text-xs mt-0.5 leading-relaxed line-clamp-2">
            {item.desc}
          </p>
        </div>
      </motion.div>

      {/* Zoom icon */}
      <motion.div
        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </motion.div>

      {/* Hover ring */}
      <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset pointer-events-none transition-all duration-300
        ${hovered ? "ring-white/20" : "ring-white/0"}`} />
    </motion.div>
  );
};

// ─── BentoGallery ─────────────────────────────────────────────────────────────

const BentoGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

  return (
    <section className="relative bg-[#0a0a0a] py-20 sm:py-28 overflow-hidden">
      {/* top fade from hero */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24
                      bg-gradient-to-b from-black to-transparent" />

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(120,120,255,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={`${inter.className} text-[11px] tracking-[0.3em] uppercase text-white/30 mb-3`}>
            A glimpse of my work
          </p>
          <h2 className={`${syne.className} text-3xl sm:text-4xl md:text-[52px] font-bold text-white leading-none`}>
            Gallery
          </h2>
          <p className={`${inter.className} mt-4 text-sm text-white/35 max-w-xs mx-auto leading-relaxed`}>
            Click any tile to explore in full
          </p>
        </motion.div>

        {/*
          ══════════════════════════════════════════
          BENTO GRID  —  4 cols × 3 rows
          ══════════════════════════════════════════
          Row 1 (240px): item1[2col] | item2[2col]
          Row 2 (190px): item1 cont. | item3[1col] item4[1col]
          Row 3 (160px): item5[2col] | item6[2col]
          ══════════════════════════════════════════
        */}
        <motion.div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "240px 190px 160px",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
        >
          {mediaItems.map((item, index) => (
            <BentoCell key={item.id} item={item} index={index} onSelect={setSelectedItem} />
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
            items={mediaItems}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BentoGallery;

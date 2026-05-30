"use client";

import { useEffect, useState } from "react";

export interface GalleryMediaItem {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  tiffUrl?: string;
}

interface ApiImage {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  tiffUrl?: string;
}

export function useGalleryImages() {
  const [items, setItems] = useState<GalleryMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/images?group=gallery");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { images: ApiImage[] };
        if (cancelled) return;
        setItems(
          data.images.map((img) => ({
            id: img.id,
            type: img.type,
            title: img.title,
            desc: img.desc,
            url: img.url,
            tiffUrl: img.tiffUrl,
          }))
        );
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load gallery");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}

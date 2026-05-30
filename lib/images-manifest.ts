import fs from "fs/promises";
import path from "path";

export interface ImageManifestEntry {
  id: number;
  group: string;
  type: "image" | "video";
  title: string;
  desc: string;
  original: string;
  /** Web-optimized asset (WebP) — use in `<img>` / Next Image */
  url: string;
  /** LZW-compressed TIFF — available via API / download */
  tiffUrl: string;
  width: number;
  height: number;
  originalBytes: number;
  optimizedBytes: number;
  tiffBytes: number;
}

export interface ImageManifest {
  generatedAt: string;
  images: ImageManifestEntry[];
}

const MANIFEST_PATH = path.join(process.cwd(), "content", "images-manifest.md");

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return meta;
}

function extractJsonBlock(raw: string): string | null {
  const match = raw.match(/```json\r?\n([\s\S]*?)\r?\n```/);
  return match?.[1] ?? null;
}

export async function readImageManifest(): Promise<ImageManifest> {
  let raw: string;
  try {
    raw = await fs.readFile(MANIFEST_PATH, "utf-8");
  } catch {
    return { generatedAt: "", images: [] };
  }

  const frontmatter = parseFrontmatter(raw);
  const jsonBlock = extractJsonBlock(raw);
  if (!jsonBlock) {
    return { generatedAt: frontmatter.generatedAt ?? "", images: [] };
  }

  const images = JSON.parse(jsonBlock) as ImageManifestEntry[];
  return {
    generatedAt: frontmatter.generatedAt ?? "",
    images,
  };
}

export async function getImagesByGroup(group?: string): Promise<ImageManifestEntry[]> {
  const { images } = await readImageManifest();
  if (!group) return images;
  return images.filter((img) => img.group === group);
}

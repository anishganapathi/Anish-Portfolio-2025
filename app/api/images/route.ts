import { getImagesByGroup, readImageManifest } from "@/lib/images-manifest";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const group = request.nextUrl.searchParams.get("group") ?? undefined;
  const format = request.nextUrl.searchParams.get("format");

  try {
    if (format === "markdown") {
      const fs = await import("fs/promises");
      const path = await import("path");
      const manifestPath = path.join(process.cwd(), "content", "images-manifest.md");
      const markdown = await fs.readFile(manifestPath, "utf-8");
      return new NextResponse(markdown, {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
      });
    }

    const manifest = await readImageManifest();
    const images = await getImagesByGroup(group);

    return NextResponse.json(
      {
        generatedAt: manifest.generatedAt,
        count: images.length,
        images,
      },
      {
        headers: {
          "Cache-Control":
            process.env.NODE_ENV === "production"
              ? "public, s-maxage=3600, stale-while-revalidate=86400"
              : "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[api/images]", error);
    return NextResponse.json(
      { error: "Failed to load image manifest" },
      { status: 500 }
    );
  }
}

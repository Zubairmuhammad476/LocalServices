/**
 * Image Pipeline: Pexels API + Gemini AI fallback
 * Prefix convention: fetch* for data reads, create* for generation
 */

const PEXELS_API_URL = "https://api.pexels.com/v1/search";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY ?? "";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
  };
  photographer: string;
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}

// ─── Pexels Integration ────────────────────────────────────────────────────────

/**
 * Fetch highest-resolution image from Pexels for a service query.
 * Returns the original URL or null if not found.
 */
export async function fetchPexelsImage(
  serviceName: string
): Promise<string | null> {
  if (!PEXELS_API_KEY) {
    console.warn("[image-pipeline] PEXELS_API_KEY not set");
    return null;
  }

  try {
    const query = `${serviceName} UAE service professional`;
    const response = await fetch(
      `${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_API_KEY },
        next: { revalidate: 86400 }, // Cache for 24h
      }
    );

    if (!response.ok) return null;

    const data: PexelsResponse = await response.json();
    return data.photos[0]?.src.original ?? null;
  } catch (error) {
    console.error("[image-pipeline] Pexels fetch failed:", error);
    return null;
  }
}

// ─── Gemini AI Fallback ────────────────────────────────────────────────────────

/**
 * Generate a photorealistic UAE-market image using Gemini AI.
 * Used as fallback when Pexels returns no results for niche services.
 */
export async function generateGeminiImage(
  serviceName: string,
  emirate = "Dubai"
): Promise<string | null> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

  if (!GEMINI_API_KEY) {
    console.warn("[image-pipeline] GEMINI_API_KEY not set");
    return null;
  }

  try {
    const prompt = [
      `Professional ${serviceName} service being performed in ${emirate}, UAE.`,
      "Modern, clean environment. Photo-realistic high quality image.",
      "Warm lighting, professional workers in uniform. No text overlays.",
    ].join(" ");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      }
    );

    if (!response.ok) return null;

    const result = await response.json();
    const imageData =
      result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!imageData) return null;

    return `data:image/png;base64,${imageData}`;
  } catch (error) {
    console.error("[image-pipeline] Gemini image generation failed:", error);
    return null;
  }
}

// ─── Pipeline Orchestrator ────────────────────────────────────────────────────

/**
 * Get image for a service: try Pexels first, fall back to Gemini AI.
 */
export async function fetchServiceImage(
  serviceName: string,
  emirate = "Dubai"
): Promise<string | null> {
  const pexelsUrl = await fetchPexelsImage(serviceName);
  if (pexelsUrl) return pexelsUrl;

  console.log(
    `[image-pipeline] Pexels returned no results for "${serviceName}", trying Gemini...`
  );
  return generateGeminiImage(serviceName, emirate);
}

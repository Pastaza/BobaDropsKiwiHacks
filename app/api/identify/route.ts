import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const ResultSchema = z.object({
  title: z.string(),
  confidence: z.enum(["low", "medium", "high"]),
  summary: z.string(),
  whatToLookFor: z.array(z.string()).min(1),
  whatItMeans: z.array(z.string()).min(1),
  photographyTips: z.array(z.string()).min(1)
});

function fallbackResult() {
  return {
    title: "Sky photo (beta guess)",
    confidence: "low" as const,
    summary:
      "AI classification isn’t configured yet on this deployment. You can still use the Cloud Atlas to match patterns — puffy heaps, wispy streaks, smooth lenses, or pouch-like underbellies.",
    whatToLookFor: [
      "Are edges crisp (cumulus) or wispy (cirrus)?",
      "Is it smooth + lens-shaped (lenticular)?",
      "Are there pouch-like bubbles underneath (mammatus)?"
    ],
    whatItMeans: [
      "Small cumulus often = fair weather",
      "Cirrus can precede changes within 24–48h",
      "Lenticular often = strong winds aloft"
    ],
    photographyTips: [
      "Shoot during golden hour for depth",
      "Protect highlights; keep cloud texture",
      "Include a horizon anchor for scale"
    ]
  };
}

export async function POST(req: Request) {
  const form = await req.formData();
  const image = form.get("image");
  if (!(image instanceof Blob)) {
    return NextResponse.json({ error: "Missing image" }, { status: 400 });
  }

  // Optional: richer vision result when OPENAI_API_KEY is configured.
  // We intentionally keep a friendly fallback so the site works without secrets.
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(fallbackResult());
  }

  try {
    const bytes = Buffer.from(await image.arrayBuffer());
    const base64 = bytes.toString("base64");

    // Lazy import so the app doesn’t require the SDK unless configured.
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt =
      "You are a friendly cloud-spotting expert. Identify likely cloud type(s) from the image. " +
      "Return STRICT JSON with keys: title, confidence (low|medium|high), summary, whatToLookFor (array), whatItMeans (array), photographyTips (array).";

    const resp = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            {
              type: "input_image",
              image_url: `data:${image.type || "image/jpeg"};base64,${base64}`,
              detail: "auto"
            }
          ]
        }
      ]
    });

    const text = resp.output_text?.trim() || "";
    const parsed = ResultSchema.safeParse(JSON.parse(text));
    if (!parsed.success) {
      return NextResponse.json(fallbackResult());
    }

    return NextResponse.json(parsed.data);
  } catch {
    return NextResponse.json(fallbackResult());
  }
}

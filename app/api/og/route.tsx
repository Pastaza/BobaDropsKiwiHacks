import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "../../lib/site";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || SITE_NAME;
  const subtitle = searchParams.get("subtitle") || SITE_TAGLINE;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(900px 600px at 80% 30%, rgba(255,214,153,0.55), rgba(255,214,153,0) 55%), radial-gradient(900px 600px at 20% 10%, rgba(201,176,255,0.35), rgba(201,176,255,0) 55%), linear-gradient(180deg, #ffffff 0%, #fff6ef 38%, #ffffff 100%)",
          color: "#161c2b"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 26, opacity: 0.8, fontWeight: 600 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 74, lineHeight: 1.05, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.9 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, opacity: 0.75 }}>
          <div>ireallylikeclouds.xyz</div>
          <div>Look up.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

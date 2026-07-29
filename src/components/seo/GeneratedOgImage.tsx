import { ImageResponse } from "next/og";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export function generatedOgImage(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(52, 211, 153, 0.15)",
              color: "#34d399",
              fontSize: "24px",
            }}
          >
            ▲
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700 }}>RetireFire</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              color: "#34d399",
              fontSize: "22px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              maxWidth: "1040px",
              fontSize: title.length > 62 ? "52px" : "64px",
              lineHeight: 1.08,
              fontWeight: 750,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa", fontSize: "20px" }}>
          <span>Transparent retirement math</span>
          <span>retirefire.net</span>
        </div>
      </div>
    ),
    ogImageSize,
  );
}

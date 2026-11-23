import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "TechsBridge — Websites, Web Apps & AI Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#F6F0E7", color: "#24211F", padding: 88, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ width: 132, height: 132, display: "flex", alignItems: "center", justifyContent: "center", background: "#24211F" }}>
          <svg width="110" height="76" viewBox="0 0 220 130">
            <path d="M20 20H95M57 20V95" stroke="#C77C57" strokeWidth="16" fill="none"/>
            <path d="M115 18H170Q195 18 195 42Q195 60 175 62Q198 64 198 86Q198 110 170 110H115V80H160Q170 80 170 72Q170 64 160 64H130V42H158Q166 42 166 34Q166 26 158 26H115Z" fill="#C77C57"/>
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 86, fontWeight: 700, letterSpacing: -4 }}>
          <span>Techs</span><span style={{ color: "#965238" }}>Bridge</span>
        </div>
      </div>
      <div style={{ width: 120, height: 6, background: "#965238", marginTop: 55, marginBottom: 32 }}/>
      <div style={{ fontSize: 43, fontWeight: 500, letterSpacing: -1 }}>Websites, Web Apps &amp; AI Solutions</div>
      <div style={{ position: "absolute", left: 88, right: 88, bottom: 56, height: 2, background: "#D9C8B9" }}/>
    </div>, size
  );
}
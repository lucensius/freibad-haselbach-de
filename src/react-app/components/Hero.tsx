import type { SiteConfig } from "../types";
import TemperaturAnzeige from "../TemperaturAnzeige";
import { FadeIn } from "./ui";

interface HeroProps {
  config: SiteConfig;
  onNavigate: (id: string) => void;
}

export default function Hero({ config, onNavigate }: HeroProps) {
  const imageBase = import.meta.env.VITE_IMAGE_BASE_URL || "";

  const heroBackground = config.bilder.heroBackground
    ? (config.bilder.heroBackground.startsWith("http") ? config.bilder.heroBackground : `${imageBase}${config.bilder.heroBackground}`)
    : "";

  return (
    <section
      id="start"
      style={{
        minHeight: "90vh",
        background: heroBackground
          ? `url(${heroBackground}) center/cover no-repeat`
          : "linear-gradient(165deg, #1a3a52 0%, #1d6fa4 55%, #4a9ecf 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "7rem 2rem 5rem", position: "relative",
        overflow: "hidden", textAlign: "center",
      }}
    >
      {/* Overlay bei Hintergrundbild */}
      {heroBackground && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(165deg, rgba(26,58,82,0.85) 0%, rgba(29,111,164,0.75) 55%, rgba(74,158,207,0.7) 100%)",
          zIndex: 0,
        }} />
      )}

      {/* Dekorative Kreise */}
      <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", top: "-120px", right: "-100px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", bottom: "80px", left: "-70px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
        {/* Saison-Badge */}
        <FadeIn>
          <div style={{
            display: "inline-block",
            background: config.badGeoeffnet ? "rgba(13,148,136,0.25)" : "rgba(255,255,255,0.1)",
            border: `1px solid ${config.badGeoeffnet ? "rgba(13,148,136,0.5)" : "rgba(255,255,255,0.2)"}`,
            borderRadius: 4, padding: "4px 14px",
            color: config.badGeoeffnet ? "#5eead4" : "#c8e6f5",
            fontSize: "0.76rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>
            {config.badGeoeffnet
              ? `✓ Saison ${config.saisonJahr} · Bad geöffnet`
              : `Saison ${config.saisonJahr} · Nur für Mitglieder`}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 style={{
            fontFamily: "'Lora', serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: "#fff", fontWeight: 700,
            lineHeight: 1.22, margin: "0 0 1.2rem",
          }}>
            Willkommen beim<br />{config.vereinsname}
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: "1rem",
            lineHeight: 1.8, maxWidth: 500, margin: "0 auto 2.25rem",
          }}>
            Seit 1974 ist das Freibad Haselbach ein geschätzter Treffpunkt
            für die Gemeinde. Seit 2011 wird es durch unseren gemeinnützigen
            Verein vollständig ehrenamtlich betrieben.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => onNavigate("verein")} style={{
              background: "#fff", color: "#1d6fa4",
              border: "none", borderRadius: 5,
              padding: "11px 26px", fontFamily: "inherit",
              fontWeight: 700, fontSize: "0.93rem", cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            }}>Über den Verein</button>
            <button onClick={() => onNavigate("kontakt")} style={{
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: 5, padding: "11px 26px",
              fontFamily: "inherit", fontWeight: 600,
              fontSize: "0.93rem", cursor: "pointer",
            }}>Mitglied werden</button>
          </div>
        </FadeIn>

        {/* Temperaturanzeige */}
        {config.badGeoeffnet && (
          <FadeIn delay={400}>
            <div style={{ marginTop: "2.5rem", textAlign: "left" }}>
              <TemperaturAnzeige />
            </div>
          </FadeIn>
        )}
      </div>

      {/* Eckdaten */}
      <FadeIn delay={500} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          marginTop: "3rem", maxWidth: 540, width: "100%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 8, overflow: "hidden",
          position: "relative", zIndex: 1,
        }}>
          {config.heroStats.map((s, i) => (
            <div key={i} style={{
              flex: "1 1 110px", padding: "1rem 0.75rem", textAlign: "center",
              borderRight: i < config.heroStats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{ fontSize: "1.35rem", fontFamily: "'Lora', serif", fontWeight: 700, color: "#fff" }}>{s.wert}</div>
              <div style={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.6)", marginTop: 3, letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path fill="#f5f7fa" d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" />
        </svg>
      </div>
    </section>
  );
}

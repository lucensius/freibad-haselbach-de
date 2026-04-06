import type { NewsEintrag } from "../types";
import { FadeIn, SectionLabel, SectionHeading, Divider, ImageOrPlaceholder } from "./ui";
import { useJsonData } from "../hooks/useJsonData";

export default function Aktuelles() {
  const { data: news, loading, error } = useJsonData<NewsEintrag[]>("/news.json", []);

  return (
    <section id="aktuelles" style={{ background: "#f5f7fa", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Neuigkeiten</SectionLabel>
          <SectionHeading>Aktuelles</SectionHeading>
          <Divider />
        </FadeIn>

        {loading && (
          <div style={{ color: "#7a9aae", fontSize: "0.9rem", textAlign: "center", padding: "2rem 0" }}>
            Nachrichten werden geladen …
          </div>
        )}

        {error && (
          <div style={{ color: "#7a9aae", fontSize: "0.9rem", textAlign: "center", padding: "2rem 0" }}>
            Nachrichten konnten nicht geladen werden.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: "1.4rem" }}>
          {news.map((n, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div
                style={{
                  background: "#fff", borderRadius: 8,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  borderTop: "3px solid #1d6fa4",
                  transition: "box-shadow 0.2s", cursor: "pointer",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)")}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)")}
              >
                {n.bild && (
                  <ImageOrPlaceholder
                    src={n.bild}
                    alt={n.titel}
                    style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 0 }}
                  />
                )}
                <div style={{ padding: "1.4rem" }}>
                  <div style={{
                    fontSize: "0.72rem", fontWeight: 700, color: "#7a9aae",
                    marginBottom: "0.5rem", letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>{n.datum}</div>
                  <h3 style={{
                    fontFamily: "'Lora', serif", color: "#1a3a52",
                    fontSize: "0.97rem", margin: "0 0 0.65rem", lineHeight: 1.35,
                  }}>{n.titel}</h3>
                  <p style={{ color: "#4a6070", lineHeight: 1.7, fontSize: "0.865rem", margin: 0 }}>
                    {n.text}
                  </p>
                  {n.link && (
                    <a href={n.link} style={{
                      display: "block", marginTop: "0.9rem", color: "#1d6fa4",
                      fontWeight: 700, fontSize: "0.8rem", textDecoration: "none",
                    }}>
                      Weiterlesen →
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

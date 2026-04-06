import type { ChronikEintrag } from "../types";
import { FadeIn, SectionLabel, SectionHeading, Divider, ImageOrPlaceholder } from "./ui";
import { useJsonData } from "../hooks/useJsonData";

export default function Chronik() {
  const { data: chronik, loading } = useJsonData<ChronikEintrag[]>("/chronik.json", []);

  if (loading) return null;

  return (
    <section id="chronik" style={{ background: "#fff", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Geschichte</SectionLabel>
          <SectionHeading>Chronik des Haselbacher Freibades</SectionHeading>
          <Divider />
        </FadeIn>

        <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
          <div style={{ position: "absolute", left: 7, top: 4, bottom: 4, width: 2, background: "#d8e8f0", borderRadius: 2 }} />
          {chronik.map((c, i) => (
            <FadeIn key={c.jahr} delay={i * 70}>
              <div style={{ position: "relative", marginBottom: "1.6rem" }}>
                <div style={{
                  position: "absolute", left: -26, top: 5,
                  width: 13, height: 13, borderRadius: "50%",
                  background: "#1d6fa4", border: "3px solid #fff",
                  boxShadow: "0 0 0 2px #1d6fa4",
                }} />
                <div style={{
                  fontFamily: "'Lora', serif", fontWeight: 700,
                  color: "#1d6fa4", fontSize: "0.92rem", marginBottom: 3,
                }}>
                  {c.jahr}
                </div>
                <p style={{ margin: 0, color: "#4a6070", lineHeight: 1.7, fontSize: "0.875rem" }}>
                  {c.text}
                </p>
                {c.bild && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <ImageOrPlaceholder src={c.bild} alt={`Chronik ${c.jahr}`} style={{ maxHeight: 200 }} />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

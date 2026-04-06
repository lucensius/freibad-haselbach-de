import type { VorstandMitglied, Dokument } from "../types";
import { FadeIn, SectionLabel, SectionHeading, Divider, ImageOrPlaceholder } from "./ui";
import { useJsonData } from "../hooks/useJsonData";

export default function UeberUns({ dokumente }: { dokumente: Dokument[] }) {
  const { data: vorstand } = useJsonData<VorstandMitglied[]>("/vorstand.json", []);

  return (
    <section id="verein" style={{ background: "#f5f7fa", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Über uns</SectionLabel>
          <SectionHeading>Der Freibad Haselbach e.V.</SectionHeading>
          <Divider />
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.75rem" }}>
          {/* Unser Verein */}
          <FadeIn delay={100}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "1.75rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontFamily: "'Lora', serif", color: "#1a3a52", fontSize: "1.05rem", margin: "0 0 0.9rem" }}>
                Unser Verein
              </h3>
              <p style={{ color: "#4a6070", lineHeight: 1.75, fontSize: "0.9rem", margin: 0 }}>
                Im Jahr 2011 wurde der Freibadverein Haselbach e.V. gegründet, um das örtliche Freibad
                dauerhaft für die Gemeinde zu erhalten. Seitdem wird das Bad vollständig durch
                ehrenamtliche Arbeit unserer Mitglieder betrieben.
              </p>
              <p style={{ color: "#4a6070", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: 0, marginTop: "0.75rem" }}>
                Das Freibad steht ausschließlich Vereinsmitgliedern offen. Mit Ihrer Mitgliedschaft
                sichern Sie den Erhalt dieser Einrichtung für kommende Generationen.
              </p>
            </div>
          </FadeIn>

          {/* Vorstand */}
          <FadeIn delay={180}>
            <div style={{ background: "#fff", borderRadius: 8, padding: "1.75rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontFamily: "'Lora', serif", color: "#1a3a52", fontSize: "1.05rem", margin: "0 0 1rem" }}>
                Vorstand
              </h3>
              {vorstand.map((v, i) => (
                <div key={v.rolle} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", fontSize: "0.88rem",
                  borderBottom: i < vorstand.length - 1 ? "1px solid #eef2f5" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {v.bild && (
                      <ImageOrPlaceholder
                        src={v.bild}
                        alt={v.name}
                        style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
                      />
                    )}
                    <span style={{ color: "#6a8090", fontWeight: 500 }}>{v.rolle}</span>
                  </div>
                  <span style={{ color: "#1a3a52", fontWeight: 700 }}>{v.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Mitglied werden */}
          <FadeIn delay={260}>
            <div style={{ background: "#1d6fa4", borderRadius: 8, padding: "1.75rem", boxShadow: "0 4px 18px rgba(29,111,164,0.22)" }}>
              <h3 style={{ fontFamily: "'Lora', serif", color: "#fff", fontSize: "1.05rem", margin: "0 0 0.9rem" }}>
                Mitglied werden
              </h3>
              <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.75, fontSize: "0.9rem", margin: 0 }}>
                Als Mitglied erhalten Sie Zugang zum Bad und unterstützen den Erhalt
                dieser Einrichtung für die gesamte Gemeinde.
              </p>
              <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.75, fontSize: "0.9rem", marginTop: "0.75rem" }}>
                Für eine Mitgliedschaft nehmen Sie bitte über das Kontaktformular Kontakt mit uns auf.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.25rem" }}>
                {dokumente.map((doc) => (
                  <a key={doc.label} href={doc.url} style={{
                    display: "block", padding: "8px 12px",
                    background: "rgba(255,255,255,0.13)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 5, color: "#fff", textDecoration: "none",
                    fontSize: "0.84rem", fontWeight: 600,
                  }}>📄 {doc.label} herunterladen</a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

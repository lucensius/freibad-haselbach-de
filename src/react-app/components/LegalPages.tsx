import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { LegalDaten } from "../types";
import { useJsonData } from "../hooks/useJsonData";
import { FadeIn, SectionHeading, Divider } from "./ui";

function LegalPage({ type }: { type: "impressum" | "datenschutz" }) {
  const { data: legal, loading } = useJsonData<LegalDaten | null>("/legal.json", null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || !legal) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Source Sans 3', sans-serif", color: "#7a9aae",
      }}>
        Wird geladen …
      </div>
    );
  }

  if (type === "impressum") {
    const imp = legal.impressum;
    return (
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#2d3e4f" }}>
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{
          background: "linear-gradient(165deg, #1a3a52 0%, #1d6fa4 55%, #4a9ecf 100%)",
          padding: "5rem 2rem 3rem", textAlign: "center",
        }}>
          <h1 style={{
            fontFamily: "'Lora', serif", color: "#fff",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, margin: 0,
          }}>
            {imp.titel}
          </h1>
          <Link to="/" style={{
            display: "inline-block", marginTop: "1.5rem",
            color: "rgba(255,255,255,0.8)", fontSize: "0.88rem",
            textDecoration: "none", fontWeight: 600,
          }}>
            ← Zurück zur Startseite
          </Link>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
          <FadeIn>
            <SectionHeading>Angaben gemäß § 5 TMG</SectionHeading>
            <Divider />

            <div style={{ lineHeight: 1.8, fontSize: "0.9rem", color: "#4a6070" }}>
              <p><strong>{imp.angaben.vereinsname}</strong></p>
              <p style={{ whiteSpace: "pre-line" }}>{imp.angaben.adresse}</p>
              <p><strong>Vertreten durch:</strong> {imp.angaben.vertreten}</p>
              {imp.angaben.email && <p><strong>E-Mail:</strong> {imp.angaben.email}</p>}
              {imp.angaben.telefon && <p><strong>Telefon:</strong> {imp.angaben.telefon}</p>}
              {imp.angaben.registergericht && (
                <p><strong>Registergericht:</strong> {imp.angaben.registergericht}<br />
                <strong>Registernummer:</strong> {imp.angaben.registernummer}</p>
              )}
            </div>

            <h3 style={{ fontFamily: "'Lora', serif", color: "#1a3a52", marginTop: "2rem" }}>
              Haftungshinweis
            </h3>
            <p style={{ color: "#4a6070", lineHeight: 1.75, fontSize: "0.9rem" }}>
              {imp.haftungshinweis}
            </p>

            <h3 style={{ fontFamily: "'Lora', serif", color: "#1a3a52", marginTop: "1.5rem" }}>
              Urheberrecht
            </h3>
            <p style={{ color: "#4a6070", lineHeight: 1.75, fontSize: "0.9rem" }}>
              {imp.urheberrecht}
            </p>
          </FadeIn>
        </div>
      </div>
    );
  }

  // Datenschutz
  const ds = legal.datenschutz;
  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#2d3e4f" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(165deg, #1a3a52 0%, #1d6fa4 55%, #4a9ecf 100%)",
        padding: "5rem 2rem 3rem", textAlign: "center",
      }}>
        <h1 style={{
          fontFamily: "'Lora', serif", color: "#fff",
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, margin: 0,
        }}>
          {ds.titel}
        </h1>
        <Link to="/" style={{
          display: "inline-block", marginTop: "1.5rem",
          color: "rgba(255,255,255,0.8)", fontSize: "0.88rem",
          textDecoration: "none", fontWeight: 600,
        }}>
          ← Zurück zur Startseite
        </Link>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        {ds.abschnitte.map((a, i) => (
          <FadeIn key={i} delay={i * 60}>
            <h3 style={{
              fontFamily: "'Lora', serif", color: "#1a3a52",
              fontSize: "1.05rem", marginTop: i > 0 ? "2rem" : 0,
            }}>
              {a.ueberschrift}
            </h3>
            <p style={{
              color: "#4a6070", lineHeight: 1.75, fontSize: "0.9rem",
              whiteSpace: "pre-line",
            }}>
              {a.text}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function ImpressumPage() {
  return <LegalPage type="impressum" />;
}

export function DatenschutzPage() {
  return <LegalPage type="datenschutz" />;
}

import { useState, type FormEvent } from "react";
import { FadeIn, SectionLabel, SectionHeading, Divider } from "./ui";

interface KontaktProps {
  formspreeId?: string;
}

export default function Kontakt({ formspreeId }: KontaktProps) {
  const resolvedFormspreeId = formspreeId || import.meta.env.VITE_FORMSPREE_ID || "";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value.toString(); });

    try {
      const res = await fetch(`https://formspree.io/f/${resolvedFormspreeId}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "9px 13px",
    borderRadius: 5, border: "1px solid #c4d4df",
    fontFamily: "inherit", fontSize: "0.9rem",
    outline: "none", boxSizing: "border-box",
    background: "#fff", color: "#2d3e4f", transition: "border-color 0.2s",
  };

  return (
    <section id="kontakt" style={{ background: "#fff", padding: "5rem 2rem 6rem" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Kontakt</SectionLabel>
          <SectionHeading>Schreiben Sie uns</SectionHeading>
          <Divider />
          <p style={{ color: "#4a6070", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "2rem" }}>
            Bei Fragen zur Mitgliedschaft oder zum Verein erreichen Sie uns über das folgende Formular.
            Wir melden uns so bald wie möglich bei Ihnen.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          {status === "success" ? (
            <div style={{
              background: "#e6f9f0", border: "1px solid #34d399",
              borderRadius: 8, padding: "2rem", textAlign: "center",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✓</div>
              <h3 style={{ fontFamily: "'Lora', serif", color: "#1a3a52", margin: "0 0 0.5rem" }}>
                Nachricht gesendet!
              </h3>
              <p style={{ color: "#4a6070", fontSize: "0.9rem", margin: 0 }}>
                Vielen Dank für Ihre Nachricht. Wir melden uns so bald wie möglich bei Ihnen.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: "1.25rem", background: "#1d6fa4", color: "#fff",
                  border: "none", borderRadius: 5, padding: "9px 22px",
                  fontFamily: "inherit", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer",
                }}
              >
                Neue Nachricht
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ background: "#f5f7fa", borderRadius: 8, padding: "2rem", border: "1px solid #dde5ec" }}
            >
              {[
                { label: "Vor- und Nachname", name: "name", type: "text", placeholder: "Max Mustermann" },
                { label: "E-Mail-Adresse", name: "email", type: "email", placeholder: "max@example.de" },
              ].map((f) => (
                <div key={f.name} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontWeight: 600, color: "#2d3e4f", fontSize: "0.85rem", marginBottom: 4 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#1d6fa4")}
                    onBlur={(e) => (e.target.style.borderColor = "#c4d4df")}
                  />
                </div>
              ))}

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontWeight: 600, color: "#2d3e4f", fontSize: "0.85rem", marginBottom: 4 }}>
                  Anliegen
                </label>
                <select name="anliegen" style={inputStyle}>
                  <option>Mitgliedschaft</option>
                  <option>Allgemeine Anfrage</option>
                  <option>Sonstiges</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.4rem" }}>
                <label style={{ display: "block", fontWeight: 600, color: "#2d3e4f", fontSize: "0.85rem", marginBottom: 4 }}>
                  Nachricht
                </label>
                <textarea
                  name="nachricht"
                  placeholder="Ihre Nachricht..."
                  rows={4}
                  required
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#1d6fa4")}
                  onBlur={(e) => (e.target.style.borderColor = "#c4d4df")}
                />
              </div>

              {status === "error" && (
                <div style={{ color: "#e53e3e", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%", padding: "11px",
                  background: status === "sending" ? "#6a9ec0" : "#1d6fa4",
                  color: "#fff", border: "none", borderRadius: 5,
                  fontFamily: "inherit", fontWeight: 700,
                  fontSize: "0.93rem", cursor: status === "sending" ? "wait" : "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => { if (status !== "sending") (e.target as HTMLButtonElement).style.background = "#165d8c"; }}
                onMouseOut={(e) => { if (status !== "sending") (e.target as HTMLButtonElement).style.background = "#1d6fa4"; }}
              >
                {status === "sending" ? "Wird gesendet …" : "Nachricht absenden"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

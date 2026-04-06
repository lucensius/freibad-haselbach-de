/**
 * TemperaturAnzeige
 * Zeigt Wassertemperaturen live an. Wird nur gerendert wenn das Bad geöffnet ist.
 */

import { useTemperatur } from "./useTemperatur.ts";

function TempKarte({ label, temp, status }: { label: string; temp: number | null; status: string }) {
  const keineDaten = temp === null;

  // Farbe je nach Temperatur
  const farbe = keineDaten
    ? "#7a9aae"
    : temp < 18 ? "#3b82f6"   // kühl – blau
    : temp < 22 ? "#1d6fa4"   // angenehm – mittelblau
    : temp < 26 ? "#0d9488"   // warm – türkis
    :             "#f59e0b";  // heiß – amber

  return (
    <div style={{
      background: "#fff",
      border: `2px solid ${farbe}22`,
      borderTop: `4px solid ${farbe}`,
      borderRadius: 8,
      padding: "1.25rem 1.5rem",
      minWidth: 160,
      flex: "1 1 160px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      textAlign: "center",
    }}>
      <div style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#7a9aae", marginBottom: "0.4rem",
      }}>{label}</div>

      {keineDaten ? (
        <div style={{ color: "#7a9aae", fontSize: "0.85rem", marginTop: "0.5rem" }}>
          {status === "verbinde" ? "⟳ Verbinde …" : "– keine Daten"}
        </div>
      ) : (
        <>
          <div style={{
            fontFamily: "'Lora', serif", fontWeight: 700,
            fontSize: "2.2rem", color: farbe, lineHeight: 1,
          }}>
            {temp.toFixed(1)}
            <span style={{ fontSize: "1rem", marginLeft: 2 }}>°C</span>
          </div>
          <div style={{
            marginTop: "0.4rem", fontSize: "0.75rem",
            color: farbe, fontWeight: 600,
          }}>
            {temp < 18 ? "Kühl"
            : temp < 22 ? "Angenehm"
            : temp < 26 ? "Warm"
            : "Sehr warm"}
          </div>
        </>
      )}
    </div>
  );
}

export default function TemperaturAnzeige() {
  const { becken, baby, status } = useTemperatur();

  return (
    <div style={{
      background: "#eef6fc",
      border: "1px solid #c8dff0",
      borderRadius: 10,
      padding: "1.5rem",
      marginTop: "2rem",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: "1.1rem",
      }}>
        <span style={{ fontSize: "1.1rem" }}>🌡️</span>
        <span style={{
          fontWeight: 700, color: "#1a3a52", fontSize: "0.92rem",
        }}>Aktuelle Wassertemperaturen</span>
        {/* Live-Indikator */}
        <span style={{
          marginLeft: "auto",
          display: "flex", alignItems: "center", gap: 5,
          fontSize: "0.72rem", fontWeight: 600,
          color: status === "ok" ? "#0d9488" : "#7a9aae",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: status === "ok" ? "#0d9488" : "#c4d4df",
            display: "inline-block",
            animation: status === "ok" ? "pulse 2s infinite" : "none",
          }} />
          {status === "ok" ? "Live" : status === "verbinde" ? "Verbinde …" : "Offline"}
        </span>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <TempKarte label="Schwimmbecken" temp={becken} status={status} />
        <TempKarte label="Babybecken"    temp={baby}   status={status} />
      </div>

      <div style={{
        marginTop: "0.75rem", fontSize: "0.72rem",
        color: "#7a9aae", textAlign: "right",
      }}>
        Aktualisierung automatisch bei neuer Messung
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
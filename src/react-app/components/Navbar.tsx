import type { SiteConfig, NavLink } from "../types";

interface NavbarProps {
  config: SiteConfig;
  active: string;
  scrolled: boolean;
  menuOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}

export default function Navbar({ config, active, scrolled, menuOpen, onNavigate, onToggleMenu }: NavbarProps) {
  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 60,
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 1px 14px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 2rem",
        }}
      >
        <button
          onClick={() => onNavigate("start")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10, padding: 0,
          }}
        >
          <div
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "#1d6fa4", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 17,
            }}
          >
            🏊
          </div>
          <div style={{ textAlign: "left", lineHeight: 1.2 }}>
            <div
              style={{
                fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "0.92rem",
                color: scrolled ? "#1a3a52" : "#fff",
              }}
            >
              {config.vereinsname}
            </div>
            <div
              style={{
                fontSize: "0.68rem", fontWeight: 500,
                color: scrolled ? "#5a7a8f" : "rgba(255,255,255,0.72)",
              }}
            >
              {config.ort}
            </div>
          </div>
        </button>

        <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }} className="desktop-nav">
          {config.navLinks.map((l: NavLink) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 600,
                color: scrolled
                  ? (active === l.id ? "#1d6fa4" : "#3d5670")
                  : (active === l.id ? "#fff" : "rgba(255,255,255,0.8)"),
                borderBottom: active === l.id
                  ? `2px solid ${scrolled ? "#1d6fa4" : "#fff"}`
                  : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("kontakt")}
            style={{
              background: "#1d6fa4", color: "#fff",
              border: "none", borderRadius: 5,
              padding: "7px 17px", fontFamily: "inherit",
              fontWeight: 700, fontSize: "0.84rem", cursor: "pointer",
            }}
          >
            Mitglied werden
          </button>
        </div>

        <button
          onClick={onToggleMenu}
          className="burger"
          style={{
            display: "none", background: "none", border: "none",
            fontSize: 22, cursor: "pointer",
            color: scrolled ? "#1a3a52" : "#fff",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed", top: 60, left: 0, right: 0, zIndex: 199,
            background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.09)",
            padding: "0.75rem 2rem 1.25rem",
            display: "flex", flexDirection: "column",
          }}
        >
          {config.navLinks.map((l: NavLink) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              style={{
                background: "none", border: "none", textAlign: "left",
                fontFamily: "inherit", fontSize: "1rem", fontWeight: 600,
                color: active === l.id ? "#1d6fa4" : "#2d3e4f",
                cursor: "pointer", padding: "9px 0",
                borderBottom: "1px solid #eef2f5",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

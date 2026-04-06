// src/App.tsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SiteConfig } from "./types";
import { useJsonData } from "./hooks/useJsonData";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UeberUns from "./components/UeberUns";
import Chronik from "./components/Chronik";
import Aktuelles from "./components/Aktuelles";
import Kontakt from "./components/Kontakt";

const DEFAULT_CONFIG: SiteConfig = {
  vereinsname: "Freibad Haselbach e.V.",
  ort: "87745 Haselbach",
  badGeoeffnet: true,
  saisonJahr: 2025,
  formspreeId: "xpwdjokn",
  navLinks: [],
  footerLinks: [],
  heroStats: [],
  dokumente: [],
  bilder: { heroBackground: "", vereinKarte: "", galerie: [] },
};

export default function App() {
  const { data: config } = useJsonData<SiteConfig>("/config.json", DEFAULT_CONFIG);

  const [active, setActive] = useState("start");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Seitentitel aus Env oder Config setzen
  useEffect(() => {
    const title = import.meta.env.VITE_SITE_TITLE || config.vereinsname;
    if (title) document.title = title;
  }, [config.vereinsname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 54);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#2d3e4f", overflowX: "hidden" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Navbar
        config={config}
        active={active}
        scrolled={scrolled}
        menuOpen={menuOpen}
        onNavigate={scrollTo}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
      />

      <Hero config={config} onNavigate={scrollTo} />
      <UeberUns dokumente={config.dokumente} />
      <Chronik />
      <Aktuelles />
      <Kontakt formspreeId={config.formspreeId} />

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#1a3a52", color: "rgba(255,255,255,0.6)",
        padding: "1.6rem 2rem", textAlign: "center", fontSize: "0.8rem",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
          {config.footerLinks.map((l) => {
            const isInternal = l.href.startsWith("/");
            if (isInternal) {
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => navigate(l.href)}
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500 }}
                >
                  {l.label}
                </Link>
              );
            }
            return (
              <a
                key={l.label}
                href={l.href}
                style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500 }}
              >
                {l.label}
              </a>
            );
          })}
        </div>
        <div>© {new Date().getFullYear()} {config.vereinsname} · {config.ort}</div>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .burger      { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

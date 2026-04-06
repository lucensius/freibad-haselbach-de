// ── Typen für JSON-Daten ────────────────────────────────────────────

export interface NavLink {
  id: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface HeroStat {
  wert: string;
  label: string;
}

export interface Dokument {
  label: string;
  url: string;
}

export interface Bilder {
  heroBackground: string;
  vereinKarte: string;
  galerie: string[];
}

export interface SiteConfig {
  vereinsname: string;
  ort: string;
  badGeoeffnet: boolean;
  saisonJahr: number;
  formspreeId: string;
  navLinks: NavLink[];
  footerLinks: FooterLink[];
  heroStats: HeroStat[];
  dokumente: Dokument[];
  bilder: Bilder;
}

export interface ChronikEintrag {
  jahr: string;
  text: string;
  bild?: string;
}

export interface VorstandMitglied {
  rolle: string;
  name: string;
  bild?: string;
}

export interface NewsEintrag {
  datum: string;
  titel: string;
  text: string;
  link?: string;
  bild?: string;
}

export interface LegalAbschnitt {
  ueberschrift: string;
  text: string;
}

export interface ImpressumDaten {
  titel: string;
  angaben: {
    vereinsname: string;
    adresse: string;
    vertreten: string;
    email: string;
    telefon: string;
    registergericht: string;
    registernummer: string;
  };
  haftungshinweis: string;
  urheberrecht: string;
}

export interface DatenschutzDaten {
  titel: string;
  abschnitte: LegalAbschnitt[];
}

export interface LegalDaten {
  impressum: ImpressumDaten;
  datenschutz: DatenschutzDaten;
}

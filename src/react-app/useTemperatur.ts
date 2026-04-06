/**
 * useTemperatur
 * Verbindet sich per MQTT-over-WebSocket mit HiveMQ Cloud
 * und liefert die aktuellen Temperaturen aus zwei Topics.
 *
 * Umgebungsvariablen (in .env bzw. Cloudflare Pages → Environment Variables):
 *   VITE_HIVEMQ_HOST         z.B. abc123.s1.eu.hivemq.cloud
 *   VITE_HIVEMQ_PORT         8884
 *   VITE_HIVEMQ_USER         ihr-benutzername
 *   VITE_HIVEMQ_PASS         ihr-passwort
 *   VITE_MQTT_TOPIC_BECKEN   freibad/temperatur/becken
 *   VITE_MQTT_TOPIC_BABY     freibad/temperatur/baby
 */

import { useState, useEffect } from "react";
import mqtt from "mqtt";

const HOST   = import.meta.env.VITE_HIVEMQ_HOST;
const PORT   = import.meta.env.VITE_HIVEMQ_PORT  || "8884";
const USER   = import.meta.env.VITE_HIVEMQ_USER;
const PASS   = import.meta.env.VITE_HIVEMQ_PASS;
const T_BECK = import.meta.env.VITE_MQTT_TOPIC_BECKEN || "freibad/temperatur/becken";
const T_BABY = import.meta.env.VITE_MQTT_TOPIC_BABY   || "freibad/temperatur/baby";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function useTemperatur() {
  const [becken, setBecken] = useState<number | null>(null);
  const [baby,   setBaby]   = useState<number | null>(null);
  const [status, setStatus] = useState<"verbinde" | "ok" | "fehler" | "nicht-konfiguriert">("verbinde");

  useEffect(() => {
    // Keine Verbindung wenn Credentials fehlen (z.B. lokale Entwicklung ohne .env)
    if (!HOST || !USER || !PASS) {
      setStatus("nicht-konfiguriert");
      return;
    }

    const brokerUrl = `wss://${HOST}:${PORT}/mqtt`;

    const client = mqtt.connect(brokerUrl, {
      username:        USER,
      password:        PASS,
      reconnectPeriod: 5000,
      connectTimeout:  10000,
      clientId:        `freibad-web-${Math.random().toString(16).slice(2, 8)}`,
    });

    client.on("connect", () => {
      setStatus("ok");
      client.subscribe([T_BECK, T_BABY]);
    });

    client.on("message", (topic: string, payload: Buffer) => {
      const wert = parseFloat(payload.toString());
      if (isNaN(wert)) return;
      if (topic === T_BECK) setBecken(wert);
      if (topic === T_BABY) setBaby(wert);
    });

    client.on("error",       () => setStatus("fehler"));
    client.on("reconnect",   () => setStatus("verbinde"));
    client.on("disconnect",  () => setStatus("verbinde"));

    return () => { client.end(true); };
  }, []);

  return { becken, baby, status };
}

// Beispiel für die Verwendung von API_BASE_URL mit fetch():
// fetch(`${API_BASE_URL}/api/temperatur`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error("Fehler beim Fetch:", error));
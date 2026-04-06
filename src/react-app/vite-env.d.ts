/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HIVEMQ_HOST: string;
  readonly VITE_HIVEMQ_PORT: string;
  readonly VITE_HIVEMQ_USER: string;
  readonly VITE_HIVEMQ_PASS: string;
  readonly VITE_MQTT_TOPIC_BECKEN: string;
  readonly VITE_MQTT_TOPIC_BABY: string;
  readonly VITE_FORMSPREE_ID: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_IMAGE_BASE_URL: string;
  readonly VITE_SITE_TITLE: string;
  readonly VITE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

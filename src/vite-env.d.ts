/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICIO: string;
  // más variables de entorno si tenés...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
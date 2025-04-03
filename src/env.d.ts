
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY?: string;
  readonly VITE_ENV: 'development' | 'production' | 'staging';
  readonly VITE_DEBUG_MODE?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

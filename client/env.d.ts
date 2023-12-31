/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_KEY: string
  readonly VITE_APP_WEATHER_API_BASE: string
  readonly VITE_APP_REQUEST_PER_HOUR_LIMIT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
